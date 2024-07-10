import React from "react";
import styles from "./Title.module.scss";

const Title = (props: { title: string; active: boolean }) => {
  const paddingTop = props.active ? "56px" : "";
  const borderTop = props.active ? "2px solid #999" : "";
  return (
    <div
      style={{ paddingTop: `${paddingTop}`, borderTop: `${borderTop}` }}
      className={`container ${styles.titleContainer}`}
    >
      <h4 className={styles.title}>{props.title}</h4>
    </div>
  );
};
export default Title;
