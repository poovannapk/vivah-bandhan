import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// POST /api/compatibility/prokerala-match
// Expects: { boyDetails: {date, month, year, hour, minute, lat, lon, tzone}, girlDetails: {date, month, year, hour, minute, lat, lon, tzone} }
router.post('/prokerala-match', async (req: Request, res: Response) => {
  const { boyDetails, girlDetails } = req.body;
  if (!boyDetails || !girlDetails) {
    return res.status(400).json({ error: 'Both boyDetails and girlDetails are required.' });
  }
  try {
    const response = await axios.post(
      'https://api.prokerala.com/v2/astrology/match-making',
      {
        boy_birth_details: boyDetails,
        girl_birth_details: girlDetails,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PROKERALA_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch compatibility', details: err.response?.data || err.message });
  }
});

export = router;
