const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

/* const endpoint_Id = "157801908818411520";
const proyect_Id = "buoyant-road-376019";
const rutaArchivoJson = './data.json'; */

//seteando las rutas
const homeRouter = require("./routes/home");


//seteando motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));




//estamos utilizando la ruta "/" Para construir los endpoints, pero cuando solo utilizamos get, estamos   limitados a una unica ruta por get en especifico
app.use('/', homeRouter);


/*
app.post('/formulario', (req, res) => {
  const filePath = req.body.filePath;
  const jsonData = fs.readFileSync(filePath, 'utf8');
  console.log(jsonData);
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
}); //fin del app.post()
*/

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

