/*
  @constructor
*/
function DroneAction(type, direction, value) {
  var self = this;
  
  if (ETypeAction_file.ETypeAction.get(type) !== undefined) {
    self.type = type;
  } else {
    throw "Unknow movement type";
  }
  
  if (EDirection_file.EDirection.get(direction) !== undefined) {
    self.direction = direction;
  } else {
    throw "Unknow direction";
  }
  
  if (value !== undefined) {
    self.value = value;
  } else {
    throw "Value cannot be undefined";
  }
}

module.exports = DroneAction;