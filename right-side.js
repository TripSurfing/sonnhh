/**
 * Created by Nguyễn Hữu Hoàng Sơn on 5/20/2016.
 */
var rightSide = $("#right-side");
/*
 * Delete a box
 *
 * 
 */

rightSide.on("click", ".delete-icon", function() {
    var boxParent = $(this).parents('div.box');
    boxParent.children('div.box-container').addClass('box-blur');
    boxParent.prepend(
        '<div class="box-confirm">'+
            '<div class="box-confirm-content">' +
                '<p>Are you sure?</p>'+
                '<button type="button" class="btn btn-warning btn-confirm-delete">Yes</button>'+
                '<button type="button" class="btn btn-default btn-confirm-cancel">No</button>' +
            '</div>'+
        '</div>');

});
rightSide.on('click', '.btn-confirm-cancel', function() {
    var parent = $(this).parents('div.box-confirm');
    parent.siblings('.box-container').removeClass('box-blur');
    parent.remove();

});
rightSide.on('click', '.btn-confirm-delete', function(){
    var boxParent = $(this).parents('div.box');
    boxParent.hide(300, function(){
        // Sau này muốn thêm chức năng undo, bỏ dòng này đi
        boxParent.remove();
    });
    /*Do something to server here*/
});
/*
 * See more a quote
 *
 * 
 */
rightSide.on("click", ".quote-see-more", function() {
    $(this).siblings(".quote-content").toggleClass("quote-content-full quote-content-short");
    $(this).parents('div.box').toggleClass("box-full");
    $(this).toggleClass("short-quote");

    if ($(this).hasClass("short-quote")) $(this).text("See more");
    else $(this).text("See less");
});
/*
 * resize right-side
 * 
 * 
 */
var rightSideDOM = document.getElementById("right-side");
var tabContent = document.getElementById("tab-content-id");

function resizeRightSide() {
    var windowHeight = window.innerHeight;
    rightSideDOM.style.height = windowHeight.toString() + "px";
    tabContent.style.height = (windowHeight - 240).toString() + "px";

}
window.onresize = resizeRightSide;

/*
    rightSide close
    */

$("#right-side-close").click(function() {
    if (rightSide.hasClass("open")) {
        rightSide.animate({ right: '-375px' }, 600, function() { rightSide.removeClass("open"); });
    } else rightSide.animate({ right: '0px' }, 600, function() { rightSide.addClass("open"); });
});

$("#tooltip-switch button").click(function() {
    var button = $('#tooltip-switch button');
    button.eq(0).toggleClass('tooltip-on tooltip-off btn-default btn-warning');
    button.eq(1).toggleClass('tooltip-on tooltip-off btn-warning btn-default');
});
/*
* Ajax template
*/
$("#ajax-btn").click(function() {
    $.ajax({
            url: 'http://www.tripsurfing.loc/api/ajax_son',
            type: 'GET',
            jsonpCallback: 'my_callback',
            dataType: 'jsonp',
            contentType: "application/json",
            crossDomain: true,
            data: {
                term: "abc"
            },
        })
        .done(function(res) {
            console.log(res);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

});