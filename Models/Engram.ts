import mongoose, { Schema, model, models } from "mongoose";

interface IEngramDocument extends mongoose.Document {
	description: string;
	public: boolean;
	secret?: string;
}

const EngramSchema = new Schema<IEngramDocument>(
	{
		description: {
			type: String,
			trim: true,
			lowercase: true,
			required: false,
		},
		public: {
			type: Boolean,
			trim: true,
			lowercase: true,
			required: true,
			default: true,
		},
		secret: {
			type: String,
			required: function (this: IEngramDocument) {
				return !this.public;
			},
			default: null,
		},
	},
	{ timestamps: true }
);

export default models.Engram || model("Engram", EngramSchema);
