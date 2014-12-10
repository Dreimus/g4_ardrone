var server = "localhost",
  port = 13000,
  socket = io.connect( server + ':' + port),
  partial = {};


function testClick() {
  var node = createNodeArea(window.app, "createPlanForm");
  addPartial(node, "createPlanForm");
}

function addPartial(parent, name) {
  parent.innerHTML += getPartial(name);
}

function createNodeArea(parent, name) {
  
  if (document.querySelector('#' + name) !== undefined) {
    document.querySelector('#' + name).remove();
  }

  parent.innerHTML += '<div id="' + name + '"></div>';
  return parent.querySelector("#" + name);
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

window.onload = function () {
  
  window.app = document.querySelector("#app");
  var req2 = new XMLHttpRequest();
  
  
  
  req2.open('GET', 'http://localhost:13000/partials/createPlanForm', false);
  req2.onreadystatechange = function (aEvt) {
    if (req2.readyState == 4) {
       if(req2.status == 200)
         app.innerHTML = req2.responseText;
       else
        console.log("Erreur pendant le chargementde la page.\n");
    }
  };
  
  req2.send(null);
   
}