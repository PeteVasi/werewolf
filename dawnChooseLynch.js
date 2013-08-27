ww.dawnChooseLynch = {};

$(function() {

    ww.dawnChooseLynch.showPlayerLynchList = function() {
        var players = wwhtml.getLivingPlayerRadioList("Who is it to be?", "lynchPlayerName", "lynchPlayerRadioList");
        $("#lynchPlayerList").html(players);
        $("#lynchPlayerListDiv").trigger("create");
    };

    $("#lynchNow").click(function() {
        var lynchIndex = $('input[name=lynchPlayerRadioList]:checked').val();
        wwgame.players[lynchIndex].alive = false;

        ww.lynchRevealScreen.showLynchedPlayer(wwgame.players[lynchIndex]);

        changeScreens("#lynchRevealScreen");
    });

});
