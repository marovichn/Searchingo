import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET
export const GET = async (req, {params}) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if(!prompt){
       return new Response("Prompt not found", { status: 404 }); 
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Could not fetch data", { status: 500 });
  }
};

//PATCH
export const PATCH= async (req, { params }) => {
    
  try {
    const {prompt, tag} =await req.json();
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if(!existingPrompt){
        return new Response("Prompt not found", { status: 404 }); 
    }
    
    existingPrompt.prompt = prompt;
    existingPrompt.tag=tag;
    
    await existingPrompt.save();


    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Could not fetch data", { status: 500 });
  }
};


//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
   
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Could not fetch data", { status: 500 });
  }
};