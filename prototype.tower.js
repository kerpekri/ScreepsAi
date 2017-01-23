// create a new function for StructureTower
StructureTower.prototype.defend =
    function () {
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if (target != undefined) {
            this.attack(target);
        }
        else {
            var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_CONTAINER) ||
                               (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_EXTENSION) ||
                               (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_STORAGE) ||
                               (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_LINK) ||
                               (s.hits < (s.hitsMax / 10) && s.structureType == STRUCTURE_ROAD)
            });

            var closestDamagedUnit = this.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (creep) => creep.hits < creep.hitsMax
            });

            if (structure != undefined) {
                this.repair(structure);
            }
            else if (closestDamagedUnit != undefined) {
                this.heal(closestDamagedUnit);
            }
            else {
                var structure = this.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.hits < 10000 && s.structureType == STRUCTURE_RAMPART) ||
                                   (s.hits < 10000 && s.structureType == STRUCTURE_WALL)
                });

                if (structure != undefined) {
                    this.repair(structure);
                }
            }
        }
    };