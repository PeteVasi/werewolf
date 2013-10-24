var wwgame = {};

(function() {

    wwgame.numPlayers = 0;

    wwgame.rolesetIndex = 0;
    wwgame.roleset = null;
    wwgame.players = [];

    wwgame.curPlayer = 0;
    wwgame.curDay = 0;

    wwgame.nkPlayerIndex = -1;

    wwgame.maxNightActions = 0;
    wwgame.wolfSuggestList = [];

    wwgame.saveState = function() {
        var curPage = '#titleScreen';
        if ($.mobile.activePage &&
                $.mobile.activePage.length > 0 &&
                $.mobile.activePage[0].id) {
            curPage = '#' + $.mobile.activePage[0].id;
        }
        if (curPage == "#duskPlayerScreen") {
            // If we jump back to a player, start at the lock
            curPage = "#duskLockedScreen";
        }

        var savePlayers = [];
        for(var i=0; i<wwgame.players.length; i++) {
            savePlayers[i] = { name: wwgame.players[i].name };
        }

        // Public versions released:
        // 2
        var saveData = JSON.stringify({
            version: 2,
            curPage: curPage,
            numPlayers: wwgame.numPlayers,
            rolesetIndex: wwgame.rolesetIndex,
            players: savePlayers});

        localStorage.setItem("wwsave", saveData);
    };

    wwgame.loadState = function() {
        var saveData = JSON.parse(localStorage.getItem("wwsave"));
        var curPage = '#titleScreen';
        if(saveData && saveData.version == 2) {
            wwgame.numPlayers = saveData.numPlayers;
            if(saveData.rolesetIndex >= 0 && ww.Rolesets.length > saveData.rolesetIndex) {
                wwgame.rolesetIndex = saveData.rolesetIndex;
                wwgame.roleset = ww.Rolesets[wwgame.rolesetIndex];
            }
            for (var i=0; i<saveData.players.length; i++) {
                wwgame.players[i] = { name: saveData.players[i].name };
            }
        }
        return curPage;
    };

    wwgame.getFirstLivingPlayerIndex = function() {
        return wwgame.getNextLivingPlayerIndex(-1);
    };

    wwgame.getNextLivingPlayerIndex = function(currentIndex) {
        var firstIndex = -1;
        for (var i = (currentIndex + 1); i < wwgame.numPlayers; i++) {
            if (wwgame.players[i].alive) {
                firstIndex = i;
                break;
            }
        }
        return firstIndex;
    };

    wwgame.getMaxNumberActionsForCurDay = function() {
        var max = 0;
        // TODO: PV: If no-reveal game, always show the max of everyone, since no one should know
        var listLiving = wwgame.getLivingPlayersList();
        for (var i = 0; i < listLiving.length; i++) {
            if (wwgame.curDay === 0) {
                if (listLiving[i].role.n0 == ww.N0Actions.Kill ||
                    listLiving[i].role.n0 == ww.N0Actions.ChooseView) {
                    max = (max < 1) ? 1 : max;
                }
            }
            else {
                var nightActions = listLiving[i].role.role.nightActionReq;
                max = (max < nightActions) ? nightActions : max;
            }
        }
        return max;
    };

    wwgame.makeListWherePlayerMatches = function(matchfn) {
        var playerList = [];
        for (var i = 0; i < wwgame.numPlayers; i++) {
            if (matchfn(wwgame.players[i])) {
                playerList.push(wwgame.players[i]);
            }
        }
        return playerList;
    };

    wwgame.getLivingPlayersList = function() {
        return wwgame.makeListWherePlayerMatches(function(p) { return p.alive; });
    };

    wwgame.getLivingWolvesList = function() {
        return wwgame.makeListWherePlayerMatches(function(p) { return p.alive && p.role.role == ww.Roles.Werewolf; });
    };

    wwgame.getLivingNonWolvesList = function() {
        return wwgame.makeListWherePlayerMatches(function(p) { return p.alive && p.role.role != ww.Roles.Werewolf; });
    };

    wwgame.getLivingNonRoleList = function(notThisRole) {
        return wwgame.makeListWherePlayerMatches(function(p) { return p.alive && p.role.role != notThisRole; });
    };

    wwgame.getFullEvilTeam = function() {
        return wwgame.makeListWherePlayerMatches(function(p) { return p.role.role.team == "Evil"; });
    };

    wwgame.getFullGoodTeam = function() {
        return wwgame.makeListWherePlayerMatches(function(p) { return p.role.role.team == "Good"; });
    };

    // Returns false on not game over, returns { evilWins: bool, text: "Parity has been reached." } on done
    wwgame.getGameOver = function() {
        var gameOver = false;

        var wolves = wwgame.getLivingWolvesList();
        if (wolves.length === 0) {
            gameOver = {evilWins:false, text:"All wolves have been killed."};
        }
        else {
            var nonWolves = wwgame.getLivingNonWolvesList();
            if (wolves.length >= nonWolves.length) {
                var allHunters = true;
                for (var i = 0; i < nonWolves.length; i++) {
                    if(nonWolves[i].role.role != ww.Roles.Hunter) {
                        allHunters = false;
                        break;
                    }
                }
                if(allHunters) {
                    if(nonWolves.length == 1) {
                        gameOver = {evilWins:false, text:"Parity has been reached, the hunter rises up to kill the final wolf."};
                    }
                    else {
                        gameOver = {evilWins:false, text:"Parity has been reached, the hunters rise up to kill the final wolves."};
                    }
                }
                else {
                    gameOver = {evilWins:true, text:"Parity has been reached, the wolves consume the village."};
                }
            }
        }
        return gameOver;
    };

})();
