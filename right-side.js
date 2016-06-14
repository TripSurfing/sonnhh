/**
 * Created by Nguyễn Hữu Hoàng Sơn on 5/20/2016.
 */
var rightSide = $("#right-side");
/*
 * Delete a box
 *
 */

rightSide.on("click", ".delete-icon", function () {
    var boxParent = $(this).parents('div.box');
    boxParent.children('div.box-container').addClass('box-blur');
    boxParent.prepend(
        '<div class="box-confirm">\
            <div class="box-confirm-content">\
                <p>Are you sure?</p>\
                <button type="button" class="btn btn-warning btn-confirm-delete">Yes</button>\
                <button type="button" class="btn btn-default btn-confirm-cancel">No</button>\
            </div>\
        </div>');
});
rightSide.on('click', '.btn-confirm-cancel', function() {
    var parent = $(this).parents('div.box-confirm');
    parent.siblings('.box-container').removeClass('box-blur');
    parent.remove();

});
rightSide.on('click', '.btn-confirm-delete', function() {
    var boxParent = $(this).parents('div.box');
    boxParent.hide(300, function() {
        // Sau này muốn thêm chức năng undo, bỏ dòng này đi
        boxParent.remove();
    });
    /*Do something to server here*/
});

/*
 * See more a quote
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

// window.onresize = resizeRightSide;
/*
    rightSide close
    */
var load = function() {
    $.ajax({
        type: 'GET',
        url: 'http://www.tripsurfing.co/api/testRenderTrip',
        data: {"tripId": 72},
        jsonpCallback: 'my_callback',
        dataType: 'jsonp',
        contentType: "application/json",
        crossDomain: true,
    })
    .done(function(res) {
        console.log(res);

        updatePlace(res.place);
        updateQuote(res.quote);
        updateLink(res.link);
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}

function updatePlace (placeList) {
    for (let place of placeList) {
        var item = '<div class="media box">\
            <div class="box-container">\
                <div class="media-left box-avatar-left">\
                    <a href=' + place.url + ' target="_blank">\
                        <img class="media-object saved-places-image" src="' + place.detail.url + '" alt="image">\
                    </a>\
                </div>\
                <div class="media-body box-body">\
                    <a href=' + place.url + ' class="box-title"  target="_blank">\
                        <h4 class="media-heading title-wrap">' + place.name +
                    
                        '</h4>\
                    </a>\
                    <div class="box-body-content saved-places-content">' +
                        place.address+
                    '</div>\
                </div>\
            </div>\
        </div>';
        $("#saved-places-id").append(item);
    }
}
function updateQuote (quoteList) {
    for (let quote of quoteList) {
        var item = '<div class = "quote box">\
                        <div class="box-container">\
                        <p class="quote-content quote-content-short">' +
                            quote.content +
                        '</p>\
                        <a class="quote-source" target="_blank" href=' + quote.from_url + '>' +
                            quote.from_url +
                        '</a>\
                        <a class="quote-see-more short-quote" href="#">See more</a>\
                    </div>\
                    </div>';
        $("#saved-quote-id").append(item);
    }
}
function updateLink (linkList) {
    for (let link of linkList) {
        var item = '<div class="media box">\
            <div class="box-container">\
                <div class="media-left box-avatar-left">\
                    <a href=' + link.url + ' target="_blank">\
                        <img class="media-object saved-link-image" src="' + link.image + '" alt="image">\
                    </a>\
                </div>\
                <div class="media-body box-body">\
                    <a href=' + link.url + ' class="box-title"  target="_blank">\
                        <h4 class="media-heading title-wrap">' + link.title +
                    
                        '</h4>\
                    </a>\
                    <div class="box-body-content saved-link-desc">' +
                        link.description+
                    '</div>\
                    <a class="saved-link-footer">'
                        + link.canonicalUrl + '/...' +
                    '</a>\
                </div>\
            </div>\
        </div>';
        $("#saved-links-id").append(item);
    }
}
$('#btn-tool-show').click(function() {
    load();
    rightSide.slideToggle(700, function() {
        $('#btn-tool-show span').toggleClass('glyphicon-triangle-top glyphicon-triangle-bottom');
    });
});



rightSide.on('click', '.my-dropdown-content a', function() {
    var text = $(this).html();
    $('.trip-name').text(text);
});
