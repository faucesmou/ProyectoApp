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

app.use('/', homeRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


