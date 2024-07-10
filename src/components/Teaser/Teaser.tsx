import React, { useState, useEffect } from "react";
import Card from "components/Card/Card";
import styles from "./Teaser.module.scss";

const Teaser = (props: { favArray: any[]; onClose: () => void }) => {
  const [visibleImages, setVisibleImages] = useState(4);

  const handleClick = () => {
    props.onClose();
  };

  const loadMoreImages = () => {
    setVisibleImages((prevVisibleImages) =>
      Math.min(prevVisibleImages + 4, props.favArray.length)
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const limit = document.body.offsetHeight - 100;
      if (scrollPosition >= limit) {
        loadMoreImages();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props.favArray.length]);

  const handleIconToggle = (data: any) => {
    console.log("Icon toggled:", data);
  };

  return (
    <div className={`container`}>
      <div className={styles.teaserOverlay} onClick={handleClick}>
        <div className={styles.teaserContent}>
          {props.favArray.slice(0, visibleImages).map((item, index) => (
            <Card
              key={index}
              id={item.id}
              img={item.img}
              views={item.views}
              tags={item.tags}
              user={item.user}
              likes={item.likes}
              comments={item.comments}
              onIconToggle={handleIconToggle}
              direction="horizontal"
              size="bigger"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teaser;
