import express from 'express';
import errorHandler from "../middleware/errorMiddleware";
import PingController from "../controllers/ping";
const router = express.Router();

// Home page route.
// router.get('/', function (req, res) {
//     res.send('Wiki home page');
// })
//
// // About page route.
// router.get('/about', function (req, res) {
//     res.send('About this wiki');
// })

router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

export default router;