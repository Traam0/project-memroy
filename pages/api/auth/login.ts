import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { loginAttempt } from "~/controllers/auth";
import { connDB } from "~/utils";
// import cors from 'cors'

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(connDB).post(loginAttempt);

export default router.handler({
	onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
		console.error(err?.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
		res.status(404).end("Page is not found");
	},
});
