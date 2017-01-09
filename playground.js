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

Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, CARRY], { role: 'maintenanceGuy', flagIndex: 'sourceOneContainer'})
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


