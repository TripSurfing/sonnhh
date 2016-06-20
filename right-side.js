/**
 * Created by Nguyễn Hữu Hoàng Sơn on 5/20/2016.
 */
var nomore = '<div class="no-more">\
                    <p class="no-more-content">\
                        No more data to load\
                    </p>\
                </div>'
var rightSide = $("#right-side");

/*
 * Delete a box
 *
 */

rightSide.on("click", ".delete-btn", function () {
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

rightSide.on("click", ".icon-heart", function() {
    $(this).toggleClass("favorite-active favorite-not-active");
});

rightSide.on('click', '.btn-confirm-cancel', function() {
    var parent = $(this).parents('div.box-confirm');
    parent.siblings('.box-container').removeClass('box-blur');
    parent.remove();

});
rightSide.on('click', '.btn-confirm-delete', function() {
    $(this).parents('div.box').remove();
    // $(this).parents("div.box").slideUp(400, function() {
    //     // Sau này muốn thêm chức năng undo, bỏ dòng này đi
    //     $(this).remove();
    // });
    /*Do something to server here*/
});

/*
 * See more a quote
 *
 */

rightSide.on("click", ".quote-see-more", function() {
    $(this).parent().siblings(".quote-content").toggleClass("quote-content-full quote-content-short");
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
var  updatePlace = function(placeList) {
    for (let place of placeList) {
        var img_url;
        place.detail == null ? img_url = "http://www.tripsurfing.co/static/img/noimg.jpg" : img_url=place.detail.url; 
        var item = 
            '<div class="media box">\
                <div class="box-container">\
                    <div class="media-left">\
                        <a href='+ place.url +' target="_blank">\
                            <div class="media-object box-avatar-left" style="background-image: url('+img_url +')"> </div>\
                        </a>\
                    </div>\
                    <div class="media-body box-body">\
                        <a href='+place.url +' class="box-title" target="_blank" title="'+place.name +'">\
                            <h4 class="media-heading title-wrap">'+place.name +'</h4>\
                        </a>\
                        <div class="box-body-content saved-places-content">'+place.address +'</div>\
                        <div class="place-bottom">\
                            <div class="rating">\
                                <i class="icon-entypo icon-star"></i> 4.5\
                            </div>\
                            <div class="delete-btn">\
                                <i class="icon-entyp icon-trash delete-icon" data-toggle="tooltip" data-placement="left" title="Delete"></i>\
                            </div>\
                            <div class="favorite-btn">\
                                <i class="icon-entypo icon-heart favorite-not-active" data-toggle="tooltip" data-placement="left" title="Add to favorite"></i>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>'

        $("#saved-places-id").append(item);
    }
    // if (placeList.length > 3) $("#saved-places-id").append(nomore);
}
var updateQuote = function(quoteList) {
    for (let quote of quoteList) {
        var item = '<div class="quote box">\
                        <div class="box-container">\
                            <p class="quote-content quote-content-short">' + quote.content +
                            '</p>\
                            <div class="quote-bottom" style="background:url('+quote.icon+') 0% 50% no-repeat">\
                                <a class="quote-source" target="_blank" href=' + quote.from_url + '>' +
                                quote.canonicalUrl + "/..." +
                                '</a>\
                                <a class="quote-see-more short-quote" href="#">See more</a>\
                            </div>\
                        </div>\
                    </div>';
        $("#saved-quote-id").append(item);
    }
    // if (quoteList.length > 3) $("#saved-quote-id").append(nomore);
}
var  updateLink = function(linkList) {
    for (let link of linkList) {
        var item = 
        '<div class="media box">\
            <div class="box-container">\
                <div class="media-left">\
                    <a href=' + link.url + ' target="_blank">\
                        <div class="media-object box-avatar-left" style="background-image: url(' 
                            + link.image + ')"> \
                        </div>\
                    </a>\
                </div>\
                <div class="media-body box-body">\
                    <a href=' + link.url + ' class="box-title"  target="_blank" title="' +link.title+'">\
                        <h4 class="media-heading title-wrap">' + link.title +
                    
                        '</h4>\
                    </a>\
                    <div class="box-body-content saved-link-desc">' +
                        link.description+
                    '</div>\
                    <div class="link-bottom" style="background:url('+link.icon+') 0% 50% no-repeat">\
                            <a class="saved-link-footer" target="_blank" href=http://' + link.canonicalUrl + '>'
                        + link.canonicalUrl +
                            '</a>\
                            <div class="delete-btn" >\
                                <i class="icon-entyp icon-trash delete-icon" data-toggle="tooltip" data-placement="left" title="delete"></i>\
                            </div>\
                    <div>\
                </div>\
            </div>\
        </div>';
        $("#saved-links-id").append(item);
    }
    // if (linkList.length > 3) $("#saved-links-id").append(nomore);
}

function load() {
    $.ajax({
        type: 'GET',
        url: 'http://www.tripsurfing.co/api/testRenderTrip',
        data: {"tripId": 74},
        jsonpCallback: 'my_callback',
        dataType: 'jsonp',
        contentType: "application/json",
        crossDomain: true,

        success: function(res) {
            updatePlace(res.place);
            updateQuote(res.quote);
            updateLink(res.link);
            $('[data-toggle="tooltip"]').tooltip() 
        },

        error: function(res) {
            console.log(res.messenger);
        }
    })
    .always(function(res) {
        console.log(res);
    });

}
function clearWindow(callback) {
    $("#saved-links-id").children("div").remove();
    $("#saved-quote-id").children("div").remove();
    $("#saved-places-id").children("div").remove();
    callback();
}
$('#btn-tool-show').click(function() {
    if ($('#btn-tool-show').hasClass("not-show")) {
        clearWindow(load);
        // load(); 
    }
    
    // reload(function() {load();});
    rightSide.slideToggle(700,"swing", function() {
        $('#btn-tool-show').toggleClass('not-show show');
    });
});

rightSide.on('click', '.my-dropdown-content a', function() {
    var text = $(this).html();
    $('.trip-name').text(text);
});
