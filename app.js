const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

// Seteando las rutas
const homeRouter = require("./routes/home");

// Seteando motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configurando middleware para parsear body de requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurando middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

const endpoint_Id = "7604503892675526656";
const proyect_Id = "buoyant-road-376019";
const rutaArchivoJson = './data.json';

// Utilizamos la ruta "/" para construir los endpoints, pero cuando solo utilizamos GET, estamos limitados a una única ruta por GET en específico
app.use('/', homeRouter);

app.post('/api/prediction', (req, res) => {
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
    console.log(accessToken);
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
        return res.status(500).send('¡Hubo un error al procesar los datos!');
      });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

