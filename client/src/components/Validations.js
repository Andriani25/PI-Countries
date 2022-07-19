export default function ValidateFunction(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "A name is required!";
  }
  if (!input.difficulty || 0 > input.difficulty || 5 < input.difficulty) {
    errors.difficulty = "Difficulty must be a number between 1 and 5";
  }
  if (!input.duration || 0 > input.duration || 24 < input.duration) {
    errors.duration = "Duration must be between the 24hs of the day!";
  }
  if (!input.season) {
    errors.season = "A season must be selected!";
  }
  if (!input.countries[0]) {
    errors.countries = "At least you need select 1 country!";
  }
  return errors;
}
