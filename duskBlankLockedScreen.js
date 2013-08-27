ww.duskBlankLockedScreen = {};

$(function() {

    ww.duskBlankLockedScreen.nextPage = "#duskLockedScreen";
    
    $(document).delegate('#duskBlankLockedScreen', 'pageshow', function() {
        // `this` refers to the `#duskBlankLockedScreen` element
        changeScreens(ww.duskBlankLockedScreen.nextPage);
    });

});
