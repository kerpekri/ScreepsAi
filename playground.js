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