import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
	{
		mediatype: { type: String, required: true },
		media: { type: String, required: true },
		category: { type: String, required: true },
		alt: { type: String, required: false },
	},
	{ timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);