// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
type Data = {
	name: string | null;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const ip = requestIp.getClientIp(req);
	res.status(200).json({ name: ip });
}
