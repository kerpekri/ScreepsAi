StructureSpawn.prototype.setupMinimumHarvesters =
    function (spawn) {
        spawn.memory.minNumberOfHarvesters = 7;
        spawn.memory.minNumberOfMiners = 0;
        spawn.memory.minNumberOfTransporters = 0;
        spawn.memory.minNumberOfEnergySmoothers = 0;
        spawn.memory.minNumberOfMaintenanceGuys = 0;
        spawn.memory.minNumberOfUpgraders = 0;
        spawn.memory.minNumberOfBuilders = 0;
        spawn.memory.harvesterEra = true;
    }

StructureSpawn.prototype.setupMinimumWorkers =
    function (spawn) {
        spawn.memory.minNumberOfHarvesters = 2; // harvesteri 2 - lvl 2 controller
        spawn.memory.minNumberOfMiners = 2;
        spawn.memory.minNumberOfTransporters = 2;
        spawn.memory.minNumberOfEnergySmoothers = 1;
        spawn.memory.minNumberOfMaintenanceGuys = 1; // 1 mguy - lvl 2 controller
        spawn.memory.minNumberOfUpgraders = 1; // 1 upgrader - lvl 2 controller
        spawn.memory.minNumberOfBuilders = 1;
        spawn.memory.harvesterEra = false;
    }

StructureSpawn.prototype.createHarvester =
    function () {
        return this.createCreep([WORK, MOVE, MOVE, CARRY], undefined, { role: 'harvester', working: false });
    }

StructureSpawn.prototype.createMiner =
    function (sourceId) {
        /*return this.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE], undefined,
                                { role: 'miner', sourceId: sourceId });*/
    }

StructureSpawn.prototype.createCustomCreep =
        function (energyAvailable,
                  roleName,
                  roomName,
                  energySource,
                  sourceContainer,
                  flagName,
                  homeRoom,
                  targetRoom,
                  sourceId,
                  containerId,
                  controllerContainerId) { //container id tiek izmantots transporter un energysmoother
            var body = [];

            if (roleName == 'miner') {
                let maxNeededEnergy = 700;
                let startingParts = ['WORK', 'WORK', 'CARRY', 'MOVE']


                if (energyAvailable > 700) {
                    // 6W 2M 1C - body part count
                    energyAvailable = 700;
                }
                else {
                    energyAvailable = 300;
                }

                var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
                var workPartCount = Math.floor((energyAvailable - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);

                if (energyAvailable > 700) {
                    // 5W 3M 1C - body part count
                    var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', 3).slice(0,-1);
                }
                else {
                    var allowedMoveParts = BODYPARTS_ALL[0];
                }

                var allowedCarryParts = BODYPARTS_ALL[2];
                var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', workPartCount).slice(0,-1);

                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body, undefined, { role: roleName, sourceId: sourceId});
            }
            else if (roleName == 'transporter') {
                if (energyAvailable > 600) {
                    energyAvailable = 300;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energyAvailable / energyNeededForCarryAndMoveParts);
                var carryPartCount = movePartCount * 2;


                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', movePartCount).slice(0,-1);
                var allowedCarryParts = _.repeat(BODYPARTS_ALL[2] + ',', carryPartCount).slice(0,-1);


                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body, undefined, {role: roleName, containerId: containerId});
            }
            else if (roleName == 'energySmoother') {
                if (energyAvailable > 600) {
                    energyAvailable = 600;
                }
                else {
                    energyAvailable = 300;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energyAvailable / energyNeededForCarryAndMoveParts);
                var carryPartCount = movePartCount * 2;


                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', movePartCount).slice(0,-1);
                var allowedCarryParts = _.repeat(BODYPARTS_ALL[2] + ',', carryPartCount).slice(0,-1);


                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body,
                                        undefined,
                                        {
                                            role: roleName,
                                            spawnContainerId: containerId,
                                            controllerContainerId: controllerContainerId
                                        });
            }
            else if (roleName == 'maintenanceGuy') {
                if (energyAvailable > 600) {
                    energyAvailable = 450;
                }
                else {
                    energyAvailable = 300;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energyAvailable / energyNeededForCarryAndMoveParts);
                var carryPartCount = movePartCount;


                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', movePartCount).slice(0,-1);
                var allowedCarryParts = _.repeat(BODYPARTS_ALL[2] + ',', carryPartCount).slice(0,-1);
                var allowedWorkParts = BODYPARTS_ALL[1];


                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body,
                                        undefined,
                                        {
                                            role: roleName,
                                            spawnContainerId: containerId,
                                            controllerContainerId: controllerContainerId
                                        });
            }
            else if (roleName == 'upgrader') {
                if (energyAvailable > 600) {
                    energyAvailable = 1050; // NEAIZTIEC!
                }
                else {
                    energyAvailable = 300;
                }

                var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
                var workPartCount = Math.floor((energyAvailable - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);

                //var allowedMoveParts = BODYPARTS_ALL[0];
                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', 1).slice(0,-1);
                var allowedCarryParts = BODYPARTS_ALL[2];
                var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', workPartCount).slice(0,-1);

                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body, undefined, { role: roleName, roomName: roomName });
            }
            else if (roleName == 'builder') {
                if (energyAvailable > 600) {
                    energyAvailable = 450;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energyAvailable / energyNeededForCarryAndMoveParts);
                var carryPartCount = movePartCount * 2;


                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', 4).slice(0,-1);
                var allowedCarryParts = _.repeat(BODYPARTS_ALL[2] + ',', 6).slice(0,-1);
                var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', 2).slice(0,-1);


                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body,
                                        undefined,
                                        {
                                            role: roleName,
                                            roomName: roomName
                                        });
            }
            else if (roleName == 'repairer') {
                // TESTED - 700 energy ieguvums no viena creepa
                var allowedMoveParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; // 6
                var allowedCarryParts = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]; // 7
                var allowedWorkParts = [WORK, WORK, WORK, WORK]; // 4
            }
            else if (roleName == 'wallRepairer') {
                // TESTED - 700 energy ieguvums no viena creepa
                var allowedMoveParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; // 6
                var allowedCarryParts = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]; // 7
                var allowedWorkParts = [WORK, WORK, WORK, WORK]; // 4
            }
            else if (roleName == 'longDistanceMiner') {
                if (energyAvailable > 600) {
                    // 6W 2M 1C - body part count
                    energyAvailable = 700;
                }

                var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
                var workPartCount = Math.floor((energyAvailable - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);

                if (energyAvailable > 600) {
                    // 5W 3M 1C - body part count
                    var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', 3).slice(0,-1);
                }
                else {
                    var allowedMoveParts = BODYPARTS_ALL[0];
                }
                var allowedCarryParts = BODYPARTS_ALL[2];
                var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', workPartCount).slice(0,-1);

                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts + ',move' + ',move' + ',move'
                var body = allPartsTogether.split(",");

                return this.createCreep(body, undefined, { role: roleName,
                                                           homeRoom: roomName,
                                                           targetRoom: targetRoom});
            }

            if (roleName != 'miner' ) {
                // concat all body parts into body array
                var body = allowedMoveParts.concat(allowedWorkParts, allowedCarryParts);

                // create custom creep
                return this.createCreep(body, undefined, { role: roleName, working: false, closeToController: false});
            }
};