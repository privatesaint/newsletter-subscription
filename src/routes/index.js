import { Router } from "express";

import { subscribe, unsubscribe } from "../controllers/SubscriberController";
import requestValidator from "../middleware/RequestValidator";

const router = Router();

router.post("/subscribe", requestValidator, subscribe);
router.post("/unsubscribe", requestValidator, unsubscribe);

export default router;
