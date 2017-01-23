module.exports = {
    run: function(creep, roomName) {
        let wallAndRampartHp = 50000;

        if (creep.carry.energy == 0) {
            let energyOnFloor = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                filter: s => s.energy > 50
            });

            if (energyOnFloor == null) {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER  &&
                                   s.store[RESOURCE_ENERGY] > 500
                });
            }

            if (energyOnFloor != undefined) {
                if (creep.pickup(energyOnFloor, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyOnFloor);
                }
            } else if (container != undefined) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            } else {
                // find closest source
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
            }
        }
        else {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            if (constructionSite == undefined) {
                var damagedDefence = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (i) => (i.structureType == STRUCTURE_WALL && i.hits < wallAndRampartHp) ||
                                   (i.structureType == STRUCTURE_RAMPART && i.hits < wallAndRampartHp)
                });
            }

            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.say('build');
                    creep.moveTo(constructionSite);
                }
            } else if (damagedDefence != undefined) {
                if (creep.repair(damagedDefence) == ERR_NOT_IN_RANGE) {
                    creep.say('repair');
                    creep.moveTo(damagedDefence);
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.say('upgrade');
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};