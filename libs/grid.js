function refreshGrid() {
    var container = $("#grid");
    setDimensionsOfContainerContent(container);
    placeContainerContent(container.children("div"), getMaxElementsPerRow(container), getBaseContentWidth(container));
    console.log(container.width());
}

function setDimensionsOfContainerContent(container) {
    var baseContentWidth = getBaseContentWidth(container);
    container.children(".w1").width(baseContentWidth);
    container.children(".w2").width(baseContentWidth * 2);
    container.children(".h1").height(baseContentWidth);
    container.children(".h2").height(baseContentWidth * 2);
    console.log(container.children(".w1").length);
}

function getBaseContentWidth(container) {
    return Math.ceil(container.width() / getMaxElementsPerRow(container));
}

var ONE_ELEMENT_MAX_WIDTH = 400;

function getMaxElementsPerRow(container) {
    return (Math.ceil(container.width() / ONE_ELEMENT_MAX_WIDTH));
}


function placeContainerContent(containerContent, maxElementsPerRow, baseContentWidth) {
    console.log("Number of content divs: " + containerContent.length);
    var grid = new Array();
    for (var i = 0; i < containerContent.length; i++) {
        var x = 0;
        var y = 0;
        var contentWidth = 0;
        var contentHeight = 0;
        if ($(containerContent[i]).hasClass("w1")) {
            contentWidth = 1;
        } else {
            contentWidth = 2;
        }
        if ($(containerContent[i]).hasClass("h1")) {
            contentHeight = 1;
        } else {
            contentHeight = 2;
        }
        var isPlaced = false;
        var h = 0;
        while (!isPlaced) {
            addRowToGrid(contentHeight, grid, maxElementsPerRow, h);
            for (var w = 0; w < maxElementsPerRow; w++) {
                if (enoughWidth(w, contentWidth, grid, h) && enoughHeight(contentHeight, h, contentWidth, w, grid)) {
                    x = w;
                    y = h;
                    isPlaced = true;
                    for (var gh = h; gh < h + contentHeight; gh++) {
                        for (var gw = w; gw < w + contentWidth; gw++) {
                            grid[gh][gw] = 1;
                        }
                    }
                    break;
                }
            }
            h++;
        }
        $(containerContent[i]).css("top", baseContentWidth * y);
        $(containerContent[i]).css("left", baseContentWidth * x);
    }
}

function addRowToGrid(contentHeight, grid, maxElementsPerRow, height) {
    for (var h = 0 + height; h < contentHeight + height; h++) {
        if (grid[h] == null) {
            addRow(grid, maxElementsPerRow);
        }
    }
}

function addRow(grid, elements) {
    var array = new Array();
    for (var i = 0; i < elements; i++) {
        array.push(0);
    }
    grid.push(array);
}

function enoughWidth(width, contentWidth, grid, height) {
    for (var ew = width; ew < width + contentWidth; ew++) {
        if (grid[height][ew] == null || grid[height][ew]) {
            return false;
        }
    }
    return true;
}

function enoughHeight(contentHeight, height, contentWidth, width, grid) {
    if (contentHeight < 2) {
        return true;
    }
    for (var ew = width; ew < width + contentWidth; ew++) {
        if (grid[height + 1][ew]) {
            return false
        }
    }
    return true
}

