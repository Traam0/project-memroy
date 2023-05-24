import { Schema, model, models } from "mongoose";

const FragmentSchema = new Schema(
	{
		engram_id: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			trim: false,
			require: false,
		},
		content: {
			type: String,
			required: false,
		},
		// image: {
		// 	type: String,
		// 	trim: true,
		// 	required: false,
		// },
		strength: {
			type: Number,
			required: false,
			default: -1,
		},
	},
	{ timestamps: true }
);

export default models.Fragment || model("Fragment", FragmentSchema);
