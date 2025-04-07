"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const getGlowColor = (icon: string) => {
  const code = icon.substring(0, 2);
  switch (code) {
    case "01": // Clear sky
      return "rgba(255, 215, 0, 0.3)"; // Gold
    case "02": // Few clouds
    case "03": // Scattered clouds
    case "04": // Broken clouds
      return "rgba(169, 169, 169, 0.3)"; // Dark Gray
    case "09": // Shower rain
    case "10": // Rain
      return "rgba(100, 149, 237, 0.3)"; // Cornflower Blue
    case "11": // Thunderstorm
      return "rgba(148, 0, 211,0.3)"; // Dark Violet
    case "13": // Snow
      return "rgba(173, 216, 230, 0.3)"; // Light Blue
    case "50": // Mist
      return "rgba(211, 211, 211,0.3)"; // Light Gray
    default:
      return "rgba(255, 255, 255, 0.3)"; // White
  }
};

interface WeatherIconProps {
  iconName: string;
  size: string;
  disableMotion?: boolean;
}

const WeatherIcon = ({
  iconName,
  size,
  disableMotion = false,
}: WeatherIconProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const glowColor = getGlowColor(iconName);

  useEffect(() => {
    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.figure
      style={{ width: size, height: size }}
      className="relative"
      animate={
        shouldAnimate && !disableMotion
          ? {
              y: [-5, 5, -5],
            }
          : { y: 0 }
      }
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{
          backgroundColor: glowColor,
        }}
        animate={
          shouldAnimate && !disableMotion
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6],
              }
            : { scale: 1, opacity: 0.6 }
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Weather icon image */}
      <motion.img
        className="relative z-10 w-full drop-shadow-lg"
        src={`https://openweathermap.org/img/wn/${iconName}@2x.png`}
        alt="Weather Icon"
        initial={!disableMotion && { scale: 0 }}
        animate={shouldAnimate && !disableMotion ? { scale: 1 } : { scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
        }}
      />
    </motion.figure>
  );
};

export default WeatherIcon;
