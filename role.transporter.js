module.exports = {
    run: function(creep) {
        var controllerFlag = Game.flags['controllerContainer'];

        /*if (creep.carry.energy == 0) {
            var storage = creep.room.storage;

            if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }



        }
        else if (creep.carry.energy > 0) {

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
        }*/
        if (creep.carry.energy != creep.carryCapacity) {
            var pos = Game.flags[creep.memory.flagIndex].pos;
            //console.log(creep.name + ' ' + pos);

            var container = pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('take energy');
                creep.moveTo(Game.flags[creep.memory.flagIndex]);
            }
        }
        else if (creep.carryCapacity == creep.carryCapacity) {
            var pos = Game.rooms.E78N18.controller.pos;
            //console.log(creep.name + ' ' + pos);

            var container = pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });


            if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('transfer C');
                creep.moveTo(container);
            }
        }












        /*if (creep.memory.GetEnergyFromContainer == true && creep.memory.MoveEnergyToContainer == false) {

            var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});

            // get the energy
            if (dropenergy) {
                if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropenergy)
                }
            }

            // somehow we need to specify flags dynamic
            // var path = creep.pos.findPathTo(Game.flags.controllerContainer);
            if (creep.memory.flagIndex == 'sourceTwoContainer') {
                var pos = Game.rooms.E78N18.getPositionAt(23,31);
            }
            else {
                var pos = Game.rooms.E78N18.getPositionAt(21,44);
            }

            var structure = pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            //ar destination_flag = creep.memory.flagIndex;
            //var path = creep.pos.findPathTo(Game.flags[destination_flag]);

            if (structure != undefined && creep.carry.energy != creep.carryCapacity) {
                if (creep.withdraw(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // if not in range move closer to energy extension
                    creep.moveTo(structure);
                }
            }
            else {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                });

                creep.withdraw(container, RESOURCE_ENERGY);

                if (creep.carry.energy == creep.carryCapacity) {
                    creep.memory.GetEnergyFromContainer = false;
                    creep.memory.MoveEnergyToContainer = true;
                }
            }
        }
        else if (creep.memory.GetEnergyFromContainer == false && creep.memory.MoveEnergyToContainer == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN     ||
                                s.structureType == STRUCTURE_EXTENSION ||
                                s.structureType == STRUCTURE_TOWER
                                )    &&
                                s.energy < s.energyCapacity
            });

            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
                else if (creep.carry.energy == 0) {
                    creep.memory.GetEnergyFromContainer = true;
                    creep.memory.MoveEnergyToContainer = false;
                }
            }
            else {
                //var path = creep.pos.findPathTo(Game.flags.controllerContainer);

                var pos = Game.rooms.E78N18.getPositionAt(36,41);

                var structure = pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });


                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.carry.energy != 0) {
                    // if not in range move closer to energy extension
                    creep.moveTo(structure);
                }
                else {
                    creep.memory.GetEnergyFromContainer = true;
                    creep.memory.MoveEnergyToContainer = false;
                }

            }
        }*/
    }
};