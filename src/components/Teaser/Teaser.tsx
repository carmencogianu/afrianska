import React, { useState, useEffect } from "react";
// import Card from "components/Card/Card";
import styles from "./Teaser.module.scss";

const Teaser = (props: { imgArray: number[]; onClose: () => void }) => {
  const [visibleImages, setVisibleImages] = useState(4);

  const handleClick = () => {
    props.onClose();
  };

  const loadMoreImages = () => {
    setVisibleImages((prevVisibleImages) =>
      Math.min(prevVisibleImages + 4, props.imgArray.length)
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
  }, [props.imgArray.length]);

  return (
    <div className={`container`}>
      <div className={styles.teaserOverlay} onClick={handleClick}>
        <div className={styles.teaserContent}>
          {props.imgArray.slice(0, visibleImages).map((id, index) => (
            // <img key={index} src="" alt="dummy text" />
            <p key={index}>{id}</p>
            // <Card />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teaser;
