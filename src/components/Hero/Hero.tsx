import React from "react";
import styles from "./Hero.module.scss";
// import classNames from "classnames";

const Hero = (props: {}) => {
  return (
    <section className={styles.websiteHero}>
      <div className={styles.heroContainer}>
        <h1 className={styles.title}>Blog Afrianska</h1>
        <p className={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </div>
    </section>
  );
};

export default Hero;
