//EMPIEZA EL CÓDIGO ORIGINAL
const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process');
const endpoint_Id = "157801908818411520";
const proyect_Id = "buoyant-road-376019";

module.exports = {
  getIndex: (req, res) => {
    console.log("entrando en home");
    res.render('index', { title: 'Predicción CreaTech' });
  },
  postIndex: (req, res) => {
    const { year, mileage, city, state, make_number, model_number } = req.body;
    console.log('filepath: ', req.body.filePath)
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
      const jsonData = fs.readFileSync('data.json', 'utf8');
      const jsonRequest = JSON.parse(jsonData);
      console.log(jsonRequest);

      exec('gcloud auth print-access-token', (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return res.status(500).send('¡Hubo un error al procesar los datos!');
        }
        // Capturamos el token de autenticación
        const accessToken = stdout.trim();

        const url = `https://southamerica-east1-aiplatform.googleapis.com/v1/projects/${proyect_Id}/locations/southamerica-east1/endpoints/${endpoint_Id}:predict`;
        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        };



        axios.post(url, jsonRequest, { headers })
          .then(response => {
            console.log(response.data);
            res.send(response.data);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send('¡Hubo un error al procesar los datos!');
          });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al guardar los datos');
      return;
    }


    /* res.redirect('/');  */
    // res.send(req.body);

  }
};
//HASTA ACÁ LLEGA EL CÓDIGO ORIGINAL

// depurando el proyecto: generamos una función directamente desde el objeto literal getIndex y post Index, en vez de haber instanciado primero el objeto vacío
// y después añadirle los elementos.

/* homeController.getIndex = (req, res) => {
  console.log("entrando en home");
  res.render('index', { title: 'Predicción CreaTech' });
}; */

/*homeController.postIndex = (req, res) => {
  console.log(req.body);
  const { year, mileage, city, state, make_number, model_number } = req.body;
  const data = {
    year,
    mileage,
    city,
    state,
    make_number,
    model_number
  };
  fs.writeFileSync('data.json', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
  res.redirect('/');
};*/
/* había puesto esta línea de código en la línea 9: return res.send(req.body); */

