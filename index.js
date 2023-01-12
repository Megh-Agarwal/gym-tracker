const port = process.env.PORT || 2000;

const path = require('path');
const express = require('express');
const handlebars = require('hbs');

handlebars.registerHelper({
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
});

const app = express();

app.use(express.json())

const publicDirectory = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views/');
const partialsPath = path.join(__dirname, './templates/partials');

app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs');
app.set('views', viewsPath)

handlebars.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.use(function(req, res, next) {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    return next();
});

app.get('/', (req, res, next) => {
    return res.render('index');
})

app.listen(port, () => {
    console.log("Server running on port " + port);
})

