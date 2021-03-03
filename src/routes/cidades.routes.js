const router = require("express-promise-router")();
const cidadesController = require("../controllers/cidades.controller");

router.post("/cidades", cidadesController.createCity);
router.post("/cidades/recentes", cidadesController.getLast);
router.get("/cidades/frequencia", cidadesController.getFrequency);
router.post("/cidades/clima", cidadesController.getWeather);

module.exports = router;
