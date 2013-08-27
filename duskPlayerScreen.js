ww.duskPlayerScreen = {};

$(function() {

    ww.duskPlayerScreen.resetForNewDusk = function() {
        wwgame.maxNightActions = wwgame.getMaxNumberActionsForCurDay();
        wwgame.wolfSuggestList = [];
    };

    ww.duskPlayerScreen.setupCurrentPlayerActions = function() {
        var curPlayer = wwgame.players[wwgame.curPlayer];
        var curRole = curPlayer.role.role;
        var wolves = wwgame.getLivingWolvesList();

        // Setup name, role
        $("#duskPlayerName").html(curPlayer.name);
        $("#roleInfo").html("You are a <b>" + wwhtml.GetRoleAndAttributes(curPlayer.role) + "</b>");
        $("#duskPlayerBg").removeClass();
        $("#duskPlayerBg").addClass("centerAlign " + curRole.imgClass);

        // Show known info
        var instructions = '';
        if (curRole == ww.Roles.Werewolf) {
            if (wolves.length == 1) {
                instructions += "You are the only wolf.";
            }
            else {
                if (wolves.length == 2) {
                    instructions += "You are a wolf along with ";
                }
                else {
                    instructions += "Your fellow wolves are ";
                }
                var wolfNames = [];
                for (var i = 0; i < wolves.length; i++) {
                    if (wolves[i].index != curPlayer.index) {
                        wolfNames.push(wolves[i].name);
                    }
                }
                instructions += wwhtml.GetCommaSeparatedNamesList(wolfNames);
                instructions += ".<br />";
                if (wwgame.wolfSuggestList.length > 0) {
                    for (i = 0; i < wwgame.wolfSuggestList.length; i++) {
                        instructions += wwgame.players[wwgame.wolfSuggestList[i].player].name;
                        instructions += " suggests that you target ";
                        instructions += wwgame.players[wwgame.wolfSuggestList[i].suggests].name;
                        instructions += " for the kill.<br />;";
                    }
                }
            }
        }

        // Setup N0 views
        if (wwgame.curDay === 0 && curPlayer.role.n0) {
            var viewIndex = 0;
            if (curPlayer.role.n0 == ww.N0Actions.Random) {
                var randomAll = wwgame.getLivingPlayersList();
                shuffle(randomAll);
                if(randomAll[0].index == curPlayer.index) {
                    viewIndex = 1;
                }
                instructions += wwhtml.GetViewText(curPlayer, randomAll[viewIndex]);
            }
            else if (curPlayer.role.n0 == ww.N0Actions.RandomNegative) {
                var randomNeg = wwgame.getLivingNonRoleList(curPlayer.role.role.viewFor);
                shuffle(randomNeg);
                if(randomNeg[0].index == curPlayer.index) {
                    viewIndex = 1;
                }
                instructions += wwhtml.GetViewText(curPlayer, randomNeg[viewIndex]);
            }
        }
        $("#roleInstructions").html(instructions);

        if (wwgame.maxNightActions === 0) {
            $("#roleActions").html('');
        }
        else {
            var nightActionButtonText = "Suspect";
            var nightActionCaption = "Who is the most suspicious?";
            var isSuspectOnly = true;
            var isKillSuggestOnly = false;

            if (curRole == ww.Roles.Werewolf) {
                if(wwgame.curDay === 0 && curPlayer.role.n0 !== ww.N0Actions.Kill) {
                    nightActionButtonText = "Ponder";
                    nightActionCaption = "Who looks the most tasty?";
                }
                else if (wolves[wolves.length-1].index != curPlayer.index) {
                    nightActionButtonText = "Suggest Kill";
                    nightActionCaption = "Who would you like to kill?";
                    isKillSuggestOnly = true;
                    isSuspectOnly = false;
                }
                else {
                    nightActionButtonText = "Kill";
                    nightActionCaption = "Who would you like to kill?";
                    isSuspectOnly = false;
                }
            }
            else if(curRole.viewFor) {
                if(wwgame.curDay !== 0 || curPlayer.role.n0 == ww.N0Actions.ChooseView) {
                    nightActionButtonText = "View";
                    nightActionCaption = "Who would you like to view?";
                    isSuspectOnly = false;
                }
            }

            var roleAction = '<fieldset id="targetPlayerList" data-theme="a" data-role="controlgroup">';
            roleAction += wwhtml.getLivingPlayerRadioList(nightActionCaption, "targetPlayerName", "targetPlayerRadioList");
            roleAction += '</fieldset>';
            roleAction += '<button id="doRoleAction" data-theme="a">' + nightActionButtonText + '</button>';
            $("#roleActions").html(roleAction);
            $("#roleActions").trigger("create");

            $("#doRoleAction").click(function() {
                if (isSuspectOnly) {
                    $("#roleActions").html("So noted.");
                }
                else {
                    var chosenPlayerIndex = $('input[name=targetPlayerRadioList]:checked').val();
                    if (curRole.viewFor) {
                        var viewText = wwhtml.GetViewText(curPlayer, wwgame.players[chosenPlayerIndex]);
                        $("#roleActions").html(viewText);
                    }
                    else if (curRole == ww.Roles.Werewolf) {
                        if (isKillSuggestOnly) {
                            wwgame.wolfSuggestList.push({player:curPlayer.index,suggests:chosenPlayerIndex});
                            $("#roleActions").html(wwgame.players[chosenPlayerIndex].name + " will be suggested as the target.");
                        }
                        else {
                            wwgame.nkPlayerIndex = chosenPlayerIndex;
                            $("#roleActions").html(wwgame.players[chosenPlayerIndex].name + " will not survive the night.");
                        }
                    }
                }
                return false;
            });
        }
    };

    $("#nextPlayerButton").click(function() {
        // Setup next player on lock screen
        wwgame.curPlayer = wwgame.getNextLivingPlayerIndex(wwgame.curPlayer);
        if (wwgame.curPlayer >= 0 && wwgame.curPlayer < wwgame.numPlayers) {
            ww.duskLockedScreen.showCurrentPlayer();
            // Could clear role info pre-animation, though looks funny
            //$("#duskPlayerName").html(" ");
            //$("#roleInfo").html(" ");
            //$("#roleInstructions").html(" ");
            ww.duskBlankLockedScreen.nextPage = "#duskLockedScreen";
            changeScreens("#duskBlankLockedScreen", "flip");
        }
        else {
            ww.dawnPlayScreen.showNightActions();
            ww.duskBlankLockedScreen.nextPage = "#dawnPlayScreen";
            changeScreens("#duskBlankLockedScreen", "flip");
        }
        return false;
    });

});
