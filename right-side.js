/**
 * Created by Nguyễn Hữu Hoàng Sơn on 5/20/2016.
 */
var nomore = '<div class="no-more">\
                    <p class="no-more-content">\
                        No more data to load\
                    </p>\
                </div>'
var rightSide = $("#right-side");
$(function() {
    rightSide.resizable();
    $("#ext-nav").tabs({
        active: 1,
        heightStyle: "fill",
        hide: {effect: "fade", duration: 150},
        show: {effect: "fade", duration: 150}
    });
    load();
});

/*
 * Delete a box
 *
 */

rightSide.on("click", ".delete-btn", function () {
    var boxParent = $(this).parents('div.box');
    boxParent.children('div.box-info', 'div.box-image').addClass('box-blur');
    boxParent.prepend(
        '<div class="box-confirm">\
            <div class="box-confirm-content">\
                <p>Are you sure?</p>\
                <button type="button" class="btn-confirm-no">No</button>\
                <button type="button" class="btn-confirm-yes">Yes</button>\
            </div>\
        </div>');
});
rightSide.on('click', '.btn-confirm-no', function() {
    var parent = $(this).parents('div.box-confirm');
    parent.siblings('.box-info', '.box-image').removeClass('box-blur');
    parent.remove();

});
rightSide.on('click', '.btn-confirm-yes', function() {
    // $(this).parents('div.box').remove();
    $(this).parents("div.box").fadeOut(300, function() {
        // Sau này muốn thêm chức năng undo, bỏ dòng này đi
        $(this).remove();
    });
    /*Do something to server here*/
});

rightSide.on("click", ".icon-heart", function() {
    
    heart = $(this);

    heart.toggleClass("favorite-active favorite-not-active");
    // if (heart.hasClass('favorite-active')) {
    //     $.post('wwww.tripsurfing.co/api/favorite', 
    //         {
    //             itemId:,
    //             type:,
    //             action: 'add'
    //         }
    //     );
    // }
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
	console.time('test');
    for (let place of placeList) {
        var img_url;
        place.detail == null ? img_url = "http://www.tripsurfing.co/static/img/noimg.jpg" : img_url=place.detail.url; 
        var item = 
            '<div class="box">\
                    <a class="box-image" href='+ place.url +' target="_blank">\
                        <div class="image" style="background-image: url('+img_url +')"> </div>\
                    </a>\
                    \
                    <div class="box-info">\
                        <a href='+place.url +' class="box-title" target="_blank" title="'+place.name +'">\
                            <h4 class="ext-title-wrap">'+place.name +'</h4>\
                        </a>\
                        \
                        <div class="box-desc" title="'+place.address+'">'+place.address +'</div>\
                        \
                        <div class="place-bottom" id="place-'+place.id+'">\
                            <div class="rating">\
                                <i class="icon-entypo icon-star"></i> 4.5\
                            </div>\
                            <div class="delete-btn">\
                                <i class="icon-entyp icon-trash" title="Delete" ext-data="tipsy"></i>\
                            </div>\
                            <div class="favorite-btn">\
                                <i class="icon-entypo icon-heart favorite-not-active"  title="Add to favorite"   ext-data="tipsy"></i>\
                            </div>\
                        </div>\
                    </div>\
            </div>'

        $("#place-tab").append(item);
    }
	console.timeEnd('test');
    // if (placeList.length > 3) $("#saved-places-id").append(nomore);
}

var  updateLink = function(linkList) {
    for (let link of linkList) {
        var item = 
        '<div class="box">\
            <a class="box-image" href=' + link.url + ' target="_blank">\
                <div class="image" style="background-image: url(' + link.image + ')"></div>\
            </a>\
            <div class="box-info">\
                <a href=' + link.url + ' class="box-title"  target="_blank" title="' +link.title+'">\
                    <h4 class="media-heading ext-title-wrap">' + link.title + '</h4>\
                </a>\
                <div class="box-desc" title="'+link.description+'">'+link.description+'</div>\
                \
                <div id="link-'+link.id+'" class="link-bottom" style="background:url('+link.icon+') 0% 50% no-repeat">\
                    <a class="link-canonical-url" target="_blank" href=http://' + link.canonicalUrl + '>'
                        + link.canonicalUrl +
                    '</a>\
                    \
                    <div class="delete-btn" >\
                        <i class="icon-entyp icon-trash" title="Delete" ext-data="tipsy"></i>\
                    </div>\
                </div>\
            </div>\
        </div>';
        $("#link-tab").append(item);
    }
    // if (linkList.length > 3) $("#saved-links-id").append(nomore);
}
var announceError = function(message) {
    var error =  
        '<div class="error">\
            <div class="error-content">'+message+'</div>\
            <a href="http://tripsurfing.co/login" target="_blank">\
                <button class="login-btn">Log In</button>\
            </a>\
        </div>';
    $("#place-tab").append(error);
    $("#link-tab").append(error);
}

function load(tripId) {
    if (isNaN(tripId)) {
        let defaultTrip = $(".default-trip")[0];
        tripId = +defaultTrip.id;
        $("#trip-name").text(defaultTrip.text);
    }
    $.ajax({
        type: 'GET',
        url: 'http://www.tripsurfing.co/api/testRenderTrip',
        data: {"tripId": tripId},
        jsonpCallback: 'my_callback',
        dataType: 'jsonp',
        contentType: "application/json",
        crossDomain: true,

    })
    .done(function(res) {
        switch(res.type) {
            case "success":
                updatePlace(res.place);
                updateLink(res.link);
                $('[ext-data="tipsy"]').tipsy({
                    gravity: 'se',
                    fade: true,
                    delayIn: 500
                });
                break;
            case "error":
                announceError(res.message);
                break;
        } 
    })
    .always(function(res) {
        console.log(res);
    });

}
function clearWindow(callback) {
    $("#link-tab").children("div").remove();
    $("#place-tab").children("div").remove();
    callback();
}

$('#btn-tool-show').click(function() {
    // if ($('#btn-tool-show').hasClass("not-show")) {
    //     clearWindow(load);
    //     // load(); 
    // }
    rightSide.slideToggle(700,"swing", function() {
        $('#btn-tool-show').toggleClass('not-show show');
    });
});

rightSide.on('click', '.my-dropdown-content a', function() {
    let tripId = this.id;
    let text = $(this).text();

    clearWindow(function() {load(tripId);});
    $('#trip-name').text(text);
});
