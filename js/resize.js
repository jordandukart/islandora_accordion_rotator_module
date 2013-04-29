$(window).resize(function() {
  //replace $(window).width() call to another div being resized..
  $("#acc_border").width($(window).width()/2);
  $("#accordion3").width($("#acc_border").width());

  var block_width = 0;
  var children = $('#acc_holder').children();
  
  for(var i = 0; i < children.length; i++) {
    if (i == 0) {
      $("#" + children[i].id).css({ left: 0});
    } else {
      var prev_child = $("#" + children[i - 1].id).position();
      $("#" + children[i].id).css({ left: block_width});
    }
    block_width = block_width + ($("#accordion3").width() / children.length);
    }
});