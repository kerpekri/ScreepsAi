var roles = {
    harvester: require('role.harvester'),
    upgrader: require('role.upgrader'),
    builder: require('role.builder'),
    repairer: require('role.repairer'),
    wallRepairer: require('role.wallRepairer'),
    longDistanceMiner: require('role.longDistanceMiner'),
    longDistanceTransporter: require('role.longDistanceTransporter'),
    longDistanceBuilder: require('role.longDistanceBuilder'),
    claimer: require('role.claimer'),
    miner: require('role.miner'),
    attacker: require('role.attacker'),
    transporter: require('role.transporter'),
    maintenanceGuy: require('role.maintenanceGuy'),
    healer: require('role.healer'),
    energySmoother: require('role.energySmoother'),
    roomExplorer: require('role.roomExplorer')
};

Creep.prototype.runRole =
    function () {
        roles[this.memory.role].run(this);
    };

/** @function
    @param {bool} useContainer
    @param {bool} useSource */
Creep.prototype.getEnergy =
    function (useContainer, useSource) {
        /** @type {StructureContainer} */
        let container;
        // if the Creep should look for containers
        if (useContainer) {
            // find closest container
            container = this.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                             s.store[RESOURCE_ENERGY] > 0
            });
            // if one was found
            if (container != undefined) {
                // try to withdraw energy, if the container is not in range
                if (this.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    this.moveTo(container);
                }
            }
        }
        // if no container was found and the Creep should look for Sources
        if (container == undefined && useSource) {
            // find closest source
            var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

            // try to harvest energy, if the source is not in range
            if (this.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards it
                this.moveTo(source);
            }
        }
    };