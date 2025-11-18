import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    coverImageUrl: {
      type: String,
      default: "",
    },
    heroImageUrl: {
      type: String,
      default: "",
    },
    story: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Story = mongoose.model("Story", storySchema);
