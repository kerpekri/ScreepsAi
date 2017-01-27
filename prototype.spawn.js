StructureSpawn.prototype.setupMinimumHarvesters =
    function (spawn) {
        spawn.memory.minNumberOfHarvesters = 5;
        spawn.memory.minNumberOfMiners = 0;
        spawn.memory.minNumberOfTransporters = 0;
        spawn.memory.minNumberOfEnergySmoothers = 0;
        spawn.memory.minNumberOfMaintenanceGuys = 0;
        spawn.memory.minNumberOfUpgraders = 1;
        spawn.memory.minNumberOfBuilders = 0;
        spawn.memory.harvesterEra = true;
    }

StructureSpawn.prototype.setupMinimumWorkers =
    function (spawn) {
        spawn.memory.minNumberOfHarvesters = 1; // harvesteri 2 - lvl 2 controller
        spawn.memory.minNumberOfMiners = 2;
        spawn.memory.minNumberOfTransporters = 2;
        spawn.memory.minNumberOfEnergySmoothers = 1;
        spawn.memory.minNumberOfMaintenanceGuys = 2; // 1 mguy - lvl 2 controller
        spawn.memory.minNumberOfUpgraders = 2; // 1 upgrader - lvl 2 controller
        spawn.memory.minNumberOfBuilders = 1;
        spawn.memory.harvesterEra = false;
    }

StructureSpawn.prototype.setupLongDistanceWorkers =
    function (spawn) {
        spawn.memory.minNumberOfLongDistanceBuilders = 1;
        spawn.memory.minNumberOfLongDistanceTransporters = 1;
        spawn.memory.minNumberOfLongDistanceMiners = 1;
        spawn.memory.minNumberOfClaimers = 1;
        spawn.memory.minNumberOfRoomExplorers = 1;
        spawn.memory.longDistanceWorkersSet = true;
    }

StructureSpawn.prototype.createHarvester =
    function () {
        return this.createCreep([WORK, MOVE, MOVE, CARRY], undefined, { role: 'harvester', working: false });
    }

StructureSpawn.prototype.createMiner =
    function (energyAvailable, sourceId) {
        let allPartsTogether = [];

        if (energyAvailable == 300) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]
        } else if (energyAvailable > 300 && energyAvailable < 449) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]
        }
        else if (energyAvailable > 449 && energyAvailable < 499) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]
        }
        else if (energyAvailable > 499 && energyAvailable < 599) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]
        }
        else if (energyAvailable > 599 && energyAvailable < 649) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]
        }
        else if (energyAvailable > 700) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]
        }
        else {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]
        }

        var body = allPartsTogether.split(',');
        return this.createCreep(body, undefined, { role: 'miner', sourceId: sourceId});
    }

StructureSpawn.prototype.createMaintenanceGuy =
    function (energyAvailable, spawnContainerId, controllerContainerId) {
        let allPartsTogether = [];

        // BODYPARTS_ALL[0] - MOVE
        // BODYPARTS_ALL[1] - WORK
        // BODYPARTS_ALL[2] - CARRY

        if (energyAvailable >= 300 && energyAvailable < 700) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable >= 700 && energyAvailable < 1300) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]
        }
        else if (energyAvailable >= 1300) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]
        } else {
            console.log('maintenanceGuy FUNCTIONALITY NOT WORKING: ' + energyAvailable)
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        }

        var body = allPartsTogether.split(',');
        return this.createCreep(body, undefined, { role: 'maintenanceGuy',
                                                   spawnContainerId: spawnContainerId,
                                                   controllerContainerId: controllerContainerId});
    }

StructureSpawn.prototype.createTransporter =
    function (energyAvailable, containerId) {
        let allPartsTogether = [];

        if (energyAvailable == 300) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable > 300 && energyAvailable <= 450) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable > 450 && energyAvailable <= 600) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable > 600 && energyAvailable <= 750) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable > 750) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        }
        else {
            console.log('something wrong with tansporters')
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        }

        var body = allPartsTogether.split(',');
        return this.createCreep(body, undefined, { role: 'transporter', containerId: containerId});
    }

StructureSpawn.prototype.createEnergySmoother =
    function (energyAvailable, spawnContainerId, controllerContainerId) {
        let allPartsTogether = [];

        if (energyAvailable == 300) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable > 300 && energyAvailable <= 450) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable > 450 && energyAvailable <= 600) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable > 600 && energyAvailable <= 750) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable > 750) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        }
        else {
            console.log('something wrong with energySmoothers')
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        }

        var body = allPartsTogether.split(',');
        return this.createCreep(body, undefined, { role: 'energySmoother', spawnContainerId: spawnContainerId, controllerContainerId: controllerContainerId});
    }

StructureSpawn.prototype.createUpgrader =
    function (energyAvailable) {
        console.log(energyAvailable)
        let allPartsTogether = [];
        // >= - greater than or equal to && <= - less than or equal to
        if (energyAvailable >= 300 && energyAvailable < 450) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]
        } else if (energyAvailable >= 450 && energyAvailable < 600) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]
        }
        else if (energyAvailable >= 600 && energyAvailable < 750) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]
        }
        else if (energyAvailable >= 750 && energyAvailable < 900) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]
        }
        else if (energyAvailable >= 900 && energyAvailable < 1050) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]
        }
        else if (energyAvailable >= 1050 && energyAvailable < 1300) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]
        } else if (energyAvailable >= 1300 && energyAvailable < 1800) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]
        } else if (energyAvailable >= 1800) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]
        }
        else {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]
            console.log('UPGRADERS FUNCTIONALITY NOT WORKING: ' + energyAvailable)
        }

        var body = allPartsTogether.split(',');
        return this.createCreep(body, undefined, { role: 'upgrader', working: false });
    }

StructureSpawn.prototype.createBuilder =
    function (energyAvailable) {
        let allPartsTogether = [];

        allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]

        var body = allPartsTogether.split(',')
        return this.createCreep(body, undefined, { role: 'builder' });
    }

StructureSpawn.prototype.createRoomGuard =
    function (energyAvailable) {
        let allPartsTogether = [];

        if (energyAvailable >= 300 && energyAvailable < 500) {
            allPartsTogether = ''
        } else {
            allPartsTogether = ''
        }

        var body = allPartsTogether.split(',')
        return this.createCreep(body, undefined, { role: 'roomGuard' });
    }

StructureSpawn.prototype.createlongDistanceMiner =
    function (energyAvailable, homeRoom, targetRoom) {
        let allPartsTogether = [];

        if (energyAvailable == 300) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]
        } else if (energyAvailable > 300 && energyAvailable < 449) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]
        }
        else if (energyAvailable > 449 && energyAvailable < 499) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]
        }
        else if (energyAvailable > 499 && energyAvailable < 599) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]
        }
        else if (energyAvailable > 599 && energyAvailable < 649) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]
        }
        else if (energyAvailable > 700) {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]
        }
        else {
            allPartsTogether = BODYPARTS_ALL[1]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[1]+','+BODYPARTS_ALL[0]
        }
        var body = allPartsTogether.split(',')
        return this.createCreep(body, undefined, { role: 'longDistanceMiner', homeRoom:homeRoom, targetRoom: targetRoom});
    }

StructureSpawn.prototype.createlongDistanceTransporter =
    function (energyAvailable, homeRoom, targetRoom) {
        let allPartsTogether = [];
        if (energyAvailable >= 700 && energyAvailable < 1300) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable >= 1300 && energyAvailable < 1500) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else if (energyAvailable >= 1500) {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]
        } else {
            allPartsTogether = BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[2]+','+BODYPARTS_ALL[0]+','+BODYPARTS_ALL[2]
            console.log('lDTransporte not working:' + energyAvailable)
        }

        var body = allPartsTogether.split(',')
        return this.createCreep(body, undefined, { role: 'longDistanceTransporter', homeRoom:homeRoom, targetRoom: targetRoom});
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