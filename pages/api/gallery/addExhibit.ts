import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { addExhibit } from "~/controllers/gallery";
import { authenticateUser } from "~/middlewares/authMiddleware";
import { connDB } from "~/utils";
// import cors from 'cors'

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(connDB).use(authenticateUser).post(addExhibit);

export default router.handler({
	onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
		console.error(err?.stack);
		res.status(500).end("Something broke!");
	},
	onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
		res.status(404).end("Page is not found");
	},
});

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "50mb",
		},
	},
};
