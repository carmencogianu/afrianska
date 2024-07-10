import React from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Header = (props: { onIconClick: () => void }) => {
  return (
    <header className={styles.websiteHeader}>
      <div className={styles.headerContainer}>
        <img className={styles.logo} src="assets/logo.png" alt="logo" />
        <FontAwesomeIcon
          icon={faBookmark}
          className={styles.bookmarkIcon}
          onClick={props.onIconClick}
        />
      </div>
    </header>
  );
};

export default Header;
