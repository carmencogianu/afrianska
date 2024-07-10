import React, { useEffect } from "react";
import styles from "./Popup.module.scss";

const Popup = (props: { children: React.ReactNode; onClose: () => void }) => {
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.closest(`.${styles.popupContent}`) === null
    ) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>{props.children}</div>
    </div>
  );
};

export default Popup;
