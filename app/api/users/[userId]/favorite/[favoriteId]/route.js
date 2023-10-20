import User from "@models/user";
import { connectToDB } from "@utils/database";

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const userId = params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const favoriteIdToDelete = params.favoriteId // Assuming you have a route parameter for favoriteId

    // Find the index of the favorite to delete
    const favoriteIndex = user.favorites.indexOf(favoriteIdToDelete);

    if (favoriteIndex === -1) {
      return new Response("Favorite not found", { status: 404 });
    }

    // Remove the favorite from the user's favorites array
    user.favorites.splice(favoriteIndex, 1);

    await user.save();

    return new Response("Favorite deleted successfully", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Could not delete favorite", { status: 500 });
  }
};

export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const userId = params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const newFavoriteId = params.favoriteId;

    // Update the favorites
    user.favorites.push(newFavoriteId);
    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Could not update favorites", { status: 500 });
  }
};
