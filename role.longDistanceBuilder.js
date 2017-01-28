module.exports = {
    run: function(creep) {
        if (creep.room.name == creep.memory.homeRoom) {
            if (creep.carry.energy > 0) {
                let building = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < 1500) ||
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
            // if creep is bringing energy to a structure but has no energy left
            if (creep.memory.working == true && creep.carry.energy == 0) {
                // switch state
                creep.memory.working = false;
            }
            // if creep is harvesting energy but is full
            else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                // switch state
                creep.memory.working = true;
            }

            if (creep.memory.working == true) {
                var damagedBuildings = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (i) => (i.structureType != STRUCTURE_WALL || i.structureType != STRUCTURE_RAMPART) &&
                                   (i.hits < (i.hitsMax / 3))
                });

                if (damagedBuildings == undefined) {
                    var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                }

                if (damagedBuildings != undefined) {
                    creep.say('repair');
                    if (creep.repair(damagedBuildings) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(damagedBuildings);
                    }
                } else if (constructionSite != undefined) {
                    creep.say('build');
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite);
                    }
                } else {
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });

                    if (container != undefined && creep.carry.energy != creep.carryCapacity) {
                        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.say('withdraw');
                            creep.moveTo(container);
                        }
                    } else {
                        var exit = creep.room.findExitTo(creep.memory.homeRoom);
                        creep.moveTo(creep.pos.findClosestByRange(exit));
                    }
                }
            } else {
                let roomsContainer = creep.room.find(FIND_STRUCTURES, {filter: s => s.structureType == STRUCTURE_CONTAINER})[0];

                if (roomsContainer != undefined) {
                    if (creep.withdraw(roomsContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.say('withdraw');
                        creep.moveTo(roomsContainer);
                    }
                } else {
                    var source = creep.pos.findClosestByPath(FIND_SOURCES);
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        } else {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};