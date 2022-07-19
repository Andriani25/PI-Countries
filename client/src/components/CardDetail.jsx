import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { countryID } from "../actions/index.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TurnBack from "../multimedia/TurnBack.png";
import style from "../CSSModules/CardDetail.module.css";

export default function CardDetail() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { ID } = useParams();

  useEffect(() => {
    dispatch(countryID(ID));
  }, [dispatch, ID]);

  const myCountry = useSelector((state) => state.detail);

  return (
    <div>
      {myCountry ? (
        <div className={style.body}>
          <div>
            <img src={myCountry.img} alt="Flag not found!" />
          </div>
          <div>
            <h3 className="nameDetail">{myCountry.name}</h3>
            <h4 className="continentDetail">{myCountry.continent}</h4>
            <p>Capital: {myCountry.capital}</p>
            <p>ID: {myCountry.ID}</p>
            <p>Sub Region: {myCountry.subregion}</p>
            <p>Area: {myCountry.area?.toLocaleString()} km2</p>
            <p>Population: {myCountry.population?.toLocaleString()}</p>
            <h5 className="detailActivities">
              Activities:
              {myCountry.activities
                ? myCountry.activities.map((e) => {
                    return (
                      <div>
                        <h3>{e.name}</h3>
                        <span>
                          Difficulty: {e.difficulty}, Duration: {e.duration}
                        </span>
                        <h4>Season: {e.season} </h4>
                      </div>
                    );
                  })
                : "No Activities Founded!"}
            </h5>
            <img
              className={style.backbutton}
              src={TurnBack}
              alt="Go Home!"
              onClick={() => navigate("/home")}
            />
          </div>
        </div>
      ) : (
        <p> Loading... </p>
      )}
    </div>
  );
}
