module.exports = {
    run: function(creep) {
        if (creep.room.name == creep.memory.homeRoom) {
            if (creep.carry.energy > 0) {
                let building = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < 1200) ||
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
            } else {
                var exit = creep.room.findExitTo(creep.memory.targetRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        } else if (creep.room.name == creep.memory.targetRoom) {
            if (creep.carry.energy == creep.carryCapacity) {
                var exit = creep.room.findExitTo(creep.memory.homeRoom);
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
            else {
                let energyOnFloor = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                    filter: s => s.energy > 100
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
    }
};