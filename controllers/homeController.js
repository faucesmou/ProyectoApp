/* const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const { google } = require('googleapis'); */

/* const endpoint_Id = "1723928679236501504";
const proyect_Id = "buoyant-road-376019";


module.exports = {
  getIndex: (req, res) => {
    console.log("entrando en home");
    res.render('index', { title: 'Predicción CreaTech' });
  },
  postIndex: (req, res) => {
    console.log('Datos del formulario:', req.body);
    const { year, mileage, city, state, make_number, model_number } = req.body;

    const data1 = {
      year,
      mileage,
      city,
      state,
      make_number,
      model_number
    };
    //se escribe el archivo data.json a partir del submit del formulario del puerto 3000:
    try {
      fs.writeFileSync('data.json', JSON.stringify(data1));
      console.log('Data written to file');
      const jsonData = fs.readFileSync('data.json', 'utf8');
      console.log("este es el jsonData:" + jsonData);
      const parsedData = JSON.parse(jsonData);
      console.log("este es el parsedData:" +parsedData);
      let jsonRequest = {
        instances: [parsedData]
      };
      jsonRequest = JSON.stringify(jsonRequest);
      console.log("ESTE es el jsonRequest!:" + jsonRequest); 

      // comienza la solicitud a google cloud: 
      exec('gcloud auth print-access-token', (err, stdout, stderr) => {
        if (err) {
          console.log("error ejecutando el comando gloud auth print-access-token, este es el err.message:" + err.message);
          return res.status(500).json({ error: 'Ha ocurrido un error al autenticar la solicitud'});
        }
        // Capturamos el token de autenticación
        const accessToken = stdout.trim();
        console.log(accessToken);

        const url = `https://southamerica-east1-aiplatform.googleapis.com/v1/projects/${proyect_Id}/locations/southamerica-east1/endpoints/${endpoint_Id}:predict`;
        const headers = {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        };
        const data = jsonRequest;
        axios.post(url, data, { headers })
          .then(response => {
            console.log("Este es data del then:" + data);
            console.log("Este es el response.data del then:" + response.data);
            res.send(response.data);
          })
          .catch(error => {
            console.log("Este es el jsonRequest:" + jsonRequest);
            console.log('Error N°2, durante la petición a la API de google Cloud:', error.message);
            res.status(500).json({ error: 'Ha ocurrido un error al realizar la solicitud a la API de Google Cloud' });
          })
          .finally(() =>{
            //elimino el archivo "data.json" luego de completar la solicitud
            fs.unlinkSync('data.json');
          })
      }); 

    } catch (error) {
      console.log('Se ha producido el tercer error en la petición:', error.message);
      res.status(500).json({ error: 'Ha ocurrido el tercer error en la petición' });
      return;
    }
     res.redirect('/');  
     res.send(req.body); 
  }
}; */
//------------------------------------------------------------------------------------->

const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');
const { google } = require('googleapis');
/* const rutaArchivoJson = '../data3.json';
const jsonRequest = require(rutaArchivoJson); */

const endpoint_Id = "1723928679236501504";
const proyect_Id = "buoyant-road-376019";

const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

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
      await fs.promises.writeFile('data.json', JSON.stringify(data));
      console.log('Data written to file');

      const jsonData = await readFileAsync('data.json', 'utf8');
      console.log("Este es el jsonData: " + jsonData);

      const parsedData = JSON.parse(jsonData);
      console.log("Este es el parsedData: " + parsedData);

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
/* 
      let data = {
        instances: [parsedData]
      }; */
/*       const data3 = jsonRequest; */
/*       console.log("este es el data antes del stringify:" + data);
      data = JSON.stringify(data); */
      console.log("este es el data " + data)

      const response = await axios.post(url, data, { headers });
      console.log("Este es el response.data: " + response.data);

      await unlinkAsync('data.json');
      console.log("Archivo data.json eliminado.");
      console.log(response.data);
      res.send(response.data);

    } catch (error) {
      console.error('Se ha producido el tercer error en la petición:', error.message);
      res.status(500).json({ error: 'Ha ocurrido un error al realizar la solicitud a la API de Google Cloud' });
    }
  }
};

