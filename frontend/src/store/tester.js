const state = [{name:'foo'},{name:'bar'},{name:'baz'}]
const sortByKey = key => (a, b) => a[key] > b[key]
const sorted = state.slice().sort(sortByKey('name'))
console.log(`state=${JSON.stringify(state)}\nsorted=${JSON.stringify(sorted)}`)