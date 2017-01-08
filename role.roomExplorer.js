module.exports = {
    run: function(creep) {
        var explorerFlag = Game.flags[creep.memory.targetRoom + ':ExploreRoom:' + creep.memory.homeRoom];
        var homeFlag = Game.flags[creep.memory.homeRoom + ':Home:' + creep.memory.homeRoom];

        if(explorerFlag){
            var hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if(creep.room == explorerFlag.room) {
                if (hostileCreeps) {
                    if(creep.attack(hostileCreeps) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileCreeps);
                    }
                }
                else {
                    creep.moveTo(explorerFlag);
                }
            }
            else {
                creep.moveTo(explorerFlag);
            }
        } else {
            creep.moveTo(homeFlag);
        }

    }
};