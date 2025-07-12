import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const GreetingCard = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [now, setNow] = useState(new Date());
  const name = "Nashwah";

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, []);
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const wish = now.getHours() < 11 ? "Good Morning" : "Good Evening";

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

          const response = await fetch(url);
          const data = await response.json();
          setTemperature(Math.round(data.main.temp));
        } catch (error) {
          console.error("Error fetching weather:", error);
        }
      },
      (error) => console.error("Error getting location:", error.message)
    );
  }, []);

  return (
    <div className="p-4 rounded-lg text-white bg-gradient-to-r from-[#EF7C23] to-[#C7DC1C]">
      <h2 className="text-3xl font-extrabold">{`${wish}, ${name}!`}</h2>
      <p className="text-lg font-medium">
        {formattedDate} • {formattedTime} •{" "}
        {temperature !== null ? `${temperature}°C` : <Skeleton width={50} />}
      </p>
    </div>
  );
};

export default GreetingCard;
