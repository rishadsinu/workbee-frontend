import axios from "axios";

export const LocationService = {
  getPlaceFromCoordinates: async (longitude: number, latitude: number): Promise<string> => {
    try {
      const res = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q: `${latitude},${longitude}`,
          key: import.meta.env.VITE_OPENCAGE_API_KEY,
          language: "en",
        },
      });

      const result = res.data.results?.[0];
      if (!result) return "Unknown location";

      const components = result.components;
      const city = components.city || components.town || components.village || components.county;
      const state = components.state;
      const country = components.country;

      if (city && state) return `${city}, ${state}`;
      if (city) return `${city}, ${country}`;

      return result.formatted?.split(",").slice(0, 2).join(",") || "Location available";
    } catch (err) {
      console.error("Error fetching location:", err);
      return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
  },
};
