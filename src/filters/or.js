// Filter: provide a list of other filters. returns true if any of them return true.

function firstTrue(promises) {
    const newPromises = promises.map(p => new Promise(
        (resolve, reject) => p.then(v => v && resolve(true), reject)
    ));
    newPromises.push(Promise.all(promises).then(() => false));
    return Promise.race(newPromises);
}

module.exports = (listOfOtherFilters) => {
    let final = async (message) => {
        let filters = listOfOtherFilters.map( (fn) => fn(message) );
        return firstTrue(filters);
    }
    return final;
}