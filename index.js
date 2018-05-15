const MongoClient = require('mongodb').MongoClient
    ObjectID = require('mongodb').ObjectID,
    express = require('express'),
    engines = require('consolidate');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static('public'));

// Conectarse a Base de Datos
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;

    db = client.db('test');

    // Iniciar servidor
    app.listen(1234);
});



app.get('/store', (req, res) => {

    var prod = db.collection('productos')
        .find();
    
    if(req.query.color)
        prod.filter({ 
            color: req.query.color 
        });

    if(req.query.precio)
        prod.filter({ 
            color: req.query.precio 
        });
    if(req.query.descripcion)
        prod.filter({ 
            color: req.query.descripcion 
        });
    if(req.query.nombre)
        prod.filter({ 
            color: req.query.nombre 
        });

    if(req.query.marca)
        prod.filter({ 
            modelo: req.query.marca 
        });

    prod.toArray((err, result) => {
            console.log('hola servidor')
            res.render('index', {
                productos: result
            });
        });
});
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/checkout', (req, res) => {
    res.render('checkout');
});

app.get('/producto/:id', (req, res) => {
    db.collection('productos').find({ modelo: req.params.id }).toArray((err, result) => res.send(result))
});

app.get('/productosPorIds', (req, res) => {
    console.log(req.query.ids);
    var arreglo = req.query.ids.split(',');
    arreglo = arreglo.map(function(id) {
        return new ObjectID(id);
    });
    var prod = db.collection('productos')
        .find({ _id: { $in: arreglo } })
        .toArray((err, result) => {
            res.send(result);
        });
});

