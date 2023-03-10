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
//se escribe el archivo data.json a partir del submit del formulario del puerto 3000:
    try {
      fs.writeFileSync('data.json', JSON.stringify(data));
      console.log('Data written to file');
      const jsonData = fs.readFileSync('data.json', 'utf8');
      const parsedData = JSON.parse(jsonData);
      let jsonRequest = {
        instances: [parsedData]
      };
      jsonRequest = JSON.stringify(jsonRequest);
      /* console.log("ESTE es el jsonRequest!:" + jsonRequest); */

      //este paso es innecesario: 
      /* jsonRequest = JSON.parse(jsonData); 
      console.log(jsonRequest);*/

// comienza la solicitud a google cloud: 
      exec('gcloud auth print-access-token', (err, stdout, stderr) => {
        if (err) {
          console.log("este es el err.message:" + err.message);
          return res.status(500).json({ error: 'Ha ocurrido el primer error de la petición ' });
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
            console.log("Este es el jsonRequest:" + jsonRequest);
            console.log("Este es el response.data:" + response.data);
            res.send(response.data);
          })
          .catch(error => {
            console.log('Se ha producido el segundo error en la petición:', error.message);
            res.status(500).json({ error: 'Ha ocurrido el segundo error en la petición' });
          });
      });
      
    } catch (error) {
      console.log('Se ha producido el tercer error en la petición:', error.message);
      res.status(500).json({ error: 'Ha ocurrido el tercer error en la petición' });
      return;
    }
    /* res.redirect('/');  */
    // res.send(req.body);
  }
};
//------------------------------------------------------------------------------------->
