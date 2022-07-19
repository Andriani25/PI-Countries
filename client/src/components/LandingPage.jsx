import React from "react";
import { Link } from "react-router-dom";
import style from "../CSSModules/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.body}>
      <h1 className={style.text}>Let's navigate, Captain!</h1>
      <Link className={style.link} to="/home">
        <button className={style.button}>See the World Map</button>
      </Link>
      <div className={style.div}></div>
    </div>
  );
}
