////////////////////////////////////////////////////
// TO-DO LIST
////////////////////////////////////////////////////
// global vars
var close = document.getElementsByClassName("close");
var i;

// Add checkbox when item clicked
$('ul').on('click', 'li', function(e) {
  $(this).toggleClass('checked')
});

// Create new item in list
function newElement() {
  var li = document.createElement("li");
  var inputValue = $("#todo-input").val();
  var t = document.createTextNode(inputValue);
  $(li).append(t);
  if (inputValue === '') {
    $("#div1").fadeIn(300).delay(2000).fadeOut(300);
  } else {
    $("#list-items").append(li);
  }
  $("#todo-input").val('');

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

// To-do Form Submit
$(".todo-enter").submit(function(e) {
  console.log('before');
    e.preventDefault();
    console.log('after');
    newElement();
});
