const express = require('express')
const bodyParser = require('body-parser');
const http = require('http')
const app = express()

const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000

var users = [
    {id: 0, name: 'oscar'},
    {id: 1, name: 'juan'},
    {id: 2, name: 'diana'}
];

// soporte para body codificados en jsonsupport
app.use(bodyParser.json());
// soporte para body codificados
app.use(bodyParser.urlencoded({ extended: true }));
 
app.get('/', (req, res) => {
  res.status(200).send("Welcome to API REST")
})

// ******************************************************************

// Listar usuarios
app.get('/productos', (req, res) => {
    let pos = 0;
    users.forEach(function(entry) {
        entry.id = pos;
        pos++;
    });
    res.send(users)
})

// Crear usuarios
app.post('/productos', (req, res) => {
    let data = req.body;
    let consecutive = users.length;
    let itemUser = {id: consecutive, name: data.Name};
    users.push(itemUser)
    res.send("New user add")
})

// Actualizar usuarios
app.put('/productos/:id',(req, res) => {
    let params = req.params;
    let data = req.body;
    users[params.id]['name'] = data.Name;
    res.send("User update")
})

// Eliminar usuarios
app.delete('/prodoctos/:id',(req, res) => {
    let params = req.params;
    users.splice(params.id, 1);
    res.send('User delete')
})

// ******************************************************************
 
http.createServer(app).listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
})