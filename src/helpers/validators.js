const isPositiveInteger = (n) => {
    return n > 0 && Number.isInteger(+n);
};

const arePositiveIntegers = (...args) => {
    return args.every((arg) => isPositiveInteger(arg));
};

module.exports = {
    isPositiveInteger,
    arePositiveIntegers,
};
