import express from "express";

const router = express.Router();

router.get("/", function(req, res) {
  res.render('index', { title: `API - ${process.env.NODE_ENV}` });
});

export default router;
