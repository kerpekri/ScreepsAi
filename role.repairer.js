var roleBuilder = require('role.builder');

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
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // filter for checking if hitpoints is MAX
                filter: (s) => s.hits < s.hitsMax &&
                               s.structureType != STRUCTURE_WALL &&
                               s.structureType != STRUCTURE_RAMPART
            });

            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
                else {
                    var damagedRampart = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_RAMPART && i.hits < 30001
                    });

                    if (damagedRampart != undefined) {
                        creep.say('rep rampart');
                        if (creep.repair(damagedRampart) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(damagedRampart);
                        }
                    }
                    else {
                        var damagedWall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (i) => i.structureType == STRUCTURE_WALL && i.hits < 30001
                        });

                        if (damagedWall != undefined) {
                            creep.say('rep wall');
                            if (creep.repair(damagedWall) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(damagedWall);
                            }
                        }
                        else {
                            var storage = creep.room.storage;

                            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage);
                            }
                        }
                    }
                }
            }
        }
        // not_working state
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
};