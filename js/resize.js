// Indicate if the window is to small to show the true accordion.
// Instead, use 'paging' like functionality.
$(window).resize(function() {
  resize_frame();
  $(".acc_content").hide();
  var children = $('#acc_holder').children();
  // Hide the grey info box while resizing.
  $(".acc_holder .acc_content", $("#accordion3")).css("opacity", 0);

  // We need to handle small sized screens with large images...
  if($(window).width() < 320 && numBlocks != 1) {
    numBlocks = 1;
  } else if($(window).width() < 640 && $(window).width() > 364 && numBlocks != 2) {
    numBlocks = 2;
  } else if($(window).width() < 1024 && $(window).width() > 640 && numBlocks != 4){
    numBlocks = 4;
  } else if($(window).width() > 1024 && numBlocks != 7){
    numBlocks = 6;
  }
  
//  if(children.length != numBlocks) {
//    var lth = children.length;
//    var rmv = 0;
//    //alert(all_data.length);
//    for(var i = 0;i<numBlocks;i++) {
//      if (i < numBlocks) {
//        if(document.getElementById('#acc_block' + i) == null) {
//          //alert("add image block");
//          add_image_block(i);
//        }
//      } else {
//        //alert("#" + children[i].id);
//        $("#" + children[i].id).remove();
//      }
//    }
//  }
  resize_blocks();
});
function resize_frame() {
  $("#acc_border").width($(window).width()/2);
  $("#accordion3").width($("#acc_border").width());
}
function resize_blocks() {
  var children = $('#acc_holder').children();
  var block_width = 0;
  var data_div;
  
  for(var i = 0; i < children.length; i++) {
      if (i == 0) {
          $("#" + children[i].id).css({ left: 0});
        } else {
          block_width = block_width + ($("#accordion3").width() / numBlocks);
          $("#" + children[i].id).css({ left: block_width});
        }
      }
}