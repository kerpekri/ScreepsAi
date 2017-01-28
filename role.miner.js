module.exports = {
    run: function (creep) {
        let source = Game.getObjectById(creep.memory.sourceId);

        let link = source.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_LINK &&
                    s.energyCapacity > s.energy
        })[0];

        if (link != undefined) {
            if (creep.carry.energy == creep.carryCapacity) {
                if (creep.transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(link);
                }
            } else {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(source);
                }
            }
        } else {
            // find container next to source
            let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            })[0];

            if (container != undefined) {
                // if creep is on top of the container
                if (creep.pos.isEqualTo(container.pos)) {
                    // harvest source
                    creep.harvest(source);
                }
                // if creep is not on top of the container
                else {
                    // move towards it
                    creep.moveTo(container);
                }
            }
        }
    }
};