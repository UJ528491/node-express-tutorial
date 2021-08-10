import lodash from "lodash";

const item = [1, [2, [3, [4]]]];
const newItems = lodash.flattenDeep(item);
console.log(newItems);
