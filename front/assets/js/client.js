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
  e.preventDefault();
  e.stopPropagation();
  cleanNode(pageContent);
  
  var page = pages[pageName];
  
  if (page !== undefined) {
    page.load();
    document.title = page.getTitle();
    menuNode.querySelector(".active").classList.remove("active");
    menuNode.querySelector("#" + pageName).classList.add("active");
    
    page.generateNodes(pageContent);
    page.pageLogic = createPlanPageLogic;
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
  partialDOM.innerHTML = getPartial("lineToRepeat");
  lineToRepeat = partialDOM.innerHTML;
  
  console.log(getPartial("tableStructure"));
  
  action.innerHTML = tableStructure;
  // action.innerHTML += lineToRepeat;

}

window.onload = function () {
  
  window.app = document.querySelector("#app");
  var req2 = new XMLHttpRequest(); 
  
  // Load directly the menu as it's a constant partial/node of the pages 
  window.menuNode = createNodeArea(window.app, "menuNode");
  addPartial(menuNode, "menu");
  window.pageContent = createNodeArea(window.app, "pageContent");
  
  // Register event click for menu navigation 
  menuNode.querySelector("#flyWatcher").onclick = function(e) {changePage(e, "flyWatcher");};
  menuNode.querySelector("#createPlan").onclick = function(e) {changePage(e, "createPlan");};
  menuNode.querySelector("#planList").onclick = function(e) {changePage(e, "planList");};
  menuNode.querySelector("#history").onclick = function(e) {changePage(e, "history");};
  menuNode.querySelector("#about").onclick = function(e) {changePage(e, "about");};

  
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
