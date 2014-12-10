function Page() {
  var self = this;
  this.pageObject = {title: undefined, nodes: []};
}

Page.prototype.setTitle = function(title) {
  this.pageObject['title'] = title;
}

Page.prototype.addNode = function(nodeName) {
  this.pageObject['nodes'].push(nodeName);
}