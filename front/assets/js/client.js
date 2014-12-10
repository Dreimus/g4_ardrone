window.onload = function () {
  
  var server = "localhost",
    port = 13000,
    socket = io.connect( server + ':' + port),
    req = new XMLHttpRequest(),
    app = document.querySelector("#app");
    
    req.open('GET', 'http://localhost:13000/view/partials/createPlanForm', false);
    req.onreadystatechange = function (aEvt) {
      if (req.readyState == 4) {
         if(req.status == 200)
           app.innerHTML = req.responseText;
         else
          console.log("Erreur pendant le chargement de la page.\n");
      }
    };
    req.send(null);
   
}