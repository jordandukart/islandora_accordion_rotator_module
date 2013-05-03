// Indicate if the window is to small to show the true accordion.
// Instead, use 'paging' like functionality.
var page_mode = "full";
$(window).resize(function() {
  //replace $(window).width() call to another div being resized..
  $("#acc_border").width($(window).width()/2);
  $("#accordion3").width($("#acc_border").width());

  var block_width = 0;
  var data_div;
  var children = $('#acc_holder').children();
  
  for(var i = 0; i < children.length; i++) {
    if (i == 0) {
      $("#" + children[i].id).css({ left: 0});
    } else {
      var prev_child = $("#" + children[i - 1].id).position();
      $("#" + children[i].id).css({ left: block_width});
    }
    block_width = block_width + ($("#accordion3").width() / children.length);
    // Append the block data to our new div
    data_div = $("#" + children[i].id).children(".acc_content");
    $("#acc_data").append(data_div[0]);
    }
  
  
  // Hide the grey info box while resizing.
  $(".acc_holder .acc_content", $("#accordion3")).css("opacity", 0);
  
  // We need to handle small sized screens with large images...
  if($(window).width() < 320) {
	  page_mode = "small";
  } else if($(window).width() < 640) {
	  page_mode = "medium";
  } else if($(window).width() < 1024){
	  page_mode = "large";
  } else {
	  page_mode = "full";
  }
});
