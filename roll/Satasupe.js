"use strict";
const {
    DynamicLoader
} = require('bcdice');

async function calldice(gameType, message) {
    const loader = new DynamicLoader();
    const GameSystem = await loader.dynamicLoad(gameType);
    const result = GameSystem.eval(message);
    return (result && result.text) ? result.text : null;
}
async function callHelp(gameType) {
    const loader = new DynamicLoader();
    const GameSystem = await loader.dynamicLoad(gameType);
    const result = GameSystem.HELP_MESSAGE;
    return result;
}
var variables = {};
var gameName = function () {
    return '【亞俠必死的冒險】 .ss (nR>=x[y,z,c] SRx+y FumbleT)'
}

var gameType = function () {
    return 'Dice:Satasupe:hktrpg'
}
var prefixs = function () {
    return [{
        first: /^[.]ss$/i,
        second: null
    }]
}
var getHelpMessage = async function () {
    return '【亞俠必死的冒險】\n' + await callHelp("Satasupe");;
}
var initialize = function () {
    return variables;
}

var rollDiceCommand = async function ({
    mainMsg
}) {
    let rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    let result = '';
    switch (true) {
        case /^help$/i.test(mainMsg[1]) || !mainMsg[1]:
            rply.text = '【亞俠必死的冒險】\n' + await callHelp("Satasupe");
            return rply;
        default:
            result = await calldice("Satasupe", mainMsg[1]);
            (result) ? rply.text = `${mainMsg[1]} ${(mainMsg[2]) ? mainMsg[2] : ''}\n${result}` : null;
            return rply;
    }
}


module.exports = {
    rollDiceCommand: rollDiceCommand,
    initialize: initialize,
    getHelpMessage: getHelpMessage,
    prefixs: prefixs,
    gameType: gameType,
    gameName: gameName
};