module.exports = {
    run: function(creep) {
        var explorerFlag = Game.flags[creep.memory.targetRoom + ':ExploreRoom:' + creep.memory.homeRoom];
        var homeFlag = Game.flags[creep.memory.homeRoom + ':Home:' + creep.memory.homeRoom];
        var containerFlag = Game.flags[creep.memory.homeRoom + ':Container:' + creep.memory.targetRoom];

        if(explorerFlag){
            if(creep.room == explorerFlag.room) {
                if (creep.carry.energy == creep.carryCapacity) {
                    creep.moveTo(homeFlag);
                }
                else {
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });

                    if (container != undefined) {
                        creep.say('withdraw');
                        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    }
                }
            }
            else if (creep.room == homeFlag.room && creep.carry.energy == creep.carryCapacity) {
                if (creep.moveTo(containerFlag) == 0) {
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER &&
                                     s.store[RESOURCE_ENERGY] != 2000
                    });

                    if (container != undefined) {
                        creep.say('transfer');
                        if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                        else {
                            creep.say('fill storage');
                            var storage = creep.room.storage;

                            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage);
                            }
                        }
                    }
                }
                else {
                    creep.moveTo(containerFlag);
                }
            }
            else {
                creep.moveTo(explorerFlag)
            }
        } else {
            creep.moveTo(homeFlag);
        }
    }
};