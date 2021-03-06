let itemContainers = document.getElementsByClassName("drag-item-container");
let items = document.getElementsByClassName("drag-item");


let mouseOffset = {x: 0, y: 0};

let isMouseDown = false;
let currentItem = null;
let foundDragOver = false;
let draggedOver = false;

function LightenDarkenColor(col, amt) {
  
    var usePound = false;
  
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }
 
    var num = parseInt(col,16);
 
    var r = (num >> 16) + amt;
 
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
 
    var b = ((num >> 8) & 0x00FF) + amt;
 
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
 
    var g = (num & 0x0000FF) + amt;
 
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
 
    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  
}

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

doELsCollide = function(el1, el2) {
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

    return !(
        (el1.offsetBottom < el2.offsetTop) ||
        (el1.offsetTop > el2.offsetBottom) ||
        (el1.offsetRight < el2.offsetLeft) ||
        (el1.offsetLeft > el2.offsetRight)
    );

}
overlap = function(el1, el2) {
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;
    el1.area = el1.offsetHeight * el1.offsetWidth;

    // if the bottom of el1 is spacially above the top of el2 then there is 0 overlap
    // otherwise if the top of el is also spacially below the top of el2 then el1 is inside of el2, therefore overlap is height of el1
    // otherwise the overlap is the spacial position of the top of el2 minus spacial position of the top of el1
    overlapY = (el1.offsetBottom < el2.offsetTop) ? 0 : ((el1.offsetTop > el2.offsetTop) ? el1.offsetHeight : (el1.offsetBottom - el2.offsetTop))
    // I think this would do the same thing as the above
    // (el1.offsetTop > el2.offsetBottom) ? 0 : ((el1.offsetBottom < el2.offsetBottom) ? el1.offsetHeight : el2.offsetBottom - el1.offsetTop)
    console.log(overlapY)

    overlapX = (el1.offsetRight < el2.offsetLeft) ? 0 : ((el1.offsetLeft > el2.offsetLeft) ? el1.offsetWidth: (el1.offsetRight - el2.offsetLeft))
	console.log(overlapX)

    overlapArea = overlapX*overlapY
    percentOfOverLap = overlapArea/el1.area
    return percentOfOverLap
}

//create drag locations
// for (let j = 0; j < itemContainers.length; j++) {
//     let container = itemContainers[j];
//     for (let i = 0; i < 1; i++) {
//         let dragLocation = document.createElement("div");
//         dragLocation.className = "drag-location";
//         container.appendChild(dragLocation);
        
//     }    
// }

function dropDraggable(item, container) {
    container.className = container.className.replace(" drag-item-container-over", "")
    container.appendChild(item);
    item.style.left = "";
    item.style.top = "";
    item.style.position = "relative";
    mouseOffset = {x: 0, y:0};
    currentItem = null;
}

// setInterval(() => {
//     if (currentItem != null) {
//         let dragLocations = document.getElementsByClassName("drag-location");
//         foundDragOver = false;
//         for (let i = 0; i < dragLocations.length; i++) {
//             let dragLocation = dragLocations[i];
//             dragLocation.className = dragLocation.className.replace(" drag-location-over", "")
//             if (doELsCollide(currentItem, dragLocation)) {
//                 console.log("test 1");
//                 dragLocation.className += " drag-location-over";
//                 foundDragOver = true;
//                 if (!isMouseDown) {
//                     console.log("test 2");
//                     dropDraggable(currentItem, dragLocation);
//                 }
//             }            
//         }        
//         draggedOver = foundDragOver ? true : false;
//     }
// }, 100)

// setInterval(() => {
//     if (currentItem != null) {
//         foundDragOver = false;
//         for (let i = 0; i < itemContainers.length; i++) {
//             let itemContainer = itemContainers[i];
//             itemContainer.className = itemContainer.className.replace(" drag-item-Container-over", "")
//             if (doELsCollide(currentItem, itemContainer)) {
//                 itemContainers.className += " drag-item-container-over";
//                 foundDragOver = true;
//                 if (!isMouseDown) {
//                     console.log("test 2");
//                     dropDraggable(currentItem, itemContainer);
//                     break;
//                 }
//             }            
//         }        
//         draggedOver = foundDragOver ? true : false;
//     }
// }, 100)

function testListener(e) {
    console.log("testing listener");
}

function getContentWidth (element) {
    var styles = getComputedStyle(element)
  
    return element.getBoundingClientRect().width
      - parseFloat(styles.paddingLeft)
      - parseFloat(styles.paddingRight)+"px"
  }

function onMouseMove(e) {
    e.preventDefault();
    if (isMouseDown) {
        requestAnimationFrame(() => {
            
            //check what is being dragged over
            foundDragOver = false;
            for (let i = 0; i < itemContainers.length; i++) {
                let itemContainer = itemContainers[i];
                itemContainer.className = itemContainer.className.replace(" drag-item-Container-over", "")
                if (doELsCollide(currentItem, itemContainer)) {
                    itemContainers.className += " drag-item-container-over";
                    foundDragOver = true;
                    if (!isMouseDown) {
                        console.log("test 2");
                        dropDraggable(currentItem, itemContainer);
                        break;
                    }
                }            
            }        
            draggedOver = foundDragOver

            //update draggable item
            currentItem.style.left = e.clientX + mouseOffset.x +"px";
            currentItem.style.top = e.clientY + mouseOffset.y + "px"; 
        })
    }
}

function onMouseDown(e) {
    item = e.target;
    isMouseDown = true;
    currentItem = item;
    mouseOffset = {x: item.offsetLeft - e.clientX, y: item.offsetTop - document.querySelector("#Q1 .sortingSection").scrollTop - e.clientY}
    console.log(getComputedStyle(item).backgroundColor);
    console.log(LightenDarkenColor("#"+getComputedStyle(item).backgroundColor, -16));
    item.style.backgroundColor = LightenDarkenColor("#"+getComputedStyle(item).backgroundColor, -16);

    item.style.width = getContentWidth(item);
    item.style.position = "absolute";
    item.zIndex ="100000";
    

    //Add a an event listener to the bounding container when the user clicks an element.
    //All movement while saving processing power and solves a glitch.
    ancestor = findAncestor(item, "classes");
    ancestor.addEventListener("mousemove", onMouseMove);
    // console.log(ancestor);
}

function onMouseUp(e, item) {
    item = e.target;
    console.log("test 3");
    console.log(draggedOver);
    if (draggedOver == false) {
        
        console.log("test 4");
        item.style.left = "";
        item.style.top = "";
        item.style.position = "relative";
        mouseOffset = {x: 0, y:0};
    }

    isMouseDown = false;
    item.style.backgroundColor = "#FFFFFF";
    item.style.width = "";
    item.zIndex ="10";

    
    //Add a an event listener to the bounding container when the user clicks an element.
    //All movement while saving processing power and solves a glitch.
    ancestor = findAncestor(item, "classes");
    // console.log(ancestor);
    ancestor.removeEventListener("mousemove", onMouseMove);
}

for (let i = 0; i < items.length; i++) {
    let item  = items[i];
    
    item.addEventListener("mousedown", onMouseDown);

    item.addEventListener("mouseup", onMouseUp);

    
}

for (let i = 0; i < itemContainers; i ++) {
    console.log(container);
    let container = itemContainers[i];
    container.addEventListener("mouseup", testListener);
}

