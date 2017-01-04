module.exports = {
    run: function(creep) {
        var containerFlag = Game.flags['Container:Withdraw:' + creep.memory.home_room]
        var homeFlag = Game.flags['Controller:Home:' + creep.memory.home_room]

        if(containerFlag){
            if(creep.room == containerFlag.room) {
                if (creep.carry.energy == creep.carryCapacity) {
                    creep.moveTo(homeFlag);
                }
                else {
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });

                    if (container != undefined) {
                        creep.say('withdraw');
                        if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    }
                }
            }
            else if (creep.room == homeFlag.room && creep.carry.energy == creep.carryCapacity) {
                var homeContainerFlag = Game.flags['Home:Container:One'];

                if (creep.moveTo(homeContainerFlag) == 0) {
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER &&
                                     s.store[RESOURCE_ENERGY] != 2000
                    });

                    if (container != undefined) {
                        creep.say('transfer');
                        //console.log(container);
                        if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
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
                else {
                    creep.moveTo(homeContainerFlag);
                }
            }
            else {
                creep.moveTo(containerFlag)
            }
        } else {
            creep.moveTo(homeFlag);
        }
    }
};