const errorMiddleware = (err, req, res, next) => {
    const errorMap = {
        INVALID_FIELD: { status: 400, message: 'Campo invalido' },
        INVALID_DIRECTION: { status: 400, message: 'Dirección inválida' },
        NOT_POSITIVE_INT: {
            status: 400,
            message: 'limits, page deben ser enteros positivos',
        },
        MINMAX_NOT_POSITVE: {
            status: 400,
            message: 'min, max deben ser enteros positivos',
        },
    };

    if (err.name === 'Error') {
        const thisError = errorMap[err.message];
        return res
            .status(thisError.status)
            .json({ message: thisError.message });
    } else {
        return res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

module.exports = errorMiddleware;
