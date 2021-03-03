const db = require("../config/database");
const axios = require("axios");

exports.createCity = async (req, res) => {
  try {
    const { nome, pais } = req.body;
    await db.query("INSERT INTO cidades (nome,pais) VALUES ($1,$2)", [
      nome,
      pais,
    ]);
    res.status(200).send({
      status: 200,
      message: "City added successfully!",
      data: {
        city: { nome, pais },
      },
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
};

const createCidade = async (nome, pais) => {
  try {
    await db.query("INSERT INTO cidades (nome,pais) VALUES ($1,$2)", [
      nome,
      pais,
    ]);
    return true;
  } catch (err) {
    return err;
  }
};

exports.getLast = async (req, res) => {
  try {
    const { limit } = req.body;
    const response = await db.query(
      `SELECT * FROM cidades ORDER BY id DESC limit ${limit}`
    );
    const data = response.rows;
    res.status(200).send({
      status: 200,
      message: `Got last ${limit} cities succesfully`,
      data,
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
};

exports.getFrequency = async (req, res) => {
  try {
    const response = await db.query(
      `SELECT nome, count(*) FROM cidades GROUP BY nome ORDER BY count DESC`
    );
    const data = response.rows;
    res.status(200).send({
      status: 200,
      message: `Got frequency vector succesfully`,
      data,
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
};

exports.getWeather = async (req, res) => {
  try {
    const { nome } = req.body;

    const opw_url = `${process.env.OPWAPI}/weather?q=${nome}&units=metric&lang=pt_br&appid=${process.env.OPWAPIKEY}`;

    const response = await axios.get(opw_url);
    await createCidade(response.data.name, response.data.sys.country);
    res.status(200).send({
      status: 200,
      message: `Got weather from ${response.data.name} succesfully`,
      data: response.data,
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
};
