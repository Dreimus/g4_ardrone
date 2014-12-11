//-------------------------------------------------------//
//                        HELPERS                        //
//-------------------------------------------------------//
function cleanAndRemoveNode(node) {
  cleanNode (node);
  node.parentNode.remove(node);
}

function cleanNode(node) {
  if (node)
    {
      while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }
    }
}

function addPartial(parent, name) {
  parent.innerHTML += getPartial(name);
}

function createNodeArea(parent, name) {
  if (document.querySelector('#' + name) !== undefined && document.querySelector('#' + name) !== null) {
    document.querySelector('#' + name).remove();
  }
  
  parent.innerHTML += '<div id="' + name + '"></div>';
  return document.querySelector("#" + name);
}

// Return a partial data
// If not in memory get from server
// Else return it from memory
function getPartial(name) {
  if (partial[name] === undefined)
  {
    partial[name] = getRessource(name);
  }
  return partial[name];
}

// Return partial value from get request
function getRessource(name) {
  var req = new XMLHttpRequest();
  req.open('GET', 'http://localhost:13000/partials/' + name, false);
  req.send(null);
  return req.responseText;
}

//-------------------------------------------------------//
//                     END HELPERS                       //
//-------------------------------------------------------//