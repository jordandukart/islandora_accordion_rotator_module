var all_data;
var current_page;
var numBlocks;
var page_sentinal = 0;
jQuery(document).ready(function($) {
  buttonsClass("div.social_button");
    buttonsClass("div.accordion_button");
    
    current_page = 1;
    get_data(current_page);
    build_form();
    load_rotator();
  });

function get_data(place) {
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

function build_form() {
  //$('#acc_border').append("<div class='accordion' id='accordion3'></div>");
  //$('#accordion3').append("<div class='acc_holder' id='acc_holder'></div>");
  for(var i = 0;i<6;i++) {
    if(all_data["content"][page_sentinal + i] != null) {
        add_image_block(page_sentinal + i);    
    } else {
      i=numBlocks;
      empty_form();
      page_sentinal = 0;
      build_form();
    }
  }
  // Hide description fields for the time being...
  $(".acc_content").hide();
}
function add_image_block(sentinal) {
  $('#acc_holder').append("<div class='acc_block' id='acc_block" + sentinal + "'></div>");
  $('#acc_block' + sentinal).append("<div class='acc_content_holder' id='acc_content_holder" + sentinal + "' src='" + all_data["content"][sentinal].img_url + "'></div>");
  $('#acc_content_holder' + sentinal).append("<div class='acc_image'></div>");
  add_detail_block(all_data["content"][sentinal],sentinal);
}
function add_detail_block(details,id_num) {
  $('#acc_data').append("<div id='acc_content" + id_num + "' class='acc_content' transitionType='bottom' transitionTime='0.5' distance='30' delay='0' x='0' y='0' alignV='top'></div>");
  $('#acc_content' + id_num).append("<div class='box' id='box" + id_num + "'></div>");
  $('#box' + id_num).append("<p class='acc_title'>" + details.title + "</p>");
  $('#box' + id_num).append("<p class='text'>" + details.description + "</p>");
}

function load_rotator() {
  $(".accordion").accordion({ width: $("#acc_border").width(),
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
