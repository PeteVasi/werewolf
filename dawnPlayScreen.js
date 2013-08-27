ww.dawnPlayScreen = {};

$(function() {

    ww.dawnPlayScreen.showNightActions = function() {
        var dawnReveal = "";
        if(wwgame.nkPlayerIndex >= 0 && wwgame.nkPlayerIndex < wwgame.numPlayers) {
            wwgame.players[wwgame.nkPlayerIndex].alive = false;
            dawnReveal = "A player has been found dead in the night!<br />";
            dawnReveal += wwhtml.getDeathText(wwgame.players[wwgame.nkPlayerIndex]);
        }
        else {
            dawnReveal = "The night passes quietly.  No one has died.";
        }
        $("#dawnRevealNightActions").html(dawnReveal);
    };

    $("#lynchContinue").click(function() {
        // Check for end of game via NK
        var gameOver = wwgame.getGameOver();
        if (gameOver) {
            // Done!
            ww.gameOverScreen.showGameOver(gameOver);
            changeScreens("#gameOverScreen");
        }
        else {
            // And a new day dawns.
            wwgame.curDay++;
            ww.dawnChooseLynch.showPlayerLynchList();
            changeScreens("#dawnChooseLynch");
        }
    });

});
