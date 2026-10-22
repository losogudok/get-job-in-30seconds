"use client";

import { useState, useEffect } from "react";

export default function Game() {
  const [savedScore, setSavedScore] = useState<string | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem("score");

    if (savedScore) {
      setSavedScore(savedScore);
    }
  }, []);

  return <p>{savedScore}</p>;
}
