module.exports = {
    run: function(creep) {
        if (creep.room.name == creep.memory.homeRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else if (creep.room.name == creep.memory.targetRoom) {
            // todo tiesam ejam uz mineral?
            var roomMineral = creep.pos.findClosestByPath(FIND_MINERALS);;
            creep.moveTo(roomMineral);
        }
        else {
            var exit = creep.room.findExitTo(creep.memory.homeRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};
