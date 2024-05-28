import Prompt from "@models/prompt";

const { connectToDB } = require("@utils/database");

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to fetch all prompts", { status: 500 })
    );
  }
};
