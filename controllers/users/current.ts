import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";
import { User } from "~/Models";

export async function getCurrent(
	req: any,
	res: NextApiResponse
): Promise<void> {
	const user = await User.findById(req.user.id);

	const { password, ...rest } = user._doc;

	res.status(StatusCodes.OK).json({ ...rest });
}
