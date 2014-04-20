// Include sources
// -------------------------------

$( "#svg-filters" ).load( "assets/img/svg/filters.svg", function() {
  console.log( "Filters were loaded." );
});
$( "#svg-fills" ).load( "assets/img/svg/fills.svg", function() {
  console.log( "Fills were loaded." );
});
$( "#svg-masks" ).load( "assets/img/svg/masks.svg", function() {
  console.log( "Masks were loaded." );
});
$( "#svg-images" ).load( "assets/img/svg/svg-lib.svg", function() {
  console.log( "Images were loaded." );
});

// Resize div
// -------------------------------
$(function() {
    $( ".resizable" ).resizable();
  });

// Show shapes
// -------------------------------
var showShapeClass = "demo__view";

$(".demo__code").each ( function(){
    var shape_code = $(this).val();
    $( "<div class='" + showShapeClass + "'>" + shape_code + "</div>" ).insertBefore( this );

    $(this).change ( function(){
        $(this).prev("." + showShapeClass).html( $(this).val() );  
    });
    
    $(this).bind('keydown keyup', function(event){
        event.stopPropagation();
        $(this).prev("." + showShapeClass).html( $(this).val() );  
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
