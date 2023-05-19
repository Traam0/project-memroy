import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { getDashBoard } from "~/controllers/users";
import { authenticateUser } from "~/middlewares/authMiddleware";
import { connDB } from "~/utils";
// import cors from 'cors'

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(connDB).use(authenticateUser).get(getDashBoard);

export default router.handler({
	onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
		console.error(err?.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
		res.status(404).end("Page is not found");
	},
});
