/* Código inicial 07/03/:
 "const express = require('express');
const app = express();
const path = require('path');
const homeRouter = require('./routes/home');

const axios = require('axios');
const fs = require('fs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRouter);

// Definimos un nuevo middleware
app.use((req, res, next) => {
  res.locals.message = '';
  next();
});

const endpoint_Id = "5309919882530258944";
const proyect_Id = "buoyant-road-376019";
const rutaArchivoJson = './data.json';

app.post('/api/prediction', (req, res) => {
  fs.readFile(rutaArchivoJson, (err, data) => {
      if (err) throw err;
      const jsonRequest = JSON.parse(data);
      
      // Ejecutamos el comando "gcloud auth print-access-token" para obtener el token de autenticación
      const { exec } = require('child_process');
      exec('gcloud auth print-access-token', (err, stdout, stderr) => {
          if (err) {
              console.error(err);
              return;
          }
          // Capturamos el token de autenticación
          const accessToken = stdout.trim();

          const url = `https://southamerica-east1-aiplatform.googleapis.com/v1/projects/${proyect_Id}/locations/southamerica-east1/endpoints/${endpoint_Id}:predict`;
          const headers = {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
          };
          const data = jsonRequest;
          axios.post(url, data, { headers })
              .then(response => {
                  console.log(response.data);
                  // Actualizamos la propiedad message del objeto res.locals
                  res.locals.message = '¡Datos procesados con éxito!';
                  next();
              })
              .catch(error => {
                  console.error(error);
                  // Actualizamos la propiedad message del objeto res.locals
                  res.locals.message = '¡Hubo un error al procesar los datos!';
                  next();
              });
      });
  });
});

// Definimos otro middleware para enviar la respuesta al cliente
app.use((req, res) => {
  if (res.locals.message !== '') {
    res.send(res.locals.message);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

" */
// prueba n2: 

/* const express = require('express');
const app = express();
const path = require('path');
const homeRouter = require('./routes/home');
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRouter);

// Definimos un nuevo middleware
app.use((req, res, next) => {
  res.locals.message = '';
  next();
});

const endpoint_Id = "5309919882530258944";
const proyect_Id = "buoyant-road-376019";
const rutaArchivoJson = './data.json';

app.post('/api/prediction', (req, res, next) => {
  fs.readFile(rutaArchivoJson, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('¡Hubo un error al procesar los datos!');
    }
    const jsonRequest = JSON.parse(data);
    exec('gcloud auth print-access-token', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return res.status(500).send('¡Hubo un error al procesar los datos!');
      }
      const accessToken = stdout.trim();

      const url = `https://southamerica-east1-aiplatform.googleapis.com/v1/projects/${proyect_Id}/locations/southamerica-east1/endpoints/${endpoint_Id}:predict`;
     
 */

/* const express = require('express');
const app = express();
const path = require('path');
const homeRouter = require('./routes/home');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
}); */
//-------------------------------------------------------------
/* const express = require('express');
const app = express();
const path = require('path');
const homeRouter = require('./routes/home');

const axios = require('axios');
const fs = require('fs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRouter);

// Definimos un nuevo middleware
app.use((req, res, next) => {
  res.locals.message = '';
  next();
});

const endpoint_Id = "5309919882530258944";
const proyect_Id = "buoyant-road-376019";
const rutaArchivoJson = './data.json';

app.post('/api/prediction', (req, res) => {
  fs.readFile(rutaArchivoJson, (err, data) => {
      if (err) throw err;
      const jsonRequest = JSON.parse(data);
      
      // Ejecutamos el comando "gcloud auth print-access-token" para obtener el token de autenticación
      const { exec } = require('child_process');
      exec('gcloud auth print-access-token', (err, stdout, stderr) => {
          if (err) {
              console.error(err);
              return;
          }
          // Capturamos el token de autenticación
          const accessToken = stdout.trim();

          const url = `https://southamerica-east1-aiplatform.googleapis.com/v1/projects/${proyect_Id}/locations/southamerica-east1/endpoints/${endpoint_Id}:predict`;
          const headers = {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
          };
          const data = jsonRequest;
          axios.post(url, data, { headers })
              .then(response => {
                  console.log(response.data);
                  // Actualizamos la propiedad message del objeto res.locals
                  res.locals.message = '¡Datos procesados con éxito!';
                  next();
              })
              .catch(error => {
                  console.error(error);
                  // Actualizamos la propiedad message del objeto res.locals
                  res.locals.message = '¡Hubo un error al procesar los datos!';
                  next();
              });
      });
  });
});

// Definimos otro middleware para enviar la respuesta al cliente
app.use((req, res) => {
  if (res.locals.message !== '') {
    res.send(res.locals.message);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

 */

// último código de app.js:
/* const express = require('express');
const app = express();
const path = require('path');
const homeRouter = require('./routes/home');
const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRouter);

// Definimos un nuevo middleware
app.use((req, res, next) => {
  res.locals.message = '';
  next();
});

const endpoint_Id = "5309919882530258944";
const project_Id = "buoyant-road-376019";
const rutaArchivoJson = './data.json';

app.post('/api/prediction', (req, res, next) => {
  fs.readFile(rutaArchivoJson, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('¡Hubo un error al procesar los datos!');
    }
    const jsonRequest = JSON.parse(data);
    exec('gcloud auth print-access-token', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return res.status(500).send('¡Hubo un error al procesar los datos!');
      }
      const accessToken = stdout.trim();

      const url = `https://southamerica-east1-aiplatform.googleapis.com/v1/projects/${project_Id}/locations/southamerica-east1/endpoints/${endpoint_Id}:predict`;
     
      const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };

      axios.post(url, jsonRequest, { headers })
        .then(response => {
          console.log(response.data);
          res.locals.message = '¡Datos procesados con éxito!';
          next();
        })
        .catch(error => {
          console.error(error);
          res.locals.message = '¡Hubo un error al procesar los datos!';
          next();
        });
    });
  });
});

// Definimos otro middleware para enviar la respuesta al cliente
app.use((req, res) => {
  if (res.locals.message !== '') {
    res.send(res.locals.message);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
}); */
// intento de combinar archivos:
/* const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const endpoint_Id = "309919882530258944";
const proyect_Id = "buoyant-road-376019";
const rutaArchivoJson = './data.json';

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/prediction', (req, res) => {
  const filePath = req.body.filePath;
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const jsonRequest = JSON.parse(jsonData);

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
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
 */
/* Para enviar una respuesta a la página localhost:3000/formulario y realizar una consulta a Google Cloud, puede hacer lo siguiente:

1 En su archivo homeController.js, actualice la función postIndex para enviar una solicitud POST a su nueva ruta /api/prediction y pasar el archivo de datos JSON:
javascript
Copy code: 

postIndex: (req, res) => {
  const { year, mileage, city, state, make_number, model_number } = req.body;
  const data = {
    year,
    mileage,
    city,
    state,
    make_number,
    model_number
  };
  const jsonData = JSON.stringify(data);

  // Guardar los datos en el archivo
  fs.writeFileSync(rutaArchivoJson, jsonData);

  // Enviar solicitud POST a la ruta /api/prediction
  axios.post('http://localhost:3000/api/prediction', { filePath: rutaArchivoJson })
    .then(response => {
      console.log(response.data);
      res.render('result', { result: response.data });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('¡Hubo un error al procesar los datos!');
    });
}
2.En su archivo app.js, agregue una nueva ruta /formulario para manejar solicitudes GET a la página del formulario y renderizar la vista del formulario:
javascript
Copy code
app.get('/formulario', (req, res) => {
  res.render('formulario', { title: 'Formulario de Predicción' });
});
3 En su archivo home.js, actualice la ruta principal '/' para manejar solicitudes GET a la página de inicio y renderizar la vista de inicio:
javascript
Copy code:
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getIndex);

module.exports = router;
4 En su archivo home.js, agregue una nueva ruta /result para manejar solicitudes GET a la página de resultados y renderizar la vista de resultados:
javascript
Copy code
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/result', homeController.getResult);

module.exports = router;
5 Cree una nueva vista result.ejs en su carpeta views para mostrar los resultados de la predicción:
php
Copy code
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <h1>Resultado de la Predicción</h1>
    <pre><%= JSON.stringify(result, null, 2) %></pre>
    <a href="/">Volver al inicio</a>
  </body>
</html>
Con estos cambios, debería poder enviar una solicitud POST a la ruta /api/prediction desde su formulario, realizar una consulta a Google Cloud y mostrar los resultados en la página de resultados. Además, puede acceder a la página del formulario en localhost:3000/formulario y a la página de inicio en localhost:3000/.

 */