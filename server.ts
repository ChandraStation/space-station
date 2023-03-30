import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

app.get('/api/gas-prices', async (req, res) => {
  try {
    const response = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`);
    const { suggestBaseFee, SafeGasPrice, FastGasPrice } = response.data.result;
    res.json({
      slow: suggestBaseFee,
      fast: SafeGasPrice,
      instant: FastGasPrice
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching gas prices' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});