import { useEffect, useState } from "react";

export function useUserLocation() {
  const [location, setLocation] = useState("Brasil");

  useEffect(() => {
    async function getLocation() {
      try {
      
      // const response = await fetch("https://ipapi.co/json/");
      const response = {
        "city": "Fortaleza",
        "region": "Ceará",
        "region_code": "CE",
        "country_name": "Brazil",
        "country_code": "BR",
        "country_code_iso3": "BRA"
      }
        // const data = await response.json();
        const data = await response

        if (data.city && data.region) {
          setLocation(`${data.city}, ${data.region}`);
        }
      } catch {
        setLocation("Localização indisponível");
      }
    }

    getLocation();
  }, []);

  return location;
}