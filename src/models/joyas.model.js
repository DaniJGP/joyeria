const format = require('pg-format');
const pool = require('../config/db');
const {
    arePositiveIntegers,
    isPositiveInteger,
} = require('../helpers/validators');

const ALLOWED_FIELDS = [
    'id',
    'nombre',
    'categoria',
    'metal',
    'precio',
    'stock',
];
const ALLOWED_DIRECTIONS = ['ASC', 'DESC'];

const createHATEOAS = (joyas) => {
    const totalJoyas = joyas.length;
    let stockTotal = 0;
    const results = joyas.map((j) => {
        stockTotal += j.stock
        return {
            nombre: j.nombre,
            url: `/joyas/joya/${j.id}`,
        };
    });

    return {
        totalJoyas,
        stockTotal,
        results,
    };
};

const getAll = async ({ limits = 10, page = 1, order_by = 'id_ASC' }) => {
    let [campo, direccion] = order_by.split('_');

    // Validación de los campos
    if (!ALLOWED_FIELDS.includes(campo)) {
        throw new Error('INVALID_FIELD');
    }
    if (!ALLOWED_DIRECTIONS.includes(direccion.toUpperCase())) {
        throw new Error('INVALID_DIRECTION');
    }
    if (!arePositiveIntegers(limits, page)) {
        throw new Error('NOT_POSITIVE_INT');
    }

    // Consulta SQL
    const offset = (page - 1) * limits;
    const consulta = format(
        'SELECT * FROM inventario ORDER BY %I %s OFFSET %s LIMIT %s',
        campo,
        direccion,
        offset,
        limits
    );
    const { rows: joyas } = await pool.query(consulta);
    const HATEOAS = createHATEOAS(joyas);
    return HATEOAS;
};

const getFilters = async ({ precio_max, precio_min, categoria, metal }) => {
    let consulta = 'SELECT * FROM inventario';
    let valores = [];
    let filtros = [];

    const agregarFiltro = (campo, operador, filtro) => {
        valores.push(filtro);
        filtros.push(`${campo} ${operador} $${valores.length}`);
    };

    if (precio_max) {
        if (!isPositiveInteger(precio_max)) {
            throw new Error('MINMAX_NOT_POSITVE');
        }
        agregarFiltro('precio', '<=', precio_max);
    }

    if (precio_min) {
        if (!isPositiveInteger(precio_min)) {
            throw new Error('MINMAX_NOT_POSITVE');
        }
        agregarFiltro('precio', '>=', precio_min);
    }

    if (categoria) {
        agregarFiltro('categoria', '=', categoria);
    }

    if (metal) {
        agregarFiltro('metal', '=', metal);
    }

    if (filtros.length > 0) {
        consulta += ` WHERE ${filtros.join(' AND ')}`;
        const { rows: joyas } = await pool.query(consulta, valores);
        return joyas;
    } else {
        const { rows: joyas } = await pool.query(consulta);
        return joyas;
    }
};

module.exports = { getAll, getFilters };
