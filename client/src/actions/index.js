import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}

export function countryID(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: "ID_COUNTRY",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function countryOrderByName(order) {
  return {
    type: "ORDER_NAME",
    payload: order,
  };
}

// return async function (dispatch) {
//   try {
//     let json = await axios.get(
//       `http://localhost:3001/countries?alpha=${order}`
//     );
//     return dispatch({
//       type: "ORDER_NAME",
//       payload: json.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export function countryOrderByPopulation(order) {
  return {
    type: "ORDER_POPULATION",
    payload: order,
  };
}

// return async function (dispatch) {
//   try {
//     let json = await axios.get(
//       `http://localhost:3001/countries?order=${order}`
//     );
//     return dispatch({
//       type: "ORDER_POPULATION",
//       payload: json.data,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export function countryName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/countries/?name=${name}`
      );
      return dispatch({
        type: "NAME_COUNTRY",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}

export function filterByActivity(payload) {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload,
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.post(
        "http://localhost:3001/activities",
        payload
      );
      console.log(json);
      return dispatch({
        type: "POST_ACTIVITY",
        json,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// export function countryName(name) {
//   return function (dispatch) {
//  axios.get(`http://localhost:3001/countries/?name=${name}`)
//       .then((json) =>
//         dispatch({
//           type: "NAME_COUNTRY",
//           payload: json.data,
//         })
//       )
//       .catch((error) => {
//         console.log(error);
//       });
//   };
// }
