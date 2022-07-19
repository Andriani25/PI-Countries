import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByContinent,
  getCountries,
  countryOrderByName,
  countryOrderByPopulation,
  filterByActivity,
} from "../actions";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import style from "../CSSModules/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFistCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    indexOfFistCountry,
    indexOfLastCountry
  );

  const paginado = (numPag) => {
    setCurrentPage(numPag);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  function handleFilterContinent(e) {
    dispatch(filterByContinent(e.target.value));
  }

  function handleFilterActivity(e) {
    dispatch(filterByActivity(e.target.value));
  }

  function handleOrdererByPopulation(e) {
    dispatch(countryOrderByPopulation(e.target.value));
  }

  function handleOrdererByName(e) {
    dispatch(countryOrderByName(e.target.value));
  }

  function handleNext(e) {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
  }

  function handlePrevious(e) {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  }

  function resetCountries() {
    dispatch(getCountries());
  }

  return (
    <div className={style.body}>
      <h1 className={style.title}>You decide the next landing, Captain!</h1>
      <SearchBar key="sb" />
      <button onClick={() => resetCountries()}>Buy a new Map</button>
      <Link to="/create">Create Activity!</Link>
      <div>
        <span>Filter by Continent</span>
        <select
          className={style.orderFilters}
          onChange={(e) => handleFilterContinent(e)}
        >
          <option value="All continents">All continents</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
        </select>
        <span>Filter by Season Activity</span>
        <select
          className={style.orderFilters}
          onChange={(e) => handleFilterActivity(e)}
        >
          <option value="All">All countries</option>
          <option value="Autumn">Autumn</option>
          <option value="Spring">Spring</option>
          <option value="Winter">Winter</option>
          <option value="Summer">Summer</option>
        </select>
        <span>Ordering by Population</span>
        <select
          className={style.orderFilters}
          onChange={(e) => handleOrdererByPopulation(e)}
        >
          <option value="XD">Order Default </option>
          <option value="ASC">Order by Lowest Population </option>
          <option value="DESC">Order by Highest Population</option>
        </select>
        <span>Ordering by Name</span>
        <select
          className={style.orderFilters}
          onChange={(e) => handleOrdererByName(e)}
        >
          <option value="XD">Order Default </option>
          <option value="ASC">Alphabetically Ascending</option>
          <option value="DESC">Alphabetically Descending</option>
        </select>
        <button onClick={(e) => handlePrevious(e)}> Back </button>
        <Paginado
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginado={paginado}
          key="pn"
        />
        <button disable={currentPage === 24} onClick={(e) => handleNext(e)}>
          {" "}
          Next{" "}
        </button>
        <div className={style.cardConteiner}>
          {currentCountries?.map((e) => {
            return (
              <CountryCard
                name={e.name}
                img={e.img}
                continent={e.continent}
                ID={e.ID}
                key={e.ID}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
