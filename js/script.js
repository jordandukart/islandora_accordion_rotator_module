var all_data;
var current_page;
var numBlocks;
var page_sentinal = 0;
jQuery(document).ready(function($) {
    current_page = 1;
    get_data(current_page);
    build_form();
    load_rotator();
  });

/**
 * Post to our drupal endpoint to retrieve data for the
 * rotator.
 */
function get_data(place) {
	//console.log("get_data for page: " + place);
	//console.log("Current Page: " + current_page);
	//console.log("Num of blocks: " + numBlocks);
	//console.log("page sentinal: " + page_sentinal);
	
    if($(window).width() < 320) {
      numBlocks = 1;
    } else if($(window).width() < 640 && $(window).width() > 364) {
      numBlocks = 2;
    } else if($(window).width() < 1024 && $(window).width() > 640){
      numBlocks = 4;
    } else if($(window).width() > 1024){
      numBlocks = 6;
    }
  var base = window.Drupal.settings.basePath;
    $.ajax({
        url: base + 'accordion_rotator/setup/' + place,
        async:false,
        success: function(data, status, xhr) {
          all_data = data;
          //alert(JSON.stringify(data["content"]));
        },
        error: function() {
            alert("Please Login to site");
        },
        dataType: 'json'

    });
}
/**
 * Construct the form from scratch, every time it needs to 
 * be drawn
 */
function build_form() {
	//console.log("build_form entered");
  $('#acc_border').append("<div class='accordion' id='accordion3'></div>");
  $('#accordion3').append("<div class='acc_holder' id='acc_holder'></div>");
  
  add_buttons();
  
  buttonsClass("div.social_button");
  buttonsClass("div.accordion_button");
  for(var i = 0;i<6;i++) {
    if(all_data["content"][page_sentinal + i] != null) {
        add_image_block(page_sentinal + i);    
    } else {
      i=numBlocks;
      page_sentinal = 0;
      $('#acc_holder').remove(".acc_block");
      empty_form();
      build_form();
      //load_rotator();  
    }
  }
  // Hide description fields for the time being...
  $(".acc_content").hide();
}
/**
 * Adds buttons to the accordion for navigation.
 */
function add_buttons() {
	//console.log("add_buttons entered");
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
	//console.log("add_image_block entered");
  $('#acc_holder').append("<div class='acc_block' id='acc_block" + sentinal + "'></div>");
  $('#acc_block' + sentinal).append("<div class='acc_content_holder' id='acc_content_holder" + sentinal + "' src='" + all_data["content"][sentinal].img_url + "'></div>");
  $('#acc_content_holder' + sentinal).append("<div class='acc_image'></div>");
  add_detail_block(all_data["content"][sentinal],sentinal);
}
/**
 * Add the title and description based on the details object passed,
 * and a content holder for the div of the text
 * @param details
 * @param id_num
 */
function add_detail_block(details,id_num) {
	//console.log("add_detail_block entered");
  $('#acc_data').append("<div id='acc_content" + id_num + "' class='acc_content' transitionType='bottom' transitionTime='0.5' distance='30' delay='0' x='0' y='0' alignV='top'></div>");
  $('#acc_content' + id_num).append("<div class='box' id='box" + id_num + "'></div>");
  $('#box' + id_num).append("<p class='acc_title'>" + details.title + "</p>");
  $('#box' + id_num).append("<p class='text'>" + details.description + "</p>");
}
/**
 * Initilize the rotator with default params
 */
function load_rotator() {
	//console.log("load_rotator entered");
	//console.log("input width: " + $("#acc_border").width())
  $(".accordion").accordion({ width: 750,
          sentData:all_data["content"],
          height:410,
          barSize:100,
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
  $(window).resize();
}
