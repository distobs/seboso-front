import { useEffect, useState } from "react";

export function useUserLocation() {
  const [location, setLocation] = useState("Brasil");

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

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