import Prompt from "@models/prompt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    console.log(params.tag);
    await connectToDB();
    let prompts;
    const user = await User.find({ username: params.tag });
    const userId = user[0]?._id;
    if (userId) {
      prompts = await Prompt.find({ creator: userId }).populate("creator");
    }
    if (!prompts || prompts.length === 0) {
      const all = await Prompt.find({}).populate("creator");
      prompts = all.filter((p) => p.prompt.includes(params.tag));
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Could not fetch data", { status: 500 });
  }
};
