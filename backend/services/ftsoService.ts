import axios from "axios";

const FTSO_API = process.env.FTSO_API_URL;

export default {
  async getPrice(symbol: string) {
    const { data } = await axios.get(`${FTSO_API}/price/${symbol}`);
    return data; // { price: 43000, dropPercent: 12 }
  }
};