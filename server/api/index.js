import express from "express";
import helmet from "helmet";

const router = express.Router();

router.use(helmet());

router.get("/", function (req, res) {
  res.render("index", { title: `API - ${process.env.NODE_ENV}` });
});

export default router;
