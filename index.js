const inputData = require('./input/nodes.json')

const mapId = inputData.reduce((initialAcc, currentEl, index) => {
  //mapping array to have a position ID for each
  initialAcc[currentEl.nodeId] = index;
  //console.log('sd', currentEl.nodeId, 'one', initialAcc[currentEl.nodeId])
return initialAcc;
}, {});

//elements with children key
let elementsWithChildren = []
inputData.forEach(el => {
el['children'] = []
elementsWithChildren.push(el)
})

//create and empty array
let rootNode = []
inputData.forEach(el => {
// handling the rootNode element
if (el.parentId === null) {
  //push each to the empty array
  rootNode.push(el)
  return;
}
//Previous mapping is being used to find our parent element in array data
const parentElement = elementsWithChildren[mapId[el.parentId]];
//Finally adding the current element to the parents child array
parentElement.children = [...(parentElement.children || []), el];
});

//logging the result
console.log(rootNode);
