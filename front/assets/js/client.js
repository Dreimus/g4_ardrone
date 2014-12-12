var server = "localhost",
  port = 13000,
  socket = io.connect( server + ':' + port),
  partial = {},
  createPlan = new Page()
    .setTitle("Création de parcours")
    .addNode("plan")
    .addNode("actions")
    .addPartial("tableStructure")
    .addPartial("lineToRepeat"),
  flyWatcher = new Page()
    .setTitle("Suivi de vol")
    .addPartial("flyWatcher"),
  pages = {createPlan: createPlan, flyWatcher: flyWatcher}
  ;


function testClick() {
  var node = createNodeArea(window.app, "createPlanForm");
  addPartial(node, "createPlanForm");
}

function changePage(e, pageName) {
  
  if (e !== undefined && e !== null){
    e.preventDefault();
    e.stopPropagation();
  }


  cleanNode(pageContent);
  
  var page = pages[pageName];
  
  if (page !== undefined) {
    page.load();
    document.title = page.getTitle();
    document.querySelector("#pageTitle").innerHTML = page.getTitle();
    
    menuNode.querySelector(".active").classList.remove("active");
    menuNode.querySelector("#" + pageName).classList.add("active");
    
    page.generateNodes(pageContent);
    
    if (pageName === "createPlan") {
      page.pageLogic = createPlanPageLogic;
    } else if (pageName === "flyWatcher") {
      page.pageLogic = createFlyWatcherLogic;
    }
    
    page.executeLogic();
    
  } else {
    pageContent.innerHTML = "<center><h1> 404 : Not Found </h1></center>";
  }
  
}


// Gestion de la logic de la page CreatePlan
function createPlanPageLogic (){
  var action = pageContent.querySelector("#actions"),
    partialDOM = document.createElement("div"),
    tableStructure,
    lineToRepeat;
  
  partialDOM.innerHTML = getPartial("tableStructure");
  tableStructure = partialDOM.innerHTML;
  
  lineToRepeat = getPartial("lineToRepeat");
  
  console.log(getPartial("tableStructure"));
  
  action.innerHTML = tableStructure;
  action.querySelector("#submitFormPlan").onclick = function(e) {sendPlan(e);};
  
  var tdbody = action.querySelector("#forRepeat");
  tdbody.innerHTML += lineToRepeat;
}

// Handle the logic of flyWatcher
function createFlyWatcherLogic(){
  pageContent.innerHTML = getPartial("flyWatcher");
  
}

// Add a new line in createPlanForm
function addNewLine(obj){
  app.querySelector("#forRepeat").innerHTML += getPartial("lineToRepeat");
}

// Remove the line (match via "this")
function removeParentTR(obj) {
  var currentParent = obj.parentNode;

  while (currentParent.tagName !== "TR") {
    currentParent = currentParent.parentNode;
  }
  
  currentParent.remove();
}

function sendPlan(e){
  e.preventDefault();
  e.stopPropagation();

  var dataForm = $("#formPlan").serializeArray(),
    dataJson = {title: dataForm[0].value, data: []};
  
  for (var i = 1; i < dataForm.length; i++) {
    dataJson.data.push(dataForm[i]);
  }
  
  socket.emit("createPlan", dataJson);
  
}

function droneStart(){
  socket.emit("droneStart");
}

function droneStop(){
  socket.emit("droneStop");
}

function droneStopEmergency(){
  socket.emit("droneStopEmergency");
}

window.onload = function () {
  
  window.app = document.querySelector("#app");
  var req2 = new XMLHttpRequest(); 
  
  // Load directly the menu as it's a constant partial/node of the pages 
  window.menuNode = createNodeArea(window.app, "menuNode");
  addPartial(menuNode, "menu");
  
  window.title = createNodeArea(window.app, "title");
  addPartial(title, "title");
  
  window.pageContent = createNodeArea(window.app, "pageContent");
  
  // Register event click for menu navigation 
  menuNode.querySelector("#flyWatcher").onclick = function(e) {changePage(e, "flyWatcher");};
  menuNode.querySelector("#createPlan").onclick = function(e) {changePage(e, "createPlan");};
  menuNode.querySelector("#planList").onclick = function(e) {changePage(e, "planList");};
  menuNode.querySelector("#history").onclick = function(e) {changePage(e, "history");};
  menuNode.querySelector("#about").onclick = function(e) {changePage(e, "about");};
  
  // Set index page content to flyWatcher
  changePage(null, "flyWatcher");
  
  // req2.open('GET', 'http://localhost:13000/menu', false);
  // req2.onreadystatechange = function (aEvt) {
  //   if (req2.readyState == 4) {
  //      if(req2.status == 200)
  //        app.innerHTML = req2.responseText;
  //      else
  //       console.log("Erreur pendant le chargementde la page.\n");
  //   }
  // };
  //
  // req2.send(null);
   
}
