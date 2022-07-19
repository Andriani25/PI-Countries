import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { countryName } from "../actions";
import style from "../CSSModules/Home.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function inputChange(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(countryName(name));
    setName("");
  }

  return (
    <div>
      <input
        className={style.searchBar}
        type="text"
        placeholder="Search a Country!.."
        onChange={(e) => inputChange(e)}
      />
      <button
        className={style.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
