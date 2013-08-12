/**
 * @file
 * Holds the resize logic to make the width of 
 * accordion rotator dynamic with the page.
 */
$(window).resize(function() {
  resize_frame();
  update_numblocks();
  $(".acc_content").hide();
  // Hide the grey info box while resizing.
  $(".acc_holder .acc_content", $("#accordion3")).css("opacity", 0);
  console.log($('.content').width());
  resize_blocks();
});
/**
 * handles dynamic frame and accordion width.
 */
function resize_frame() {
  if($(window).width() > 750) {
	  $("#acc_border").width($('.content').width());
	}
  //console.log($("#acc_border").width());
  //$("#acc_border").width($('#navigation').width());
  $("#accordion3").width($("#acc_border").width());
}
/**
 * Properly adjusts each block's location
 * on page resize.
 */
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
/**
 * This function is called when the accordion is first loaded,
 * on paging and on page resize. Sets numBlocks the the correct 
 * number to show in the accordion based on screen size.
 */
function update_numblocks() {
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
}
