import mongoose, { Schema, model, models } from "mongoose";
mongoose.deleteModel("Session");
const SessionSchema = new Schema(
	{
		user_id: {
			type: String,
			trim: true,
			required: true,
		},
		RTS: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default models.Session || model("Session", SessionSchema);
