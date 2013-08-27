ww.duskLockedScreen = {};

$(function() {

    ww.duskLockedScreen.resetToFirstPlayer = function() {
        // Reset all the data to start the night cycle all over again
        wwgame.curPlayer = wwgame.getFirstLivingPlayerIndex();
        wwgame.nkPlayerIndex = -1;
        ww.duskPlayerScreen.resetForNewDusk();
    };

    ww.duskLockedScreen.showCurrentPlayer = function() {
        $("#lockName").html(wwgame.players[wwgame.curPlayer].name);
    };

    function checkUnlockState() {
        if ($("#unlockButton1").is(':checked') && $("#unlockButton2").is(':checked')) {
            ww.duskPlayerScreen.setupCurrentPlayerActions();
            setTimeout(function() {
                changeScreens("#duskPlayerScreen", "flip");
                $("#unlockButton1").removeAttr("checked").checkboxradio("refresh");
                $("#unlockButton2").removeAttr("checked").checkboxradio("refresh");
            }, 200);
        }
    }

    $("#unlockButton1").click(function() {
        checkUnlockState();
    });

    $("#unlockButton2").click(function() {
        checkUnlockState();
    });

});
