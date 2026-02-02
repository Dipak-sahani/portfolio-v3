import { useEffect, useState } from "react";

const slogans = [
  "Build together, grow faster",
  "Find your perfect co-founder",
  "Where startups meet talent",
  "Turn ideas into reality",
  "Connect. Create. Scale."
];

export default function Slogan() {
  const [slogan, setSlogan] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * slogans.length);
    setSlogan(slogans[randomIndex]);
  }, []);

  return <h1 className="text-2xl sm:text-3xl font-bold text-center px-2 sm:px-10 sm:pl-20">" {slogan} "</h1>;
}
