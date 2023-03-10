const fs = require('fs');

const datosJson = require("../data.json")

module.exports = {
  getIndex: (req, res) => {
    console.log("entrando en home");
    res.render('index', { title: 'Predicción CreaTech' });
  },
  postIndex: (req, res) => {
    const { year, mileage, city, state, make_number, model_number } = req.body;
    console.log(req.body);
    //cambio el estilo usando el modelo que me mostró cristian para guardar la data pero el problema persiste:
    let mensaje1 = "formulario cargado con éxito"
    console.log(mensaje1);
    console.log(year);
    let data = {
      year: year,
      mileage: mileage,
      city: city,
      state: state,
      make_number: make_number,
      model_number: model_number,
    };
    datosJson.push(data);
    let datosFinal = JSON.stringify(datosJson);
    console.log("estos son los datosFinal json" + datosFinal);

    try {
      fs.writeFileSync('data.json', datosFinal);
      console.log('Data written to file');
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al guardar los datos');
      return;
    }
  }
}






