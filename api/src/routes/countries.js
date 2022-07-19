const { Router } = require("express");
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const router = Router();
router.get("/", async (req, res) => {
  let { name, order, alpha } = req.query;

  try {
    if (name) {
      const queryCountry = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: Activity,
      });
      if (queryCountry.length === 0) {
        return res.status(404).send("Country Doesnt Exists");
      }
      return res.json(queryCountry);
    }
    order = order?.toUpperCase();
    if (order === "ASC" || order === "DESC") {
      try {
        const popQuery = await Country.findAll({
          order: [["population", order]],
          include: {
            model: Activity,
          },
        });
        return res.status(200).send(popQuery);
      } catch (error) {
        res.status(500).send("Error");
      }
    }
    if (["ASC", "DESC"].includes(alpha?.toUpperCase())) {
      try {
        const alphaQuery = await Country.findAll({
          order: [["name", alpha]],
          include: {
            model: Activity,
          },
        });
        return res.send(alphaQuery);
      } catch (error) {
        res.status(500).send("ERROR", error);
      }
    } else {
      const allCountries = await Country.findAll({
        order: [["name", "ASC"]],
        include: {
          model: Activity,
        },
      });
      return res.send(allCountries);
    }
  } catch (error) {
    res.status(500).send("ERROR", error);
  }
});

router.get("/:id", async (req, res) => {
  const CountryId = req.params.id.toUpperCase();
  try {
    const getId = await Country.findByPk(CountryId, {
      include: Activity,
    });
    getId ? res.json(getId) : res.status(404).send(`${CountryId} not exist`);
  } catch (error) {
    res.status(500).send("ERROR", error);
  }
});

// router.get("/ping", (req, res) => {
//   res.send("pong");
// });

module.exports = router;
