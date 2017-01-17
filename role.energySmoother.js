module.exports = {
    run: function(creep, roomName) {
        if (creep.carry.energy == 0) {
            /*var targetLinkFlag = Game.flags[roomName + ':' + 'targetLink' + ':' + roomName];

            if (targetLinkFlag != undefined) {
                var targetLink = targetLinkFlag.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => (s.structureType == STRUCTURE_LINK && s.energy != 0)
                });
            }

            if (targetLink != undefined) {
                if (creep.withdraw(targetLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('withdraw');
                    creep.moveTo(targetLink);
                }
            }
            else {*/
            var storage = creep.room.storage;

            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('withdraw');
                creep.moveTo(storage);
            }
            //}
        }
        else if (creep.carryCapacity == creep.carryCapacity) {
            var roomController = creep.room.controller;

            let container = roomController.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            })[0];

            if (_.sum(container.store) < 1000) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('transfer');
                    creep.moveTo(container);
                }
            }
            else {
                var spawnAndExtensions = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN     ||
                                    s.structureType == STRUCTURE_EXTENSION) &&
                                    s.energy < s.energyCapacity
                });

                if (spawnAndExtensions != undefined) {
                    if (creep.transfer(spawnAndExtensions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawnAndExtensions);
                    }
                }
            }
        }
    }
};