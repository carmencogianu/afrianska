import React, { useState } from "react";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Search = (props: { onSearchResult: any }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState<[any[], any[]]>([[], []]);

  const fetchData = async (input: any) => {
    try {
      const response = await axios(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          input
        )}&order=popular&image_type=photo`
      );
      const response1 = await axios(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
          input
        )}&order=latest&image_type=photo`
      );

      const data = response?.data?.hits;
      const data1 = response1?.data?.hits;
      const combinedResults: [any[], any[]] = [data, data1];
      console.log(combinedResults);
      setSearchResult(combinedResults);
      props.onSearchResult(combinedResults);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("form submitted", inputValue);
    setInputValue("");
    fetchData(inputValue);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.searchContainer}>
      <div className={styles.search}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.magnGlassIcon}
        />
        <input
          onChange={handleChange}
          className={styles.searchInput}
          type="text"
          placeholder="Search Article"
          value={inputValue}
        />
      </div>
      <img src={`${searchResult}`} alt="" />
    </form>
  );
};
export default Search;
