module.exports = {
    run: function(creep, roomName) {
        // flag name - E78N18:backupContainer:E78N18
        // backup containers ir tas pats kas room controllers container!
        var backupContainerFlag = Game.flags[roomName + ':' + 'backupContainer' + ':' + roomName];
        creep.say('xxx');
        if (creep.carry.energy == 0) {
            var targetLinkFlag = Game.flags[roomName + ':' + 'targetLink' + ':' + roomName];

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
            else {
                var storage = creep.room.storage;

                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('withdraw');
                    creep.moveTo(storage);
                }
            }
        }
        else if (creep.carryCapacity == creep.carryCapacity) {
            var pos = backupContainerFlag.pos;

            var container = pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (_.sum(container.store) < 1000) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('transfer');
                    creep.moveTo(backupContainerFlag);
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