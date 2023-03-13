const axios = require('axios');
const fs = require('fs');
/* const { promisify } = require('util'); */
const { google } = require('googleapis');
/* const rutaArchivoJson = '../data3.json';
const jsonRequest = require(rutaArchivoJson); */

const endpoint_Id = "1723928679236501504";
const proyect_Id = "buoyant-road-376019";

/* const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink); */

module.exports = {
  getIndex: (req, res) => {
    console.log("Entrando en home");
    res.render('index', { title: 'Predicción CreaTech' });
  },
  postIndex: async (req, res) => {
    console.log('Datos del formulario:', req.body);

    const { year, mileage, city, state, make_number, model_number } = req.body;

    const data = {
      instances: [
        {
          Year: `${year}.0`,
          Mileage: `${mileage}.0`,
          City: city,
          State: state,
          Make_number: `${make_number}.0`,
          Model_number: `${model_number}.0`,
        },
      ],
    };

    try {
      const auth = new google.auth.GoogleAuth({
        scopes: [
          'https://www.googleapis.com/auth/cloud-platform',
          'https://www.googleapis.com/auth/userinfo.email'
        ]
      });

      const authClient = await auth.getClient();
      const accessToken = await authClient.getAccessToken();

      const url = `https://southamerica-east1-aiplatform.googleapis.com/v1/projects/${proyect_Id}/locations/southamerica-east1/endpoints/${endpoint_Id}:predict`;
      const headers = {
        'Authorization': `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.post(url, data, { headers });
      console.log("Este es el response.data: " + response.data);
      console.log("este es el resultado 1: " + JSON.stringify(response.data));
      res.send(response.data);

     /*  await unlinkAsync('data.json');
       console.log("Archivo data.json eliminado."); 
      console.log("este es el resultado 2:" + JSON.stringify(response.data));
      res.send(response.data); */

    } catch (error) {
      console.error('Se ha producido el tercer error en la petición:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al realizar la solicitud a la API de Google Cloud' });
    }
  }
};

