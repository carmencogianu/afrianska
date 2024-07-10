import React, { useState, useEffect } from "react";
import { Header, Hero, Wrapper, Teaser } from "components";

function LandingPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showTeaser, setShowTeaser] = useState<boolean>(false);
  const [lastSearchResults, setLastSearchResults] = useState<[any[], any[]]>([
    [],
    [],
  ]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoritesArray") || "[{}]"
    );
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("favoritesArray", JSON.stringify(favorites));
  }, [favorites]);

  const updateFavorites = (newFavorites: any[]) => {
    setFavorites(newFavorites);
  };

  const updateLastSearchResults = (newResults: [any[], any[]]) => {
    setLastSearchResults(newResults);
  };

  const handleFavoritesIconClick = () => {
    if (favorites.length !== 0)
      setShowTeaser((prevShowTeaser) => !prevShowTeaser);
  };

  const handleHomeIconClick = () => {
    setShowTeaser(false);
  };

  return (
    <div>
      <Header
        onFavoritesIconClick={handleFavoritesIconClick}
        onHomeIconClick={handleHomeIconClick}
      />
      <Hero />
      {showTeaser ? (
        <Teaser favArray={favorites} onClose={() => setShowTeaser(false)} />
      ) : (
        <Wrapper
          updateFavorites={updateFavorites}
          updateLastSearchResults={updateLastSearchResults}
          lastSearchResults={lastSearchResults}
          articleType={"popular"}
        />
      )}
    </div>
  );
}

export default LandingPage;
