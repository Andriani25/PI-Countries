const { Router } = require("express");
const { Activity, Country } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const searchActivity = await Activity.findAll({
      include: {
        model: Country,
      },
    });
    return res.json(searchActivity);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    const countriesSearch = countries.map((country) => {
      return Country.findOne({
        where: {
          name: country,
        },
      });
    });
    const countriesFounded = await Promise.all(countriesSearch);
    await newActivity.addCountries(countriesFounded);

    res.status(200).send("Activity created succesfuly!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Activity can not be created", error);
  }
});

module.exports = router;
