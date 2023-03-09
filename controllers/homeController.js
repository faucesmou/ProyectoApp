//EMPIEZA EL CÓDIGO ORIGINAL
/*const fs = require('fs');

module.exports = {
  getIndex : (req, res) => {
    console.log("entrando en home");
    res.render('index', { title: 'Predicción CreaTech' });
  },
  postIndex : (req, res) => {
   res.send(req.body); 
    const { year, mileage, city, state, make_number, model_number } = req.body;
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
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al guardar los datos');
      return;
    }

    código comentado temporalmente: fs.writeFileSync('data.json', JSON.stringify(data)); */ /*código comentado temporalmente me sugirió sacar esta parte (err) => {
      if (err) throw err; 
      console.log('Data written to file');
  código comentado temporalmente  }); 
    res.redirect('/'); 
  }  
};*/
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


//CÓDIGO DE PRUEBA N°50
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
