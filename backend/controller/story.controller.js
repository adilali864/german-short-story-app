import { Story } from "../model/story.model.js";

const getStories = async (req, res) => {
  try {
    const stories = await Story.find({}).sort({ created_at: -1 });
    if (!stories) {
      return res.status(404).json({ message: "No stories found" });
    }

    return res.status(200).json({ message: "Stories fetched", data: stories });
  } catch (error) {
    console.log("Error in getStories controller: ", error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const getStoryBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const story = await Story.findOne({ slug });
    if (!story) {
      return res.status(404).json({ message: "Requested story not found!" });
    }

    return res.status(200).json({ message: "Story fetched!", data: story });
  } catch (error) {
    console.log("Error in getStoryBySlug controller: ", error.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export { getStories, getStoryBySlug };
