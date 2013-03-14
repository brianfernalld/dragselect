/*!
* Javascript Draggable Selectable
* draggable-selectable.js
* http://brianfernalld.com
* MIT licensed
*
* Copyright (C) 2013 Brian Fernalld, http://brianfernalld.com
*/

var dragObject = {
  setDragObject : function (element, mouseX, mouseY) {
    this.element = element;
    this.relativeLeft = element.offsetLeft - mouseX;
    this.relativeTop = element.offsetTop - mouseY;
    this.element.style.zIndex = this.zIndex++;
  },
  dragTo : function (x, y) {
    this.element.style.left = x + this.relativeLeft + "px";
    this.element.style.top = y + this.relativeTop + "px";
  },
  dragging : false,
  element : null,
  relativeLeft : 0,
  relativeTop : 0,
  zIndex : 0
};

function mouseHandler(event) {
  var eventSource = eventUtility.getTarget(event),
      type = event.type,
      x = event.clientX + document.body.scrollLeft,
      y = event.clientY + document.body.scrollTop;

  switch(type) {
    case "mousedown":
      if (eventSource.className.indexOf("draggable") > -1) {
          dragObject.dragging = true;
          dragObject.setDragObject(eventSource, x, y);
      }
      break;
    case "mouseup":
      dragObject.dragging = false;
      break;
    case "mousemove":
      if (dragObject.dragging) {
        dragObject.dragTo(x,y);
      }
      break;
  }

  if(eventSource.className.indexOf("selectable") > -1) {
    switch (type){
      case "mouseover":
        if(eventSource.className.indexOf("select-click") === -1){
          eventSource.className += " select-over";
        }
        break;
      case "mouseout":
        eventSource.className = eventSource.className.replace(' select-over', '');
        break;
      case "click":
        if(eventSource.className.indexOf("select-click") === -1){
          eventSource.className += " select-click";
        } else {
          eventSource.className = eventSource.className.replace(' select-click', '');
        }
        break;
    }
  }
}

window.onload = function() {
  eventUtility.addEvent(document, "mousedown", mouseHandler);
  eventUtility.addEvent(document, "mouseup", mouseHandler);
  eventUtility.addEvent(document, "mousemove", mouseHandler);

  eventUtility.addEvent(document, "click", mouseHandler);
  eventUtility.addEvent(document, "mouseover", mouseHandler);
  eventUtility.addEvent(document, "mouseout", mouseHandler);
}