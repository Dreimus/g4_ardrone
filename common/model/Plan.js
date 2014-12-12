var DroneAction = require('./DroneAction');

/*
  @constructor
*/
function Plan(name, actionList) {
  var self = this;
  
  if (name != undefined) {
    var dbValue = db("Plans").find({name : name}).value();
    if (dbValue === undefined) {
      this.name = name;
      
      if (actionList === undefined) {
        this.actionList = new Array();
      } else {
        this.actionList = actionList; 
      }
      
    } else {
      this.name = dbValue.name;
      this.actionList = dbValue.actionList;
    }
  } else {
    throw "Name cannot be undefined";
  }

}

Plan.getListName = function(name){
  console.log(db("Plans").pluck("name").value());
  return db("Plans").pluck("name").value();
};

// Helper to test if a plan already exist
Plan.exist = function(name){
  return !(db("Plans").find({name: name}).value() === undefined);
};

// Remove an action from the list identified by rank
Plan.prototype.removeAction = function(rank){
  this.actionList.splice(rank, 1);
};

// Update an action from the list identified by rank
Plan.prototype.editAction = function(rank, action){
  this.actionList[rank] = action;
};

// Add an action at the end of the list
Plan.prototype.addAction = function(action){
  this.actionList.push(action);
};

// Return this ActionList of this Instance
Plan.prototype.getFlyActionList = function () {
  return this.actionList;
};

// Save the currentInstance into the database
Plan.prototype.savePlan = function () {
  // If not in database, create a new record
  if (db("Plans").find({name : this.name}).value() === undefined) {
    db("Plans").push(this);
  } else { // Else update existing record
    db('Plans').find({ name: this.name }).assign({actionList: this.actionList});
  }
  
};

module.exports = Plan;