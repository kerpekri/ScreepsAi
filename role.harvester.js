var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep) {
        /*
            working - get energy back to HQ
            not_working - go to source -> get energy
        */

        // the creep is working right now and no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        // we are not working and creep is full of energy get back to HQ
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
         }

        // if it is working
        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // filter out extension, where energy is not at the maximum
                // TODO can I specify in for if checking in JS?
                filter: (s) => (s.structureType == STRUCTURE_SPAWN     ||
                                s.structureType == STRUCTURE_EXTENSION ||
                                s.structureType == STRUCTURE_TOWER)    &&
                                s.energy < s.energyCapacity
            });

            // if there is a structure with empty energy capacity
            if (structure != undefined) {
                // get energy to extension structure
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // if not in range move closer to energy extension
                    creep.moveTo(structure);
                }
            }
            else {
                // if ALL buildings are full of energy, change to upgrader creep
                 roleUpgrader.run(creep);
            }
        }
        // not_working state
        else {
            // if someone has droped energy on the floor
            var dropedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                               filter: (d) => { return (d.resourceType  == RESOURCE_ENERGY)}});

            // get the energy
            if (dropedEnergy) {
                if (creep.pickup(dropedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropedEnergy)
                }
            }
            else {
                // pos object - good one, a lot of good build-in functions
                // find closest energy source
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

                // harvest source, if not in range go closer.
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // if we are not in range move closer to source destination
                    creep.moveTo(source);
                }
            }
        }
    }
};