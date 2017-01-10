module.exports = {
    run: function(creep, roomName) {
        // flag name - E78N18:backupContainer:E78N18
        // backup containers ir tas pats kas room controllers container!
        var backupContainerFlag = Game.flags[roomName + ':' + 'backupContainer' + ':' + roomName];

        if (creep.carry.energy == 0) {
            var pos = backupContainerFlag.pos;

            var container = pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('withdraw');
                creep.moveTo(backupContainerFlag);
            }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.say('upgrade');
                creep.moveTo(creep.room.controller);
            }
        }
    }
};