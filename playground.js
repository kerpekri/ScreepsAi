// how to 
var criticalRepair = tower.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits < (structure.hitsMax / 10) && structure.structureType != STRUCTURE_WALL)
            }
        });

var heavyRepair = tower.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.hits < (structure.hitsMax / 5) && structure.structureType != STRUCTURE_WALL)
    }
});

 var mediumRepair = tower.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.hits < (structure.hitsMax / 3) && structure.structureType != STRUCTURE_WALL)
    }
});

 var minorRepair = tower.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.hits < (structure.hitsMax / 2) && structure.structureType != STRUCTURE_WALL)
    }
});

//

/*
    BODYPARTS_ALL = [
                        MOVE,
                        WORK,
                        CARRY,
                        ATTACK,
                        RANGED_ATTACK,
                        TOUGH,
                        HEAL,
                        CLAIM
    ];
*/

else if (roleName == 'miner') {
    var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
    var workPartCount = Math.floor((maximum_energy_available - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);
    var allowedMoveParts = [BODYPARTS_ALL[0]];
    var allowedCarryParts = [BODYPARTS_ALL[2]];
    var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', 3).slice(0,-1);
}
//
//
// how to access memory role in screeps
Game.creeps.Chase.memory.role = 'upgrader'

// spawn new creep
Game.spawns['TX-HQ'].createCreep([CARRY, CARRY, MOVE, MOVE], { role: 'transporter', GetEnergyFromContainer: true,
                                            MoveEnergyToContainer: false, flagIndex: 'sourceOneContainer'})

// https://www.youtube.com/watch?v=1UB0h468A8M&index=8&list=PL0EZQ169YGlor5rzeJEYYPE3tGYT2zGT2

longDistanceBuilder

Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, CARRY], { role: 'transporter', flagIndex: 'sourceOneContainer'})
Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'miner', flagIndex);
name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'maintenanceGuy', 'test');
name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'transporter', flagIndex: 'sourceOneContainer');
//
//
https://github.com/Garethp/Screeps/blob/master/roles_healer.js
https://github.com/Garethp/Screeps/blob/master/roles_guard.js
https://github.com/Garethp/Screeps/blob/master/roles_archer.js

// FLAGS
<kur>:ReserveController:<no kurienes> - color light blue
E77N18:SourceOne:E78N18 - yellow
E77N18:SourceOneContainer:E78N18 - brown
E77N18:ExploreRoom:E78N18 - white
E78N17:ReserveController:E78N18 - green
E78N18:Container:E78N18 - red

//
// check if array object
if( Object.prototype.toString.call( nextAvailableRooms ) === '[object Array]' ) {
    console.log('array');
}
//
//

spawns = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
    filter: (i) => i.structureType == STRUCTURE_SPAWN
});

var spawns = findClosestByPath(FIND_STRUCTURES, {
    filter: (i) => i.structureType == STRUCTURE_WALL ||
                   i.structureType == STRUCTURE_RAMPART &&
                   i.hits < 100000 // todo is this a good idea?
});

//////////////////

module.exports = {
    run: function(creep) {
        if (creep.carry.energy == 0) {
            let energyOnFloor = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                filter: s => s.energy > 50
            });

            var containerWithAlmostFullEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                               i.store[RESOURCE_ENERGY] > 1000
            });

            var controllersContainerPos = Game.rooms.E78N18.controller.pos;

            var controllersContainer = controllersContainerPos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (energyOnFloor != undefined) {
                if (creep.pickup(energyOnFloor) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyOnFloor)
                }


                else {
                    creep.say('getEngContainer');




                    if (containerWithAlmostFullEnergy == null) {
                        var storage = creep.room.storage;

                        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage);
                        }
                    }
                    else if (containerWithAlmostFullEnergy != controllersContainer) {
                        if (creep.withdraw(containerWithAlmostFullEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containerWithAlmostFullEnergy);
                        }
                    }
                    else {
                        var storage = creep.room.storage;

                        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage);
                        }
                    }
                }
            }
            else {
                creep.say('getEngContainer');
                var containerWithAlmostFullEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                   i.store[RESOURCE_ENERGY] > 1000
                });

                var controllersContainerPos = Game.rooms.E78N18.controller.pos;

                var controllersContainer = controllersContainerPos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });

                if (containerWithAlmostFullEnergy == null) {
                    var storage = creep.room.storage;

                    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage);
                    }
                }
                else if (containerWithAlmostFullEnergy != controllersContainer) {
                    if (creep.withdraw(containerWithAlmostFullEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerWithAlmostFullEnergy);
                    }
                }
                else {
                    var storage = creep.room.storage;

                    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage);
                    }
                }
            }
        }
        else {
            var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER)  &&
                                s.energy < s.energyCapacity &&
                                s.energy < 800
            });

            var spawnAndExtensions = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN     ||
                                s.structureType == STRUCTURE_EXTENSION) &&
                                s.energy < s.energyCapacity
            });

            if (tower != undefined) {
                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                }
            }
            else if (spawnAndExtensions != undefined) {
                if (creep.transfer(spawnAndExtensions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawnAndExtensions);
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
                    var damagedWall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_WALL && i.hits < 100000
                    });

                    if (damagedWall != undefined) {
                        if (creep.repair(damagedWall) == ERR_NOT_IN_RANGE) {
                            creep.say('rep wall');
                            creep.moveTo(damagedWall);
                        }
                    }
                }
            }
        }
    }
};
///
var HARVESTER_PARTS = [MOVE, CARRY, WORK];
var UPGRADER_PARTS = [MOVE, WORK, CARRY];
var TRANSFER_PARTS = [MOVE, CARRY];
var CONSTRUCTOR_PARTS = [WORK, CARRY, MOVE];
var ATTACK_PARTS = [ATTACK, TOUGH, MOVE]
var CLAIM_PARTS = [MOVE, CLAIM, CLAIM]

function getPartCost(part) {
  return BODYPART_COST[part];
}

function calculateParts(parts, maxCost, role) {
  var i = 0;
  var totalCost = 0;
  var finalParts = [];
  while (totalCost + getPartCost(parts[i % parts.length]) < maxCost) {
    if (role == 'harvester') {
        if (totalCost == 0) {
            finalParts = [MOVE, CARRY, WORK];
            totalCost = getPartCost(WORK) + getPartCost(MOVE) + getPartCost(CARRY);
        } else {
            finalParts.push(WORK);
            totalCost += getPartCost(WORK);
        }
    } else {
        finalParts.push(parts[i % parts.length]);
        totalCost += getPartCost(parts[i % parts.length]);
    }
    i++;
  }
  return finalParts;
}

function getParts(role, maxCost) {
  switch (role) {
    case 'harvester':
      return calculateParts(HARVESTER_PARTS, maxCost, role);
    case 'harvester.remote':
      return calculateParts(HARVESTER_PARTS, maxCost, role);
    case 'transfer':
      return calculateParts(TRANSFER_PARTS, maxCost, role);
    case 'upgrader':
      return calculateParts(UPGRADER_PARTS, maxCost, role);
    case 'construction':
      return calculateParts(CONSTRUCTOR_PARTS, maxCost, role);
    case 'claim':
      return calculateParts(CLAIM_PARTS, maxCost, role);
    case 'guard':
      return calculateParts(ATTACK_PARTS, maxCost, role);
  }
}

module.exports.getParts = getParts;
module.exports.getPartCost = getPartCost;
module.exports.calculateParts = calculateParts;