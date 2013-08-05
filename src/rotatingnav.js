var activeHead = 0;
var activeTail = 3;
var panelHead = 0;
var panelTail = 7;

function shiftForward() {
    // Press right arrow
    console.log("Shifting forward");
    activeHead++;
    activeTail++;
  if (activeTail > panelTail) {
    activeTail = panelHead;
  }
  if (activeHead > panelTail) {
    activeHead = panelHead;
  }
  updateActive();
}

function shiftBackward() {
    // Press left arrow
    console.log("Shifting backward");
    activeHead--;
    activeTail--;
  if (activeHead < panelHead) {
    activeHead = panelTail;
  }
  
  if (activeTail < panelHead) {
    activeTail = panelTail;
  }
  updateActive();
}

function isActive(index) {
  if (activeHead < activeTail && 
      activeHead <= index && 
      index <= activeTail) {
    return true;
  } else if (activeHead > activeTail && 
             !(activeTail < index && 
               index < activeHead)) {
    return true;
  } else {
    return false;
  }
}

function updateActive() {
  console.log("activeHead " + activeHead + ", activeTail " + activeTail);
  $('.item').removeClass('pull-left');
  $('.item').removeClass('active');
  $('.item').each(function(index){
    if (isActive(index)) {
      $(this).addClass('active');
      $(this).show();
      if (index > activeTail) {
        $(this).addClass('pull-left');
      }
    } else {
      $(this).hide();
    }
  });
}

$(function() {
  updateActive();
  $('.left.rotatingnav-control').click(shiftForward);
  $('.right.rotatingnav-control').click(shiftForward);
  $('body').keypress(function (event) {
    if (event.which == 102) { // f - forward
      shiftForward();
    } else if (event.which == 98) { // b - backward
      shiftBackward();   
    }
  });
});