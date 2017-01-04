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
            creep.say('build');
            // find closest construction Site
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            // check if we have ANY construction site available and skip RAMPART
            if (constructionSite != undefined &&
                constructionSite != STRUCTURE_RAMPART) {
                // if not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move to construction site
                    creep.moveTo(constructionSite);
                }
            }
            // if there aren't any construction sites and there A RAMPART available
            else if (constructionSite != undefined && constructionSite == STRUCTURE_RAMPART) {
                creep.say('build ram');
                // if not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move to construction site
                    creep.moveTo(constructionSite);
                }
            }
            else {
                creep.say('rep rampart');
                var damagedRampart = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_RAMPART && i.hits < 10001
                });

                if (damagedRampart != undefined) {
                    if (creep.repair(damagedRampart) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(damagedRampart);
                    }
                }
            }
        }
        // not_working state
        else {
            creep.say('get energy');
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