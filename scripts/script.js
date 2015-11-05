var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
var isBlackBerry = /blackberry/i.test(navigator.userAgent.toLowerCase());
var isWebOS = /webos/i.test(navigator.userAgent.toLowerCase());
var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());

if (isiDevice || isAndroid || isBlackBerry || isWebOS || isWindowsPhone)
{
    $('link[href="styles/style.css"]').attr('href','styles/mobile.css');
};

function postData(data) {
    var html = "<ul>";
   
    $.each(data, function(key, value) {
       
        if(typeof value == "object") {
          
            html += "<li><h3><span>" + key + "</span></h3><ul>";
           
            $.each(value.innerItem, function(i, j){
                html += "<li><a href=" + JSON.stringify(j.link) + ">" + j.item + "</a></li>";
            });
          
            html += "</ul></li>";
        } else {
            $('#content').append(key + " : " + value);
        }
        
        $('#accordian').css("background", data.backgroundColor);
        $('body').append("<style> #accordian h3{ " + data.backgroundGradient + data.itemHeaderFontColor +
        data.itemHeaderBorderColor + "} #accordian h3:hover {" + data.backgroundGradientHover + 
        data.nestedListFontColor +  data.itemHeaderBorderColorHover + "} #accordian ul ul li a {" +
        data.nestedListFontColor + "} #accordian ul ul li a:hover {" + data.nestedListFontColorHover + 
        data.nestedListHover + data.nestedListBorderColor + "}</style>");
    });
   
    html += "</ul>";
   
    $('#accordian').append(html);
    
};
  
$(document).ready(function() {
    $.getJSON( "scripts/externalJson.json", function( data ) {
        postData(data);
    });

    $('#accordian').children().css("background", "red");

    $("#accordian").on("click", "h3", function(){
        $("#accordian ul ul").slideUp();
        if(!$(this).next().is(":visible")) $(this).next().slideDown();
    });
    
      $("#mobileMenu").click(function() {
        $("#accordian").slideToggle("fast", function () {
            if ($("#accordian").is(':visible')) {
                $('#accordian').css("visibility", "visible");
            } else {
                $('#accordian').css("visibility", "hidden");
            }
        });
    })

});