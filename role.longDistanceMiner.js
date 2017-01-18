module.exports = {
    run: function(creep) {
        if (creep.room.name == creep.memory.homeRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        } else if (creep.room.name == creep.memory.targetRoom) {
            if (creep.carry.energy == creep.carryCapacity) {
                var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,{
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                });

                if (constructionSite == undefined) {
                    var damagedContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER &&
                                       s.hits < (s.hitsMax / 2)
                    });
                }

                if (constructionSite != undefined) {
                    creep.say('build');
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite);
                    }
                } else if (damagedContainer != undefined) {
                    creep.say('repair');
                    if (creep.repair(damagedContainer) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(damagedContainer);
                    }
                } else {
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });

                    if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.say('transfer');
                        creep.moveTo(container);
                    } else {
                        creep.say('dropAll');
                        for(var resourceType in creep.carry) {
                            creep.drop(resourceType);
                        }
                    }
                }
            } else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);

                let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                })[0];

                if (creep.pos.isEqualTo(container.pos)) {
                    // harvest source
                    creep.harvest(source);
                }
                else {
                    // move towards it
                    creep.moveTo(container);
                }
            }
        } else {
            var exit = creep.room.findExitTo(creep.memory.homeRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};