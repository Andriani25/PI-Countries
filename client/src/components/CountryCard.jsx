import React from "react";
import { Link } from "react-router-dom";
import style from "../CSSModules/CountryCard.module.css";

export default function CountryCard({ name, img, continent, ID }) {
  return (
    <div className={style.card}>
      <h2 className={style.textCard}>{name}</h2>
      <Link to={`/home/${ID}`}>
        <img
          className={style.imgCard}
          src={img}
          alt="img not found"
          width="150px"
          height="150px"
        ></img>
      </Link>
      <h4>{continent}</h4>
    </div>
  );
}
