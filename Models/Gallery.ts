import { Schema, model, models } from "mongoose";

const GalleryScehma = new Schema(
	{
		title: {
			type: Schema.Types.String,
			required: false,
			default: null,
			trim: true,
			lowercase: true,
		},
		description: {
			type: Schema.Types.String,
			required: false,
			default: true,
		},
		image: {
			type: Schema.Types.String,
			required: true,
		},
		category: {
			type: Schema.Types.String,
			required: false,
			default: "all",
			lowercase: true,
			trim: true,
		},
		tags: {
			type: [Schema.Types.String],
			required: false,
			default: [],
		},
	},
	{ timestamps: true }
);

export default models.Gallery || model("Gallery", GalleryScehma);
