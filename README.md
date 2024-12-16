# Joyeria

A simple back-end application that returns data following REST API and HATEOAS guidelines. It supports basic CRUD operations on a PostgreSQL database using the pg module and provides API routes for client interactions via the Express.js framework.

## Installing

In order to get the app running, a postgresql database must be created using the following commands:

```sql
CREATE DATABASE joyas;
\c joyas;

CREATE TABLE inventario (id SERIAL, nombre VARCHAR(50), categoria
VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);

INSERT INTO inventario values
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);
);
```

The app also needs a .env file in the root folder with the appropiate variables:

```txt
PORT=[your port]
PGUSER=[your user]
PGPASSWORD=[your password]
PGHOST=localhost
PGPORT=5432
PGDATABASE=joyas
```

Finally, run the `npm install` command to install the required node modules.

## Running

To start the server, run either:

- `npm run dev` uses nodemon
- `npm start` uses node

## Usage

The following API Routes are available:

`GET /joyas`

`GET /joyas/filters`