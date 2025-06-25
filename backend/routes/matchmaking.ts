// filepath: backend/routes/matchmaking.ts
import express from "express";
import { getMatchRecommendations } from "../ai/matchmaking";
const router = express.Router();

router.post("/recommend", async (req, res) => {
  const { userProfile, candidates } = req.body;
  const recommendations = await getMatchRecommendations(userProfile, candidates);
  res.json({ recommendations });
});

export default router;