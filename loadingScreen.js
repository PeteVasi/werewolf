ww.loadingScreen = {};

$(function() {

    // Show that we're loading
    $.mobile.showPageLoadingMsg();
    
    // General setup
    $.mobile.defaultPageTransition = "slide";

    ww.loadingScreen.preloadImages = function(picture_urls, callback) {
        // http://stackoverflow.com/a/11274150
        var loaded = 0;
        var imgLoadHandler = function() {
                if(++loaded == picture_urls.length && callback) {
                    callback();
                }
            };
        for(var i = 0, j = picture_urls.length; i < j; i++) {
            var img = new Image();
            img.onload = imgLoadHandler;
            img.src = picture_urls[i];
        }
    };

    $(window).load(function() {
        // Called after all of the DOM and images are finished loading

        // Load up the images that we're not currently using so they're ready
        ww.loadingScreen.preloadImages(['images/moonbg.jpg',
                                        'images/roleLocked.png',
                                        'images/roleVillager.jpg',
                                        'images/roleSeer.jpg',
                                        'images/roleHunter.jpg',
                                        'images/roleSorceror.jpg',
                                        'images/roleWerewolf.jpg'],
                                       function() {
            var loadPage = wwgame.loadState();

            $.mobile.hidePageLoadingMsg();

            // Title Screen Setup
            ww.titleScreen.resetTitleScreen();

            //changeScreens(loadPage, "fade");
            changeScreens("#titleScreen", "fade"); // TODO: PV: Temp, until full state restore is working
        });
    });

});
