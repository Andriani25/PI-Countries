import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivity } from "../actions";
import ValidateFunction from "./Validations";
import style from "../CSSModules/Form.module.css";

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const navigate = useNavigate();
  const seasons = ["Summer", "Autumn", "Winter", "Spring"];

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      ValidateFunction({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
    setErrors(
      ValidateFunction({
        ...input,
        season: e.target.value,
      })
    );
  }

  function handleSelectCountries(e) {
    if (input.countries.includes(e.target.value)) {
      return setInput({
        ...input,
      });
    }
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });

    setErrors(
      ValidateFunction({
        ...input,
        countries: [...input.countries, e.target.value],
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postActivity(input));
    alert("Created Succesfully!");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
  }

  function handleRemoveCountry(e) {
    setInput({
      ...input,
      countries: input.countries.filter((removed) => removed !== e),
    });
  }

  return (
    <div className={style.body}>
      <h1 className={style.text}> Create a new Activity for the crew! </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className={style.text}>Name:</label>
          <input
            className={style.input}
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label className={style.text}>Difficulty:</label>
          <input
            className={style.input}
            type="number"
            value={input.difficulty}
            name="difficulty"
            onChange={(e) => handleChange(e)}
          />
          {errors.difficulty && <p>{errors.difficulty}</p>}
        </div>
        <div>
          <label className={style.text}>Duration:</label>
          <input
            className={style.input}
            type="number"
            value={input.duration}
            name="duration"
            onChange={(e) => handleChange(e)}
          />
          {errors.duration && <p>{errors.duration}</p>}
        </div>
        <div>
          <select
            className={style.input}
            onChange={(e) => handleSelectSeason(e)}
          >
            {seasons.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          {errors.season && <p>{errors.season}</p>}
        </div>
        <div>
          <select
            className={style.input}
            onChange={(e) => handleSelectCountries(e)}
          >
            {countries.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
          {errors.countries && <p>{errors.countries}</p>}
          {input.countries?.map((e) => (
            <div key={e}>
              <p>{e}</p>
              <button
                type="reset"
                className={style.deletebutton}
                onClick={() => handleRemoveCountry(e)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <button
          className={style.button}
          type="submit"
          disabled={
            !input.name ||
            !input.duration ||
            !input.difficulty ||
            !input.season ||
            !input.countries[0]
          }
        >
          Create Activity!
        </button>
      </form>
      <p className={style.textCompass}>Return to Map!</p>
      <img
        className={style.backbutton}
        src={
          "https://i0.wp.com/magicandmurder.com/wp-content/uploads/2015/12/treasure_map.png?resize=700%2C412&ssl=1"
        }
        alt="Go Home!"
        onClick={() => navigate("/home")}
      />
    </div>
  );
}
