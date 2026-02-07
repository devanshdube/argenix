import express from "express";
import controller from "../controllers/controller.js";
import rateLimiter from "../middleware/rateLimiter.js";
import validator from "../middleware/requestValidator.js";

const router = express.Router();

router.post(
  "/ingest",
  rateLimiter(100, 60000),
  validator(["source_id", "payload"]),
  controller.insertRealtimeData
);

router.get("/latest", controller.getLatestData);


export default router;
