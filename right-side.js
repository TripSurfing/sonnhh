/**
 * Created by Nguyễn Hữu Hoàng Sơn on 5/20/2016.
 */

/*
 * Delete a box
 *
 * */

$(".delete-icon").click(function () {
    $(this.parentNode).slideUp();
});
/*
 * See more a quote
 *
 * */
$(".quote-see-more").click(function () {
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

function slideRightSide() {
    var rightSide = $("#right-side");
    if (rightSide.hasClass("open")) {
        rightSide.animate({right:'-375px'}, {queue: false, duration: 700});
    } else rightSide.animate({right:'0px'}, {queue: false, duration: 700});
    rightSide.toggleClass("open");
}
$("#right-side-close").click(function () {
    slideRightSide();
});

$("#tooltip-switch button").click(function () {
    /* reverse locking status */

    $("#tooltip-switch button").eq(0).toggleClass('tooltip-on tooltip-off btn-default btn-warning');
    $("#tooltip-switch button").eq(1).toggleClass('tooltip-on tooltip-off btn-warning btn-default');
});
