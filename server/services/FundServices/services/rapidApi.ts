import axios from "axios";

const BASE_URL: any = process.env.RAPID_API_URL;
const HOST: any = process.env.RAPID_API_HOST;
const KEY: any = process.env.RAPID_API_KEY;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": KEY,
    "X-RapidAPI-Host": HOST,
  },
});

export const rapidApiService = {
  async getMasterData(rtaAgentCode: string) {
    try {
      const response = await axios.get(`${BASE_URL}/master`, {
        params: { RTA_Agent_Code: rtaAgentCode },
        headers: {
          "X-RapidAPI-Key": KEY,
          "X-RapidAPI-Host": HOST,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching master data:", error);
      throw new Error("Failed to fetch master data from RapidAPI");
    }
  },

  async getHistoricNav() {
    try {
      const response = await axios.get(`${BASE_URL}/historic`, {
        params: { Scheme_Type: "Open" },
        headers: {
          "X-RapidAPI-Key": KEY,
          "X-RapidAPI-Host": HOST,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching historic NAV data:", error);
      throw new Error("Failed to fetch historic NAV data from RapidAPI");
    }
  },

  async getLatestNav() {
    try {
      const response = await axios.get(`${BASE_URL}/latest`, {
        params: { Scheme_Type: "Open" },
        headers: {
          "X-RapidAPI-Key": KEY,
          "X-RapidAPI-Host": HOST,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching latest NAV data:", error);
      throw new Error("Failed to fetch latest NAV data from RapidAPI");
    }
  },

  async filterSchemesByAMC(schemes: any, amcName: any) {
    return schemes.filter(
      (scheme: any) =>
        scheme.AMC && scheme.AMC.toLowerCase().includes(amcName.toLowerCase())
    );
  },

  async getNavForScheme(schemeCode: any, navData: any) {
    return navData.find((item: any) => item.Scheme_Code === schemeCode);
  },
};
