import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";
import { Engram, Fragment, Gallery, User } from "~/Models";

export async function getDashBoard(
	req: any,
	res: NextApiResponse
): Promise<void> {
	const { engram_id: engramId } = await User.findById(req.user.id, {
		_id: 0,
		engram_id: 1,
	});

	const engram = await Engram.findById(engramId);
	const fragmetsCount = await Fragment.find({ engram_id: engramId }).count();

	const latestFragments = await Fragment.find()
		.sort({ createdAt: -1 })
		.limit(4);

	const images = await Gallery.find({ engram_id: engramId });
	const galleryCategories = await Gallery.distinct("category");
	const galleryTags = await Gallery.distinct("tags");

	res.status(StatusCodes.OK).json({
		engram,
		fragmetsCount,
		latestFragments,
		gallery: {
			images,
			tags: galleryTags,
			categories: galleryCategories,
		},
	});
}
