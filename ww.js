var ww = {};

(function(){

    ww.Roles = {
        Villager: {desc:"Villager", nightActionReq:0, team:"Good", imgClass:"bgRoleVillager"},
        Werewolf: {desc:"Werewolf", nightActionReq:1, team:"Evil", imgClass:"bgRoleWerewolf"},
        Seer: {desc:"Seer", nightActionReq:1, team:"Good", imgClass:"bgRoleSeer"},
        Hunter: {desc:"Hunter", nightActionReq:0, team:"Good", imgClass:"bgRoleHunter"},
        Sorcerer: {desc:"Sorcerer", nightActionReq:1, team:"Evil", imgClass:"bgRoleSorceror"},
        Traitor: {desc:"Traitor", nightActionReq:0, team:"Evil", imgClass:"bgRoleSorceror"},
        Martyr: {desc:"Martyr", nightActionReq:1, team:"Good", imgClass:"bgRoleVillager"}
    };
    ww.Roles.Seer.viewFor = ww.Roles.Werewolf;
    ww.Roles.Sorcerer.viewFor = ww.Roles.Seer;

    ww.Attributes = {
        Brutal: {name:"Brutal", desc:"Choose someone to die when you die."},
        Tough: {name:"Tough", desc:"Survive the first kill attempt."},
        Cultist: {name:"Cultist", desc:"Know who all of the wolves are."},
        Minion: {name:"Minion", desc:"Know who all of the evils are."},
        Mason: {name:"Mason", desc:"Know the other Masons."},
        Insane: {name:"Insane", desc:"Always receives opposite views."},
        Paranoid: {name:"Paranoid", desc:"Always receives a positive view."},
        Naive: {name:"Naive", desc:"Always receives a negative view."},
        Tinker: {name:"Tinker", desc:"Reverses the view when getting viewed."}
    };
    
    ww.N0Actions = {
        Kill: {desc:"Kills a player N0."},
        ChooseView: {desc:"Chooses a player to view N0."},
        RandomNegative: {desc:"Gets a random negative N0."},
        Random: {desc:"Gets a random N0."}
    };

    ww.DeathReveal = {
        None: {desc:"Nothing is revealed on death."},
        Team: {desc:"Only a player's team is revealed on death."},
        Role: {desc:"Role but no attributes are revealed on death."},
        Full: {desc:"Full role and attributes are revealed on death."}
    };

    ww.Rolesets = [
        {name:"Basic 5 player",
            desc:"A simple 5-player game with a single seer and a single werewolf.",
            players: 5,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 3}
            ]
        },
        {name:"Must lynch",
            desc:"Two wolves and a seer with a first chosen view make the claims come fast.  Can you find them both?",
            players: 5,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Villager, count: 2}
            ]
        },
        {name:"Fiver",
            desc:"1 wolf, 1 sorcerer, 1 seer, 1 hunter, 1 villager.  Choose your views the first night, no reveal on death.",
            players: 5,
            reveal: ww.DeathReveal.None,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Villager, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Five Seers",
            desc:"All five players are seers.  One of them, not as much.  Choose your views the first night, role reveal on death.",
            players: 5,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 6 player",
            desc:"A simple 6-player game with a single seer and a single werewolf.",
            players: 6,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 4}
            ]
        },
        {name:"Six Seers",
            desc:"Six seers.  Or they claim to be.  Choose your views the first night, no reveal on death.",
            players: 6,
            reveal: ww.DeathReveal.None,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 7 player",
            desc:"A simple 7-player game with a single seer and a single werewolf.",
            players: 7,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 5}
            ]
        },
        {name:"Simple 7 player",
            desc:"A simple 7-player game.",
            players: 7,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 3},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Seven Seers",
            desc:"Seven seers.  Or they claim to be.  Choose your views the first night, no reveal on death.",
            players: 7,
            reveal: ww.DeathReveal.None,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Seven Seers Tinker",
            desc:"Seven seers.  Or they claim to be.  Choose your views the first night, role reveal on death.",
            players: 7,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive, ww.Attributes.Tinker], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 8 player",
            desc:"A simple 8-player game with a single seer and a single werewolf.",
            players: 8,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 6}
            ]
        },
        {name:"Simple 8 player",
            desc:"A simple 8-player game.",
            players: 8,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 4},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Valley of the Seers",
            desc:"So many seers, but who is true?  Choose your views the first night, no reveal on death.",
            players: 8,
            reveal: ww.DeathReveal.None,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Villager, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Valley of the Seers Tinker",
            desc:"So many seers, but who is true?  Choose your views the first night, no reveal on death.",
            players: 8,
            reveal: ww.DeathReveal.None,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Villager, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive, ww.Attributes.Tinker], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 9 player",
            desc:"A simple 9-player game with a single seer and two werewolves.",
            players: 9,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 6}
            ]
        },
        {name:"Simple 9 player",
            desc:"A simple 9-player game.",
            players: 9,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 5},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Valley of the Seers",
            desc:"So many seers, but who is true?  Choose your views the first night, no reveal on death.",
            players: 9,
            reveal: ww.DeathReveal.None,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Hunter, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Valley of the Seers Tinker",
            desc:"So many seers, but who is true?  Choose your views the first night, role reveal on death.",
            players: 9,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Hunter, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive, ww.Attributes.Tinker], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 10 player",
            desc:"A simple 10-player game with a single seer and two werewolves.",
            players: 10,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 7}
            ]
        },
        {name:"Simple 10 player",
            desc:"A simple 10-player game.",
            players: 10,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 6},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Valley of the Seers",
            desc:"So many seers, but who is true?  Choose your views the first night, no reveal on death.",
            players: 10,
            reveal: ww.DeathReveal.None,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Villager, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Valley of the Seers Tinker",
            desc:"So many seers, but who is true?  Choose your views the first night, role reveal on death.",
            players: 10,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Villager, count: 2},
                {role:ww.Roles.Villager, attributes: [ww.Attributes.Tinker], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 11 player",
            desc:"A simple 11-player game with a single seer and two werewolves.",
            players: 11,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 8}
            ]
        },
        {name:"Simple 11 player",
            desc:"A simple 11-player game.",
            players: 11,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 6},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Valley of the Seers",
            desc:"So many seers, but who is true?  Choose your views the first night, role reveal on death.",
            players: 11,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Villager, count: 2},
                {role:ww.Roles.Hunter, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Valley of the Seers Tinker",
            desc:"So many seers, but who is true?  Choose your views the first night, role reveal on death.",
            players: 11,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Villager, count: 2},
                {role:ww.Roles.Villager, attributes: [ww.Attributes.Tinker], knownAttributes: false, count: 1},
                {role:ww.Roles.Hunter, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 12 player",
            desc:"A simple 12-player game with a single seer and two werewolves.",
            players: 12,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 9}
            ]
        },
        {name:"Simple 12 player",
            desc:"A simple 12-player game.",
            players: 12,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 7},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Valley of the Seers",
            desc:"So many seers, but who is true?  Choose your views the first night, role reveal on death.",
            players: 12,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 2},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Villager, count: 3},
                {role:ww.Roles.Hunter, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 13 player",
            desc:"A simple 13-player game with a single seer and three werewolves.",
            players: 13,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 3},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 9}
            ]
        },
        {name:"Simple 13 player",
            desc:"A simple 13-player game.",
            players: 13,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 3},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 7},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Valley of the Seers",
            desc:"So many seers, but who is true?  Choose your views the first night, role reveal on death.",
            players: 13,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 3},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Villager, count: 3},
                {role:ww.Roles.Hunter, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 14 player",
            desc:"A simple 14-player game with a single seer and three werewolves.",
            players: 14,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 3},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 10}
            ]
        },
        {name:"Simple 14 player",
            desc:"A simple 14-player game.",
            players: 14,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 3},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 8},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Valley of the Seers",
            desc:"So many seers, but who is true?  Choose your views the first night, role reveal on death.",
            players: 14,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 3},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Villager, count: 4},
                {role:ww.Roles.Hunter, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        },
        {name:"Basic 15 player",
            desc:"A simple 15-player game with a single seer and three werewolves.",
            players: 15,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 3},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 11}
            ]
        },
        {name:"Simple 15 player",
            desc:"A simple 15-player game.",
            players: 15,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 3},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 9},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Hunter, count: 1}
            ]
        },
        {name:"Valley of the Seers",
            desc:"So many seers, but who is true?  Choose your views the first night, role reveal on death.",
            players: 15,
            reveal: ww.DeathReveal.Role,
            roles: [
                {role:ww.Roles.Werewolf, count: 3},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Sorcerer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1},
                {role:ww.Roles.Villager, count: 4},
                {role:ww.Roles.Hunter, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Insane], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Paranoid], knownAttributes: false, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.ChooseView, attributes: [ww.Attributes.Naive], knownAttributes: false, count: 1}
            ]
        }
    ];

})();
