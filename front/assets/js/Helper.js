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

//-------------------------------------------------------//
//                     END HELPERS                       //
//-------------------------------------------------------//