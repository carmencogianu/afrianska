import React, { useState, useEffect } from "react";
import styles from "./Wrapper.module.scss";
import Card from "../Card/Card";
import Search from "../Search/Search";
import Title from "components/Title/Title";

const Wrapper = (props: {
  articleType: string;
  updateFavorites: (favorites: number[]) => void;
}) => {
  // 1. storage for data from search component
  const [searchResult, setSearchResult] = useState<[any[], any[]]>([[], []]);
  // 2. storage for favorite images
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    props.updateFavorites(favorites);
  }, [favorites]);

  // 1. getting data from search component and saving it in searchResult
  const handleSearchResult = (data: [any[], any[]]) => {
    setSearchResult(data);
  };
  // 1. manipulating data from searchResult
  // - as the result ia an array oa arrays, first one being ordered by popularity and the second one by date
  const popularArray: any[] = searchResult[0] || [];
  const latestArray: any[] = searchResult[1] || [];
  // console.log(popularArray);
  // - getting first 4 most popular items
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
  // - getting first 4 most latest items
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
  // - getting first popular item for the first Card
  const firstCard = popularResults[0];
  // - getting remaining 3 popular cards for the following 3 Cards
  const remainingCards = popularResults.slice(1);
  // 2. getting the "response" from the bookmark icon, and the image source from the Card whose icon was clicked
  // - checking if the image was already added to favorites, in this case it is removed from favorites by the filter, else it is added to the favorites array
  const handleIconToggle = (id: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((favoriteImg) => favoriteImg !== id);
      } else {
        return [...prevFavorites, id];
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
