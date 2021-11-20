// function filterObjectsArray(array, prop, value) {
//     return array.filter((element, index, array) => array.findIndex(item => (item[prop] === value)) === index);
// }

function filterObjectsArray(array, prop, value) {
    return array.filter((obj) => { return obj[prop] === value });
}

function getArrayFromObjectsArray(array, prop) {
    return array.map((obj) => obj[prop]);
}

// function requiredItem(array, key, value, retrieve) {
//     let result = array.filter((item) => { return item[key] === value });
//     result = result.map((element) => element[retrieve]);
//     result = removeDuplicates(result);
//     return result;
// }

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

export { removeDuplicates, removeRedundant, filterObjectsArray, getArrayFromObjectsArray, capitalize };