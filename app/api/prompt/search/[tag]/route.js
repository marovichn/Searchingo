import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, {params}) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({tag: params.tag}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Could not fetch data", { status: 500 });
  }
};
