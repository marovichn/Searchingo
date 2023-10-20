import User from "@models/user";
import Prompt from "@models/prompt"; 
import { connectToDB } from "@utils/database";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const userId = params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Update the favorites
    user.favorites.push(req.body.newFavorite);
    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Could not update favorites", { status: 500 });
  }
};
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const userId = params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const favoriteIds = user.favorites; // Array of favorite prompt IDs

    // Fetch and map favorite prompts
    const favoritePrompts = await Promise.all(
      favoriteIds.map(async (favoriteId) => {
        const prompt = await Prompt.findById(favoriteId);
        return prompt;
      })
    );

    return new Response(JSON.stringify(favoritePrompts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Could not fetch favorites", { status: 500 });
  }
};
