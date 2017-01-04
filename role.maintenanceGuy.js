module.exports = {
    run: function(creep) {
        /*var droptEnergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
            filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});

        // get the energy
        if (droptEnergy.amount > 199 && creep.carry.energy == 0) {
            creep.say('go dropped e');
            if (creep.pickup(droptEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droptEnergy)
            }
        }*/
        if (creep.carry.energy != creep.carryCapacity) {
            creep.say('find full cn');
            var containerWithAlmostFullEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                               i.store[RESOURCE_ENERGY] > 1300
            });

            if (containerWithAlmostFullEnergy == null) {
                var storage = creep.room.storage;

                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
            else {
                if (creep.withdraw(containerWithAlmostFullEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containerWithAlmostFullEnergy);
                }
            }
        }
        else {
            creep.say('fill energy');
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN     ||
                                s.structureType == STRUCTURE_EXTENSION ||
                                s.structureType == STRUCTURE_TOWER)  &&
                                s.energy < s.energyCapacity
            });

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
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
};