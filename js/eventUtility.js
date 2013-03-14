/*!
* Javascript Draggable Selectable
* eventUtility.js
* http://brianfernalld.com
* MIT licensed
*
* Copyright (C) 2013 Brian Fernalld, http://brianfernalld.com
*/

var eventUtility = {
  addEvent : (function() {
    if(typeof addEventListener !== "undefined") {
      return function(object, event, func) {
        object.addEventListener(event, func, false);
      };
    } else {
      return function(object, event, func) {
        object.attachEvent("on" + event, func);
      };
    }
  })(),
  getTarget : (function() {
    if(typeof addEventListener !== "undefined") {
      return function(event) {
        return event.target;
      };
    } else {
      return function(event) {
        return event.srcElement;
      };
    }
  })(),
  preventDefault : (function(){
    if(typeof addEventListener !== "undefined") {
      return function(event) {
        event.preventDefault();
      };
    } else {
      return function(event) {
        event.returnValue = false;
      };
    }
  })()
};