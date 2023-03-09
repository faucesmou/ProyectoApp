const fs = require('fs');

module.exports = {
  getIndex : (req, res) => {
    console.log("entrando en home");
    res.render('index', { title: 'Predicción CreaTech' });
  },
  postIndex : (req, res) => {
    const {year, mileage, city, state, make_number, model_number} = req.body;
    console.log(req.body);
    const data = {
      year,
      mileage,
      city,
      state,
      make_number,
      model_number
    };

    try {
      fs.writeFileSync('data.json', JSON.stringify(data));
      console.log('Data written to file');
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al guardar los datos');
      return;
    }
  }}






