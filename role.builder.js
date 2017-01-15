module.exports = {
    run: function(creep, roomName) {
        if (creep.carry.energy == 0) {
            var storage = creep.room.storage;

            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('withdraw');
                creep.moveTo(storage);
            }
        }
        else {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.say('build');
                    creep.moveTo(constructionSite);
                }
            }
            else {
                var damagedDefence = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (i) => (i.structureType == STRUCTURE_WALL && i.hits < 100000) ||
                                   (i.structureType == STRUCTURE_RAMPART && i.hits < 100000) // todo is this a good idea?
                });

                if (damagedDefence != undefined) {
                    if (creep.repair(damagedDefence) == ERR_NOT_IN_RANGE) {
                        creep.say('repair');
                        creep.moveTo(damagedDefence);
                    }
                }
            }
        }
    }
};