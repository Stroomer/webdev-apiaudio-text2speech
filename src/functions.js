
function filterObjectsArray(array, prop, value) {
    return array.filter((obj) => { return obj[prop] === value });
}

function getArrayFromObjectsArray(array, prop) {
    return array.map((obj) => obj[prop]);
}

function removeDuplicates(array) {
    return [...new Set(array)];
}

function removeRedundant(data, redundants) {
    let array = data['voices'].slice(0);
    let i = array.length;
    while (i--) {
        const item = array[i];
        let r = redundants.length;
        while (r--) {
            const redundant = redundants[r];
            if (item.hasOwnProperty(redundant)) {
                delete item[redundant];
            }
        }
    }
    return array;
}

function capitalize(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1, str.length).toLowerCase();
}

function getComboValues(combos, defaults) {
    let i, id, cb, val, res = [];
    const count = combos.length;
    for (let i = 0; i < count; i++) {
        id = combos[i];
        cb = document.getElementById(id);
        val = id !== 'textarea' ? cb.value : cb.value.trim();
        val = val !== '' ? val : defaults[i];
        res.push(val);
    }
    return res;
}

export { removeDuplicates, removeRedundant, filterObjectsArray, getArrayFromObjectsArray, capitalize, getComboValues };