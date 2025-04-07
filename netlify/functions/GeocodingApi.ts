import { Handler } from "@netlify/functions";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OPENCAGE_API_KEY = process.env.OPENCAGE_API_KEY;

const handler: Handler = async (event) => {
  if (!OPENCAGE_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Geocoding API key is not configured" }),
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing request body" }),
    };
  }

  const { type, query, lat, lon } = JSON.parse(event.body);

  try {
    if (type === "search") {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: query,
            key: OPENCAGE_API_KEY,
            limit: 5,
            language: "en",
          },
        }
      );
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    } else if (type === "reverse") {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: `${lat}+${lon}`,
            key: OPENCAGE_API_KEY,
            limit: 1,
            language: "en",
          },
        }
      );
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request type" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch geocoding data",
        details: error.message,
      }),
    };
  }
};

export { handler };
