import React, { useState } from "react";
import styles from "./Card.module.scss";
import Popup from "../Popup/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faShareNodes,
  faXmark,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Card = (props: {
  onIconToggle: (id: number) => void;
  img: string;
  views: number;
  tags: string;
  user: string;
  likes: number;
  comments: number;
  direction: string;
  size: string;
  id: number;
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isIconActive, setIsIconActive] = useState(false);

  const handleImageClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const renderCardContent = () => (
    <div className={styles.previewBox}>
      <h3 className={styles.title}>{props.views}</h3>
      <p className={styles.content}>{props.tags}</p>
    </div>
  );

  const renderCardIcons = (id: number) => (
    <div className={styles.detailsBox}>
      <div className={styles.authorBox}>
        <p className={styles.author}>{props.user}</p>
        <p className={styles.date}>
          likes: {props.likes} comments: {props.comments}
        </p>
      </div>
      <div className={styles.iconBox}>
        <FontAwesomeIcon
          onClick={() => handleIconClick(id)}
          icon={faBookmark}
          className={styles.bookmarkIcon}
          style={{ color: isIconActive ? "#1f3f68" : "" }}
        />
        <FontAwesomeIcon icon={faShareNodes} className={styles.shareIcon} />
      </div>
    </div>
  );

  const handleArrowClick = (e: any) => {
    console.log("arrow clicked", e);
  };

  const handleIconClick = (id: number) => {
    setIsIconActive(!isIconActive);
    props.onIconToggle(id);
  };
  return (
    <>
      <div
        className={`${styles.cardContainer} ${
          props.direction ? styles[props.direction] : ""
        } ${props.size ? styles[props.size] : ""} `}
      >
        <div className={styles.thumbnailContainer}>
          <img
            onClick={handleImageClick}
            className={styles.thumbnail}
            src={props.img}
            alt="dummy text"
          />
        </div>
        <div className={styles.previewContainer}>
          {renderCardContent()}
          {renderCardIcons(props.id)}
        </div>
      </div>
      {isPopupOpen && (
        <Popup onClose={handleClosePopup}>
          <div className={`${styles.cardContainer} ${styles.popup}`}>
            <FontAwesomeIcon
              onClick={handleArrowClick}
              icon={faChevronLeft}
              className={`${styles.chevronLeft} ${styles.chevron}`}
            />
            <FontAwesomeIcon
              onClick={handleClosePopup}
              icon={faXmark}
              className={styles.xIcon}
            />
            <div className={styles.thumbnailContainer}>
              <img
                onClick={handleClosePopup}
                className={styles.thumbnail}
                src={props.img}
                alt="dummy text"
              />
            </div>
            <div className={styles.previewContainer}>
              {renderCardContent()}
              {renderCardIcons(props.id)}
            </div>
            <FontAwesomeIcon
              onClick={handleArrowClick}
              icon={faChevronRight}
              className={`${styles.chevronRight} ${styles.chevron}`}
            />
          </div>
        </Popup>
      )}
    </>
  );
};

export default Card;