import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";
import { Gallery, User } from "~/Models";
import { cloudinary } from "~/utils/cloudinary";

export async function addExhibit(req: any, res: NextApiResponse) {
		const { engram_id } = await User.findById(req.user.id, {
			engram_id: 1,
			_id: 0,
		});

		const uploadResponse = await cloudinary.uploader.upload(
			req.body.imageEncoded,
			{ upload_preset: "project-memory" }
		);

		const exhibit = await Gallery.create({
			engram_id,
			title: req.body.title,
			description: req.body.description,
			category: req.body.category,
			tags: req.body.tags,
			image: uploadResponse.url,
		});

		res.status(StatusCodes.CREATED).json({ ...exhibit });	
}
