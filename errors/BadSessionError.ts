import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";

export default function BadSessionError(res: NextApiResponse, message: string) {
	return res.status(StatusCodes.BAD_SESSION).json({ message });
}
