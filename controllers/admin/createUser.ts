import { NextApiRequest, NextApiResponse } from "next";
import { Engram, User } from "~/Models";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "~/errors";
import bcryptjs from "bcryptjs";

export async function createAccount(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const salt = await bcryptjs.genSalt(10);

	const { description, ispublic, secret, ...userDataRaw } = req.body;
	const freshEngram = await Engram.create({
		description,
		public: ispublic,
		secret,
	});

	if (!freshEngram) throw BadRequestError(res, "could not create engram");

	const { password: passowrdRaw, ...userData } = userDataRaw;
	const passwordHashed = await bcryptjs.hash(passowrdRaw, salt);

	const user = await User.create({
		...userData,
		password: passwordHashed,
		engram_id: freshEngram._id,
	});

	res.status(StatusCodes.OK).json({ ...user._doc });
}
