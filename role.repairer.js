module.exports = {
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);

            if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('harvest');
                creep.moveTo(energySourceFlag);
            }
        }
        else if (creep.carry.energy == creep.carryCapacity) {
            var damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType != STRUCTURE_WALL ||
                               i.structureType != STRUCTURE_RAMPART
            });

            if (damagedStructure == undefined) {
                var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            }

            if (damagedStructure != undefined) {
                if (creep.repair(damagedStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedStructure);
                }
            }
            else if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.say('build');
                    creep.moveTo(constructionSite);
                }
            }
            else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.say('upgrade');
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};