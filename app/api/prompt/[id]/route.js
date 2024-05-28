import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt)
      return new Response(JSON.stringify("Prompt not found", { status: 404 }));
    return new Response(JSON.stringify(prompt, { status: 201 }));
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to fetch prompt", { status: 500 })
    );
  }
};

//PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response(JSON.stringify("Prompt not found"), { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to update prompt"), {
      status: 500,
    });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);
    console.log("Prompt deleted successfully");

    return new Response("Prompt deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log("Failed to delete prompt", error.message);
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
};
