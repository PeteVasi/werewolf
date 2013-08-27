ww.lynchRevealScreen = {};

$(function() {

    ww.lynchRevealScreen.showLynchedPlayer = function(lynchPlayer) {
        $("#lynchRevealText").html(wwhtml.getDeathText(lynchPlayer));
    };

    $("#lynchRevealContinue").click(function() {
        var gameOver = wwgame.getGameOver();

        if (gameOver) {
            // Done!
            ww.gameOverScreen.showGameOver(gameOver);
            changeScreens("#gameOverScreen");
        }
        else {
            // Setup the first player's lock screen, game continues...
            ww.duskLockedScreen.resetToFirstPlayer();
            ww.duskLockedScreen.showCurrentPlayer();

            changeScreens("#duskLockedScreen");
        }
    });

});
