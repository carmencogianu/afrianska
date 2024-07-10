import React, { useState, useEffect } from "react";
import styles from "./Wrapper.module.scss";
import Card from "../Card/Card";
import Search from "../Search/Search";
import Title from "components/Title/Title";

const Wrapper = (props: {
  articleType: string;
  updateFavorites: (favorites: { id: number; img: string }[]) => void;
  updateLastSearchResults: (results: [any[], any[]]) => void;
  lastSearchResults: [any[], any[]];
}) => {
  const [searchResult, setSearchResult] = useState<[any[], any[]]>(
    props.lastSearchResults
  );
  const [favorites, setFavorites] = useState<{ id: number; img: string }[]>([]);

  useEffect(() => {
    props.updateFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    if (searchResult !== props.lastSearchResults) {
      props.updateLastSearchResults(searchResult);
    }
  }, [searchResult]);

  const handleSearchResult = (data: [any[], any[]]) => {
    setSearchResult(data);
  };

  const popularArray: any[] = searchResult[0] || [];
  const latestArray: any[] = searchResult[1] || [];
  const popularResults = popularArray
    .sort(
      (a, b) =>
        b.downloads +
        b.views +
        b.likes +
        b.comments -
        (a.downloads + a.views + a.likes + a.comments)
    )
    .slice(0, 4);
  const latestResults = latestArray
    .sort(
      (a, b) =>
        a.downloads +
        a.views +
        a.likes +
        a.comments -
        (b.downloads + b.views + b.likes + b.comments)
    )
    .slice(0, 4);
  const firstCard = popularResults[0];
  const remainingCards = popularResults.slice(1);

  const handleIconToggle = (data: {
    id: number;
    img: string;
    views: number;
    tags: string;
    user: string;
    likes: number;
    comments: number;
    direction: string;
  }) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((favorite) => favorite.id === data.id)) {
        return prevFavorites.filter((favorite) => favorite.id !== data.id);
      } else {
        return [
          ...prevFavorites,
          {
            id: data.id,
            img: data.img,
            views: data.views,
            tags: data.tags,
            user: data.user,
            likes: data.likes,
            comments: data.comments,
            direction: data.direction,
          },
        ];
      }
    });
  };

  return (
    <div className={`container`}>
      <Search onSearchResult={handleSearchResult} />
      {searchResult.length && popularResults.length ? (
        <div className={`${styles.innerWrapper}`}>
          <Title title={"popular"} active={false} />
          {firstCard && (
            <Card
              onIconToggle={handleIconToggle}
              direction={"horizontal"}
              size={"bigger"}
              img={firstCard.largeImageURL}
              views={firstCard.views}
              tags={firstCard.tags}
              user={firstCard.user}
              likes={firstCard.likes}
              comments={firstCard.comments}
              id={firstCard.id}
            />
          )}
          <div className={styles.verticalWrapper}>
            {remainingCards.map(
              (item, id) =>
                item && (
                  <Card
                    onIconToggle={handleIconToggle}
                    key={id}
                    direction={"vertical"}
                    size={"smaller"}
                    img={item.largeImageURL}
                    views={item.views}
                    tags={item.tags}
                    user={item.user}
                    likes={item.likes}
                    comments={item.comments}
                    id={item.id}
                  />
                )
            )}
          </div>
          <p className={styles.seeAllLink}>
            <a href="#">See All Popular Article</a>
          </p>

          <Title title={"all articles"} active={true} />
          <div className={styles.horizontalWrapper}>
            {latestResults.map((item, id) => {
              return (
                <Card
                  onIconToggle={handleIconToggle}
                  key={id}
                  direction={"horizontal"}
                  size={"smaller"}
                  img={item.largeImageURL}
                  views={item.views}
                  tags={item.tags}
                  user={item.user}
                  likes={item.likes}
                  comments={item.comments}
                  id={item.id}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Wrapper;
