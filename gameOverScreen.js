ww.gameOverScreen = {};

$(function() {

    ww.gameOverScreen.showGameOver = function(gameOver) {
        var gameOverText = '';
        if (gameOver.evilWins) {
            gameOverText += "<h2>Evil Wins!</h2><br />";
        }
        else {
            gameOverText += "<h2>Good Wins!</h2><br />";
        }
        gameOverText += gameOver.text;
        gameOverText += "<br /><br /><h3>Team Evil:</h3>";
        var evilTeam = wwgame.getFullEvilTeam();
        for (var i = 0; i < evilTeam.length; i++) {
            gameOverText += evilTeam[i].name + " - " + wwhtml.GetRoleAndAttributes(evilTeam[i].role, true);
            if (!evilTeam[i].alive) gameOverText += " (dead)";
            gameOverText += "<br />";
        }
        gameOverText += "<br /><h3>Team Good:</h3>";
        var goodTeam = wwgame.getFullGoodTeam();
        for (i = 0; i < goodTeam.length; i++) {
            gameOverText += goodTeam[i].name + " - " + wwhtml.GetRoleAndAttributes(goodTeam[i].role, true);
            if (!goodTeam[i].alive) gameOverText += " (dead)";
            gameOverText += "<br />";
        }

        $("#gameOverText").html(gameOverText);
    };

    $("#gameOverMainMenu").click(function() {
        changeScreens("#titleScreen", "slide", true);
    });

});
