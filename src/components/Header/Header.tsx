import React from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHouse } from "@fortawesome/free-solid-svg-icons";

const Header = (props: {
  onFavoritesIconClick: () => void;
  onHomeIconClick: () => void;
}) => {
  return (
    <header className={styles.websiteHeader}>
      <div className={styles.headerContainer}>
        <FontAwesomeIcon
          icon={faHouse}
          className={`${styles.icon} ${styles.logo}`}
          onClick={props.onHomeIconClick}
        />
        <FontAwesomeIcon
          icon={faBookmark}
          className={styles.icon}
          onClick={props.onFavoritesIconClick}
        />
      </div>
    </header>
  );
};

export default Header;
