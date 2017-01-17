module.exports = {
    run: function(creep) {
        var explorerFlag = Game.flags[creep.memory.targetRoom + ':ExploreRoom:' + creep.memory.homeRoom];
        var homeFlag = Game.flags[creep.memory.homeRoom + ':Home:' + creep.memory.homeRoom];
        var roomStorageFlag = Game.flags[creep.memory.homeRoom + ':Container:' + creep.memory.targetRoom];

        if(explorerFlag){
            if(creep.room == explorerFlag.room) {
                if (creep.carry.energy == creep.carryCapacity) {
                    creep.moveTo(homeFlag);
                }
                else {
                    let energyOnFloor = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                        filter: s => s.energy > 999999
                    });

                    if (energyOnFloor != undefined) {
                        if (creep.pickup(energyOnFloor, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(energyOnFloor);
                        }
                    }
                    else {
                        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: s => s.structureType == STRUCTURE_CONTAINER
                        });

                        creep.say('withdraw');
                        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    }
                }
            }
            else if (creep.room == homeFlag.room && creep.carry.energy > 0) {
                if (creep.moveTo(roomStorageFlag) == 0) {
                    let building = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER ||
                                     (s.structureType == STRUCTURE_LINK && s.energy != 800)
                    });

                    if (building != undefined) {
                        creep.say('transfer');
                        if (creep.transfer(building, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(building);
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
                    creep.moveTo(roomStorageFlag);
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