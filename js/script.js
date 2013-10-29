/**
 * @file
 * Holds the initilization logic for the
 * accordion rotator.
 */
var all_data;
var current_page;
var numBlocks;
var page_sentinal = 0;
var rebuild = false;
(function($) {
	$(document).ready(function() {
		current_page = 1;
	    get_data(current_page);
	    build_form();
	    load_rotator();


	});

  })(jQuery);

/**
 * Post to our drupal endpoint to retrieve data for the
 * rotator.
 */
function get_data(place) {
  // Set the correct number of blocks to show depending
  // on screensize. This is used in accordion.js calc's.
  var base = window.Drupal.settings.basePath;
  $.ajax({
    url: base + 'accordion_rotator/setup',
    async:false,
    success: function(data, status, xhr) {
    	current_page = 0;
      all_data = data;
    },
    error: function() {
        alert("An error populating the Accordion Rotator.");
    },
    dataType: 'json'
  });
}
/**
 * Construct the form from scratch, every time it needs to
 * be drawn
 */
function build_form() {
  $('#acc_border').append("<div class='accordion' id='accordion3'></div>");
  $('#accordion3').append("<div class='acc_holder' id='acc_holder'></div>");

  add_buttons();

  buttonsClass("div.social_button");
  buttonsClass("div.accordion_button");

  var total = all_data["content"].length;
  update_numblocks();
  for(var i = 0;i<numBlocks;i++) {
    add_image_block((0 + i) % total);
  }

  // Hide description fields for the time being...
  $(".acc_content").hide();
}
/**
 * Adds buttons to the accordion for navigation.
 */
function add_buttons() {
  var img_path = window.parent.Drupal.settings.accordion_rotator.linkpath;
  $('#acc_border').append("<div id='acc_previous' class='previous accordion_button' normal='" + img_path + "/images/ui/previous_button.png' over='" + img_path + "/images/ui/previous_button_over.png'></div>");
  $('#acc_border').append("<div id='acc_next' class='next accordion_button' normal='" + img_path + "/images/ui/next_button.png' over='" + img_path + "/images/ui/next_button_over.png'></div>");
  buttonsClass("div.social_button");
  buttonsClass("div.accordion_button");
}
/**
 * Creates an image block with a unique id and is added
 * to the accordion.
 * @param sentinal
 */
function add_image_block(sentinal) {
  $('#acc_holder').append("<div class='acc_block' id='acc_block" + sentinal + "'></div>");
  $('#acc_block' + sentinal).append("<div class='acc_content_holder' id='acc_content_holder" + sentinal + "' src='" + all_data["content"][sentinal].img_url + "'></div>");
  $('#acc_content_holder' + sentinal).append("<div class='acc_image' id='acc_image" + sentinal + "'></div>");
  add_detail_block(all_data["content"][sentinal],sentinal);
}
/**
 * Add the title and description based on the details object passed,
 * and a content holder for the div of the text
 * @param details
 * @param id_num
 */
function add_detail_block(details,id_num) {
  $('#acc_image' +id_num).append("<div id='acc_content" + id_num + "' class='acc_content' transitionType='bottom' transitionTime='0.5' distance='30' delay='0' x='0' y='0' alignV='bottom'></div>");
  $('#acc_content' + id_num).append("<div class='box' id='box" + id_num + "'></div>");
  $('#box' + id_num).append("<a href='" + all_data["content"][id_num].link + "'><h2 class='acc_title'>" + details.title + "</h2></a>");
  $('#box' + id_num).append("<p class='acc_text'>" + details.description + "</p>");
}

function add_locator_triangle() {
  $('#acc_data').append("<div class='arrow-down'></div>");
}
/**
 * Initilize the rotator with default params
 */
function load_rotator() {
  //add_locator_triangle();
  $(".accordion").accordion({ width: $('#accordion3').parent().width(),
          sentData:all_data["content"],
          height:440,
          barSize:140,
          cover:false,
          coverAlpha:0.5,
          shadow:false,
          shadowAlpha:1,
          border:true,
          borderSize:1 ,
          borderColor:"#242424",
          transitionTime:0.3,
          autoplay:false,
          autoplayTime:5,
          changeType:"click",
          previousBtn:$("#acc_border div.previous"),
          nextBtn:$("#acc_border div.next")}
          );
  // Fire the resize event to be sure the accordion is the
  // correct size.
  $(window).resize();
}
