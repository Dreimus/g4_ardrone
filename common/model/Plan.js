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

Plan.prototype.editAction = function(rank, action){
  this.actionList[rank] = action;
};

Plan.prototype.addAction = function(action){
  this.actionList.push(action);
};

Plan.prototype.getFlyActionList = function () {
  return this.actionList;
}

Plan.prototype.getList = function () {
  var bou = db("test").find({type: ETypeAction_file.ETypeAction.Move}).value().direction
    
  if (bou === EDirection_file.EDirection.Forward)  
    console.log("true");
  else
    console.log("false");
    
};

Plan.prototype.savePlan = function () {
  //var test = new DroneAction(ETypeAction_file.ETypeAction.Move, EDirection_file.EDirection.Forward, 10);
  //db("test").push(test);
  //var v =  self.low.stringify(test);
  
  if (db("Plans").find({name : this.name}).value() === undefined) {
    db("Plans").push(this);
  } else {
    db('Plans').find({ name: this.name }).assign({ name: this.name, actionList: this.actionList});
  }
  
};

module.exports = Plan;