const path = require('path');
const express = require('express');
// const morgan = require("morgan");
const { engine } = require('express-handlebars');
const app = express();
const methodOverride = require('method-override');

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes');
const db = require('./config/db');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
// !handle data from form
app.use(express.urlencoded({ extended: true }));
// !sử dụng các thư viện để submit form thì dùng thêm express.json
// XMLHttpRequest, fetch, axios....
app.use(express.json());

// *Use Middleware for the whole page
// *Custom middlewares
app.use(SortMiddleware)

const port = 3000;
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum(a, b) {
        return a + b;
      },
      sortAble(field, sort) {
        const sortType = field === sort.column ? sort.type : 'default'

        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        }
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        }
        const type = types[sortType]
        const icon = icons[sortType]

        return `<a href="?_sort&column=${field}&type=${type}">
            <span class="${icon}"></span>
          </a>`
      }
    },
  })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

// *Routes init
route(app);

// *Connect to DB
db.connect();

app.listen(port, console.log(`App running on http://localhost:${port}`));
