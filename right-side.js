/**
 * Created by Nguyễn Hữu Hoàng Sơn on 5/20/2016.
 */

/*
 * Delete a box
 *
 * */

$(document).on("click", ".delete-icon", function () {
    $(this.parentNode).hide(300);
});
/*
 * See more a quote
 *
 * */
$(document).on("click", ".quote-see-more", function () {
    $(this).siblings(".quote-content").toggleClass("quote-content-full quote-content-short");
    $(this).parent().toggleClass("box-full");
    $(this).toggleClass("short-quote");

    if($(this).hasClass("short-quote")) $(this).text("See more");
    else $(this).text("See less");
});
/*
 * resize right-side
 * 
 * */
var rightSide = document.getElementById("right-side");
var tabContent = document.getElementById("tab-content-id");

function resizeRightSide() {
    var windowHeight = window.innerHeight;
    rightSide.style.height = windowHeight.toString() + "px";
    tabContent.style.height = (windowHeight - 240).toString() + "px";

}
window.onresize = resizeRightSide;

/*
    rightSide close
*/

$("#right-side-close").click(function () {

    if (rightSide.hasClass("open")) {
        rightSide.animate({right:'-375px'}, 600, function () { rightSide.removeClass("open"); });
    } else rightSide.animate({right:'0px'}, 600, function () { rightSide.addClass("open"); });
});

$("#tooltip-switch button").click(function () {
    /* reverse locking status */

    $("#tooltip-switch button").eq(0).toggleClass('tooltip-on tooltip-off btn-default btn-warning');
    $("#tooltip-switch button").eq(1).toggleClass('tooltip-on tooltip-off btn-warning btn-default');
});
