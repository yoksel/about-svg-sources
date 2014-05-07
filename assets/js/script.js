// Include sources
// -------------------------------

$( "#svg-filters" ).load( "/assets/img/svg/filters.svg", function() {
  // console.log( "Filters were loaded." );
});
$( "#svg-fills" ).load( "/assets/img/svg/fills.svg", function() {
  // console.log( "Fills were loaded." );
});
$( "#svg-masks" ).load( "/assets/img/svg/masks.svg", function() {
  // console.log( "Masks were loaded." );
});
$( "#svg-symbols" ).load( "/assets/img/svg/symbols.svg", function() {
  // console.log( "Images were loaded." );
});
$( "#svg-images" ).load( "/assets/img/svg/svg-lib.svg", function() {
  // console.log( "Images were loaded." );
});


var curSlideClass = ".slide.active";

// Resize div
// -------------------------------
$(function() {
    $( ".resizable" ).resizable();
  });

// Show Shapes
// -------------------------------
var showShapeClass = "demo__view";

function removeBackground(elem){
    // $(elem).css("background","none");
    $(elem).parent().addClass("no-highlight");
}

$(".demo--live").each ( function(){
    var svgCode = $(this).find(".demo__code");
    var shape_code = svgCode.val();

    var demoContent = $(this).find(".demo__content");
    var svgViewCode = "<div class='" + showShapeClass + "'>" + shape_code + "</div>";
    var svgView = $(svgViewCode).insertBefore($(demoContent));

    $(svgCode).change ( function(){
        $(svgView).html( $(this).val() );
        removeBackground(this);
    });

    svgCode.bind('keydown keyup', function(event){
        event.stopPropagation();
        $(svgView).html( $(this).val() );
        removeBackground(this);
    });

});

// Show Demos
// -------------------------------
var switchCheckedClass = "switch--checked";
$(".demo__switch dd").each( function(){
    $(this).click( function(){
        $("." + switchCheckedClass, $(this).parent()).removeClass(switchCheckedClass);
        $(this).addClass( switchCheckedClass );

        var changeAttr = $(this).parent().attr("data-attr");
        var changeVal = $(this).attr("data-val");

        var svgGroup = $(curSlideClass).find("g");
        svgGroup.attr(changeAttr,changeVal);

        var svgElem = $(curSlideClass).find("svg");
        var svgElem_n = document.querySelector(".active svg");
        var svgViewbox = svgElem_n.getAttribute("viewBox"); //svg.attr("viewBox");
        var svgContent = svgElem.html();
        var demoCode = $(curSlideClass).find(".demo__code");
        demoCode.val("<svg viewbox='" + svgViewbox + "'>" + svgContent + "</svg>");
        });
    });

// Popup Images
// -------------------------------
var popupClass = "popup";
var popupImgClass = popupClass + "__img";
 $(".img-preview").click ( function(){
    var img = "<img src='" + $(this).attr("href") + "' class='" + popupImgClass + "'>";
    $( "<div class='" + popupClass + "'>" + img + "</div>" ).insertBefore( this );
    var imgWidth = $("." + popupImgClass).width();
    $(".popup img").load(function() {
        $(".popup").height( $(this).height() );
        $(".popup").width( $(this).width() );
    });

    $(".popup").click ( function(event){
        event.stopPropagation();
        $(this).remove();
    });

    return false;
 });

// Toggle Codes
// -------------------------------

jQuery.fn.animateAuto = function(prop, speed, callback){
    var elem, height, width;
    return this.each(function(i, el){
        el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
        height = elem.css("height"),
        width = elem.css("width"),
        elem.remove();

        if(prop === "height")
            el.animate({"height":height}, speed, callback);
        else if(prop === "width")
            el.animate({"width":width}, speed, callback);
        else if(prop === "both")
            el.animate({"width":width,"height":height}, speed, callback);
    });
}

$(".js-toggle-code").bind("click", function(e){
    $(this).animateAuto("height", 1000);
    console.log("123")
});


