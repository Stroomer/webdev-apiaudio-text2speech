function removeDuplicates(array, prop) {
    return array.filter((element, index, array) => array.findIndex(item => (item[prop] === element[prop])) === index);
}

function requireExistence(array, prop, value) {
    return array.filter(item => item[prop] === value);
}

function capitalize(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1, str.length).toLowerCase();
}

export { removeDuplicates, requireExistence, capitalize };