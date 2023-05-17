/** @format */

import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

export function attachCookies({
	req,
	res,
	token,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
	token: string;
}): void {
	if (req.headers.host === "localhost:3000") {
		setCookie("ATS", token, {
			req,
			res,
			httpOnly: true,
			sameSite: true,
			secure: false,
			expires: new Date(Date.now() + 60 * 60 * 1000),
		});
	} else {
		setCookie("ATS", token, {
			req,
			res,
			httpOnly: true,
			sameSite: true,
			secure: false,
			// domain: ".vercel.app",
			expires: new Date(Date.now() + 60 * 60 * 1000),
		});
	}
}
