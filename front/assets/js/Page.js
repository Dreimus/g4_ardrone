function Page() {
  var self = this;
  this.pageObject = {title: undefined, nodes: [], partials: []};
  this.pageLogic = undefined;
}

// Set Title
Page.prototype.setTitle = function(title) {
  this.pageObject['title'] = title;
  return this;
}

// Get Title
Page.prototype.getTitle = function(title) {
  return this.pageObject['title'];
}

// Add a new Node
Page.prototype.addNode = function(nodeName) {
  this.pageObject['nodes'].push(nodeName);
  return this;
}

// // Remove a existing node
// Page.prototype.removeNode = function(nodeName) {
//   if (this.pageObject['nodes'].indexOf(nodeName) !== undefined && this.pageObject['nodes'].indexOf(nodeName) !== null)
//     this.pageObject['nodes'].splice(this.pageObject['nodes'].indexOf(nodeName), 1);
//   else
//     console.log("Unknow node : " + nodeName);
//   return this;
// }

Page.prototype.generateNodes = function(parent) {
  this.pageObject['nodes'].forEach(function(value, key){
    createNodeArea(parent, value);
  });
}

Page.prototype.addPartial = function(partialName) {
  this.pageObject['partials'].push(partialName);
  return this;
}

Page.prototype.removePartial = function(partialName) {
  this.pageObject['partials'].splice(  this.pageObject['partials'].indexOf(partialName), 1);
  return this;
}

Page.prototype.load = function() {
  this.pageObject['partials'].forEach(function(value, key){
    getPartial(value);
  });
}

Page.prototype.executeLogic = function() {
  this.pageLogic();
}