module.exports = {
    run: function(creep) {
        var harvestFlag = Game.flags['Source:Harvest:' + creep.memory.home_room]
        var homeFlag = Game.flags['Controller:Home:' + creep.memory.home_room]

        if(harvestFlag){
            if(creep.room == harvestFlag.room) {
                if (creep.carry.energy == creep.carryCapacity) {
                    var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

                    if (constructionSite != undefined) {
                        creep.say('build');
                        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(constructionSite);
                        }
                    }
                    else {
                        /*var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (s) => s.structureType != STRUCTURE_WALL &&
                                           s.structureType != STRUCTURE_RAMPART
                        });

                        if (structure != undefined) {
                            if (structure.hits < (structure.hitsMax / 2)) {
                                creep.say('repair');
                                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(structure);
                                }
                            }
                        }*/
                        //else {
                            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: s => s.structureType == STRUCTURE_CONTAINER
                            });

                            if (container != undefined) {
                                creep.say('transfer');
                                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(container);
                                }
                            }
                        //}
                    }
                }
                else {
                    var source = creep.pos.findClosestByPath(FIND_SOURCES);

                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.say('harvest');
                        creep.moveTo(source);
                    }
                }
            } else {
                creep.moveTo(harvestFlag)
            }
        } else {
            creep.moveTo(homeFlag);
        }
    }
};