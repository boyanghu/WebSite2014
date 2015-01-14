$(window).load(function () {
    initializeGrid();
    addClickHandlers();
});

$(window).resize(function () {
    refreshGrid();
});

function playClickEffect(element, e) {
    var offset = $(element).offset();
    var left = e.clientX - offset.left;
    var top = e.clientY - offset.top + $(document).scrollTop();
    var dot = document.createElement('div');
    $(dot).addClass("cursor_bump");
    $(dot).css("left", left);
    $(dot).css("top", top);
    $(element).append(dot);
    window.setTimeout(function () {
        $(dot).addClass("bigger");
    }, 100);
}
function addClickHandlers() {
    $(".clickable").mousedown(function (e) {
        $(".cursor_bump").remove();
        var element = this;
        playClickEffect(element, e);
        setTimeout(function() {
            playClickEffect(element, e);
        }, 500);
    });

}

