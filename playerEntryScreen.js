ww.playerEntryScreen = {};

$(function() {

    ww.playerEntryScreen.createLineForEachPlayer = function()
    {
        var players = "";
        for (var i = 0; i < wwgame.numPlayers; i++) {
            players += '<label for="playerName' + i + '" />';
            players += '<input type="text" id="playerName' + i;
            players += '" name="playerName' + i;
            players += '" value="';
            if(i < wwgame.players.length) {
                players += wwgame.players[i].name;
            }
            else {
                players += 'Player' + (i + 1);
            }
            players += '" data-theme="a" />';
        }
        $("#playerList").html(players).trigger("create");
    };

    $("#entryPlayButton").click(function() {
        var i = 0;
        // Extract all the names
        for (i = 0; i < wwgame.numPlayers; i++) {
            wwgame.players[i] = { name: $("#playerName" + i).val() };
        }
        // Extract and randomize the roles
        var randomRoles = [];
        for (i = 0; i < wwgame.roleset.roles.length; i++) {
            for (var j = 0; j < wwgame.roleset.roles[i].count; j++) {
                randomRoles.push(wwgame.roleset.roles[i]);
            }
        }
        shuffle(randomRoles);
        // Then hand them out
        for (i = 0; i < wwgame.numPlayers; i++) {
            wwgame.players[i].role = randomRoles[i];
            wwgame.players[i].alive = true;
            wwgame.players[i].index = i;
        }

        // Reset to a new game
        wwgame.curDay = 0;

        // Setup the first player's lock screen
        ww.duskLockedScreen.resetToFirstPlayer();
        ww.duskLockedScreen.showCurrentPlayer();

        changeScreens("#duskLockedScreen");
        return false;
    });

    $("#entryReturnButton").click(function() {
        changeScreens("#titleScreen", "slide", true);
        return false;
    });

});