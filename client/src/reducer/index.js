const initialState = {
  OriginalCountries: [],
  countries: [],
  activities: [],
  detail: {},
};

function stateSwitch(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        OriginalCountries: action.payload,
        countries: action.payload,
      };
    case "ID_COUNTRY":
      return {
        ...state,
        detail: action.payload,
      };
    case "NAME_COUNTRY":
      return {
        ...state,
        countries: action.payload,
      };
    case "ORDER_POPULATION":
      let CountriesToOrderPop = [...state.countries];
      if (action.payload === "ASC") {
        CountriesToOrderPop.sort((a, b) =>
          a.population > b.population ? 1 : -1
        );
      } else if (action.payload === "DESC") {
        CountriesToOrderPop.sort((a, b) =>
          b.population > a.population ? 1 : -1
        );
      } else {
        return {
          ...state,
          countries: state.OriginalCountries,
        };
      }

      return {
        ...state,
        countries: CountriesToOrderPop,
      };
    case "ORDER_NAME":
      let CountriesToOrderAlpha = [...state.countries];
      if (action.payload === "ASC") {
        CountriesToOrderAlpha.sort((a, b) => (a.name > b.name ? 1 : -1));
      } else if (action.payload === "DESC") {
        CountriesToOrderAlpha.reverse();
      } else {
        return {
          ...state,
          countries: state.OriginalCountries,
        };
      }

      return {
        ...state,
        countries: CountriesToOrderAlpha,
      };
    case "FILTER_BY_CONTINENT":
      const allCountries = state.OriginalCountries;
      const countriesFiltered =
        action.payload === "All continents"
          ? allCountries
          : allCountries.filter((e) => e.continent === action.payload);
      return {
        ...state,
        countries: countriesFiltered,
      };
    case "FILTER_BY_ACTIVITY":
      const Countries = state.OriginalCountries;
      const countriesActivity = Countries.filter((e) => {
        let Index = e.activities.findIndex(
          (el) => el.season === action.payload
        );
        if (Index !== -1) return true;
        if (action.payload === "All") {
          return true;
        }
        return false;
      });
      return {
        ...state,
        countries: countriesActivity,
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    case "POST_ACTIVITY":
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default stateSwitch;
