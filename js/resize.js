$(window).resize(function() {
  //replace $(window).width() call to another div being resized..
  $("#acc_border").width($(window).width()/2);
  $("#accordion3").width($("#acc_border").width());
  $(".acc_block").width($("#accordion3").width() / $('#acc_holder').children().length);
  
  var children = $('#acc_holder').children();
  for(var i = 1; i < children.length; i++) {
    var prev_child = $("#" + children[i - 1].id).position();
    $("#" + children[i].id).css({ left: $("#" + children[i - 1].id).width() + prev_child.left});
  }
  width = $("#acc_border").width();
});