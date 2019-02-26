// Filter: provide a list of other filters. returns true if all of them return true.

module.exports = (listOfOtherFilters) => {
    let final = async (message) => {
        let filters = listOfOtherFilters.map( (fn) => fn(message) );
        let filterResults = await Promise.all(filters);
        return filterResults.every( (x) => x );
    }
    return final;
}