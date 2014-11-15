$(document).ready(function () {
    refreshGrid();
    addClickHandlers();
});

$(window).resize(function () {
    refreshGrid();
});

function playClickEffect(element, e) {
    var offset = $(element).offset();
    var left = e.clientX - offset.left;
    var top = e.clientY - offset.top;
    var dot = document.createElement('div');
    $(dot).addClass("cursor_bump");
    $(dot).css("left", left);
    $(dot).css("top", top);
    $(element).append(dot);
    console.log($(".cursor_bump").length);
    window.setTimeout(function () {
        $(dot).addClass("bigger");
    }, 5);
}
function addClickHandlers() {
    $(".clickable").mousedown(function (e) {
        $(".cursor_bump").remove();
        playClickEffect(this, e);
    });

    $(".clickable").mouseup(function (e) {
        var element = this;
        window.setTimeout(function() {
            playClickEffect(element, e);
        }, 500);
    })
}

