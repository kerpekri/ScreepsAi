// create a new function for StructureTower
StructureLink.prototype.transferEnergy =
    function (roomsStorage) {
        var storage = roomsStorage;

        let targetLink = storage.pos.findInRange(FIND_STRUCTURES, 2, {
            filter: s => s.structureType == STRUCTURE_LINK
        })[0];

        if (targetLink != undefined) {
            if (this.cooldown == 0 && ((targetLink.energyCapacity - targetLink.energy) >= this.energy)) {
                this.transferEnergy(targetLink);
            }
        }
    };