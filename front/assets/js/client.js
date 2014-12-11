var server = "localhost",
  port = 13000,
  socket = io.connect( server + ':' + port),
  partial = {},
  createPlan = new Page()
    .setTitle("Création de parcours")
    .addNode("plan")
    .addNode("actions")
    .addPartial("createPlanForm"),
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
  console.log("event");
  e.preventDefault();
  e.stopPropagation();
//  cleanNode(pageBody);
  
  var page = pages[pageName];
  
  if (page !== undefined) {
    page.load();
    document.title = page.getTitle();
    menuNode.querySelector(".active").classList.remove("active");
    menuNode.querySelector("#" + pageName).classList.add("active");
    
  //  page.generateNodes(pageBody);
    
  } else {
    //pageBody.innerHTML += "404 : Not Found";
    console.log("coucou");
  }
  
}

window.onload = function () {
  
  window.app = document.querySelector("#app");
  var req2 = new XMLHttpRequest(); 
  
  // Load directly the menu as it's a constant partial/node of the pages 
  window.menuNode = createNodeArea(window.app, "menuNode");
  addPartial(menuNode, "menu");
  
  
  //window.pageContent = createNodeArea(window.app, "pageContent");
  // Register event click for menu navigation
  console.log(menuNode.querySelector("#flyWatcher"));
  
  menuNode.querySelector("#flyWatcher").addEventListener("click", function () {console.log("evnetListener")}, false);
  
  menuNode.querySelector("#flyWatcher").onclick = function(e) {console.log("truc"); changePage(e, "flyWatcher");};
  menuNode.querySelector("#createPlan").onclick = function(e) {console.log("truc"); changePage(e, "createPlan");};
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