import Prompt from "@models/prompt";

const { connectToDB } = require("@utils/database");

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts, { status: 201 }));
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to fetch all prompts", { status: 500 })
    );
  }
};
