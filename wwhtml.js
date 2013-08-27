var wwhtml = {};

(function() {

    wwhtml.getLivingPlayerRadioList = function(caption, idPrefix, radioGroupName) {
        var listLiving = wwgame.getLivingPlayersList();

        var players = "<legend>" + caption + "</legend>";
        for (var i = 0; i < listLiving.length; i++) {
            players += '<input type="radio" data-theme="a" id="' + idPrefix + i;
            players += '" name="' + radioGroupName + '" value="' + listLiving[i].index;
            players += '" />';
            players += '<label for="' + idPrefix + i + '">';
            players += listLiving[i].name;
            players += '</label>';
        }

        return players;
    };

    wwhtml.getDeathText = function(deadPlayer) {
        var playerInfo = "";
        playerInfo += "<h2>" + deadPlayer.name + "</h2><br />";
        if (wwgame.roleset.reveal == ww.DeathReveal.Full) {
            playerInfo += "who was a:<br />";
            playerInfo += "<h3>" + wwhtml.GetRoleAndAttributes(deadPlayer.role, true) + "</h3>";
        }
        else if (wwgame.roleset.reveal == ww.DeathReveal.Role) {
            playerInfo += "who was a:<br />";
            playerInfo += "<h3>" + deadPlayer.role.role.desc + "</h3>";
        }
        else if (wwgame.roleset.reveal == ww.DeathReveal.Team) {
            playerInfo += "who was a member of team:<br />";
            playerInfo += "<h3>" + deadPlayer.role.role.team + "</h3>";
        }
        return playerInfo;
    };

    wwhtml.GetViewText = function(curPlayer, viewedPlayer) {
        var viewedText = viewedPlayer.name;
        var viewFor = "";
        var gotHit = false;
        var i = 0;
        
        // Check roles and actual hit.
        if (curPlayer.role.role == ww.Roles.Seer) {
            viewFor = "a wolf";
            if (viewedPlayer.role.role == ww.Roles.Werewolf) {
                gotHit = true;
            }
        }
        else if(curPlayer.role.role == ww.Roles.Sorcerer) {
            viewFor = "a seer";
            if (viewedPlayer.role.role == ww.Roles.Seer) {
                gotHit = true;
            }
        }
        
        // Check viewer attributes that mess with stuff
        if (curPlayer.role.attributes) {
            for (i=0; i<curPlayer.role.attributes.length; i++) {
                if (curPlayer.role.attributes[i] == ww.Attributes.Insane) {
                    gotHit = gotHit ? false : true;
                }
                else if (curPlayer.role.attributes[i] == ww.Attributes.Paranoid) {
                    gotHit = true;
                }
                else if (curPlayer.role.attributes[i] == ww.Attributes.Naive) {
                    gotHit = false;
                }
            }
        }

        // Check viewee attributes that mess with stuff
        if (viewedPlayer.role.attributes) {
            for (i=0; i<viewedPlayer.role.attributes.length; i++) {
                if (viewedPlayer.role.attributes[i] == ww.Attributes.Tinker) {
                    gotHit = gotHit ? false : true;
                }
            }
        }
        
        // Build text
        viewedText += gotHit ? " IS " : " is NOT ";
        viewedText += viewFor;
        viewedText += ".";
        
        return viewedText;
    };
    
    wwhtml.GetCommaSeparatedNamesList = function(namesList) {
        var text = "";
        for (var i=0; i<namesList.length; i++) {
            text += namesList[i];
            if (i < namesList.length - 1) {
                if (namesList.length == 2) {
                    text += " ";
                }
                else {
                    text += ", ";
                }
            }
            if (i == namesList.length - 2) {
                text += "and ";
            }
        }
        return text;
    };
    
    wwhtml.GetRoleAndAttributes = function(playerRole, forceShowAttributes) {
        var text = "";
        if ((forceShowAttributes || playerRole.knownAttributes) && playerRole.attributes) {
            for (var i=0; i<playerRole.attributes.length; i++) {
                text += playerRole.attributes[i].name + " ";
            }
        }
        text += playerRole.role.desc;
        return text;
    };

})();
