const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const path = require("path");
const methodOverride = require('method-override')
const app = express();
const port = 4000;

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require("./route");
const db = require('./confic/db')

//DB Connect
db.connect()

app.use(methodOverride('_method'))

app.use(SortMiddleware)

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({
        extended: true,
    })
);

// HTTP logger
app.use(morgan("combined"));
// Template engine
app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.name ? sort.type : 'default'
                const icons = {
                    default: 'fa-solid fa-sort',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                }
                const types ={
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                }
                const icon = icons[sortType]
                const type = types[sortType]
                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a> `
            }
        },
    })
);
app.set("views", path.join(__dirname, "resources", "views"));
app.set("view engine", "hbs");

app.use(express.json());

route(app);

app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}`)
);
