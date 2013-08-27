// Array shuffle function
function shuffle(array) {
    var tmp, current, top = array.length;

    // Attempt a pseudo-seed here to change the randomness a little bit.
    // See if this helps those Android phones
    var seedLen = (new Date()).getTime() % 50;
    for (current=0; current<seedLen; current++) {
        tmp = Math.random();
    }
    
    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}

// Swap one screen for another
function changeScreens(destPage, animation, animReverse) {
    var options = { changeHash: false };
    if(animation) {
        options.transition = animation;
    }
    if(animReverse) {
        options.reverse = true;
    }
    $.mobile.changePage(destPage, options);
    wwgame.saveState();
}
/*
// jQuery 1.7.1:
function changeScreens(curScreen, destScreen) {
    $(curScreen).hide("slide", {}, 300, function() {
        $(destScreen).show("slide", {}, 300);
    });
}
 */

/*
// Prolly not needed since I switched to $.mobile.changePage() page transitions
function changeScreens(curScreen, destScreen) {
    $(curScreen).hide();
    $(destScreen).show();
}
*/
