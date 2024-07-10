import React, { useState, useEffect } from "react";
import { Header, Hero, Wrapper, Teaser } from "components";

function LandingPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showTeaser, setShowTeaser] = useState<boolean>(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoritesArray") || "[]"
    );
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritesArray", JSON.stringify(favorites));
  }, [favorites]);

  const updateFavorites = (newFavorites: number[]) => {
    setFavorites(newFavorites);
  };

  const handleHeaderIconClick = () => {
    if (favorites.length !== 0) setShowTeaser(true);
  };

  const handleTeaserClose = () => {
    setShowTeaser(false);
  };

  console.log(favorites);

  return (
    <div className="landing-page">
      <Header onIconClick={handleHeaderIconClick} />
      <Hero />
      {showTeaser ? (
        <Teaser imgArray={favorites} onClose={handleTeaserClose} />
      ) : (
        <Wrapper updateFavorites={updateFavorites} articleType={"popular"} />
      )}
      {/* {!showTeaser && (
        <Wrapper updateFavorites={updateFavorites} articleType={"popular"} />
      )}
      {showTeaser && (
        <Teaser imgArray={favorites} onClose={handleTeaserClose} />
      )} */}
    </div>
  );
}

export default LandingPage;
