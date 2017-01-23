/*Room.prototype.buildxxx =
    function (room, controller, spawn) {
        let extensionCount = _.sum( Game.structures, { roomName: this.name, structureType: STRUCTURE_EXTENSION } );

        let positionTest = extensionCount;
        let extensionCountTarget = CONTROLLER_STRUCTURES[ 'extension' ][ controller.level ];


//extensionCountTarget
        /*while ( extensionCount < 0 ) {

            let pos = room.getPositionAt(
                spawn.pos.x - 3 - Math.floor( positionTest / 5 ),
                spawn.pos.y - 4 + ( ( positionTest % 5 ) * 2 ) + ( Math.floor( positionTest / 5 ) % 2 )
            );

            console.log(pos)

            /*if ( pos.terrain !== 'wall' ) {
                if (
                    ( pos.lookFor2( LOOK_STRUCTURES, STRUCTURE_EXTENSION ).length == 0 )
                    &&
                    ( this.constructionQueue.getStructureAt.call( this, pos ) ) !== STRUCTURE_EXTENSION
                ) {
                    this.constructionQueue.add.call( this, pos, STRUCTURE_EXTENSION );
                    extensionCount += 1;
                }
            }
            positionTest += 1;
        }
    }*/

Room.prototype.buildRoadsFromToLocations =
    function (spawn, to) {
        var pathToSource = spawn.room.findPath(spawn.pos, to.pos);

        /*for (var i=0;i<pathToSource.length;i+=1) {
            spawn.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
        }*/
    }


Room.prototype.buildRoadsToSourcesAndController =
    function (spawn, sources, controller) {
        sources.push(controller);
        for (let object of sources) {
            var pathToSource = spawn.room.findPath(spawn.pos, object.pos, {ignoreCreeps: true});
            for (var i=0;i<pathToSource.length;i+=1) {
                spawn.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
            }
        }
        spawn.memory.roadsBuilded = true
    }


Room.prototype.buildRoadsToFlag =
    function (from, to) {
        flagPos = Game.flags[to].pos;
        pathToSource = from.room.findPath(from.pos, flagPos);

        /*var look = flagPos.look();
        look.forEach(function(lookObject) {
            if(lookObject.type == LOOK_STRUCTURES) {
                console.log(lookObject.type)
                for (var i=0;i<lookObject.length;i+=1) {
                    console.log(lookObject[i])
                }
            }
        });*/
        //for (var i=0;i<pathToSource.length;i+=1) {
            //from.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
        //}
    }

Room.prototype.buildRoadsToRoomExit =
    function (from, toRoom) {
        //flagPos = Game.flags[to].pos;
        var exitDir = from.room.findExitTo(toRoom);
        var exit = from.pos.findClosestByRange(exitDir);
        var pathToSource = from.room.findPath(from.pos, exit);

        for (var i=0;i<pathToSource.length;i+=1) {
            from.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
        }


        //var pathToSource = spawn.room.findPath(spawn.pos, source.pos);

        /*var look = flagPos.look();
        look.forEach(function(lookObject) {
            if(lookObject.type == LOOK_STRUCTURES) {
                console.log(lookObject.type)
                for (var i=0;i<lookObject.length;i+=1) {
                    console.log(lookObject[i])
                }
            }
        });*/
        //for (var i=0;i<pathToSource.length;i+=1) {
            //from.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
        //}
    }

Room.prototype.buildRoadsInNotOccupiedRoom =
    function (spawn, toRoom, sources) {
        //flagPos = Game.flags[to].pos;

        for (let source of sources) {

            var exitDir = source.room.findExitTo(toRoom);
            var exit = source.pos.findClosestByRange(exitDir);
            var pathToSource = spawn.room.findPath(spawn.pos, exit, {ignoreRoads: true, ignoreCreeps: true});
            console.log(pathToSource)
            for (var i=0;i<pathToSource.length;i+=1) {
                //console.log(pathToSource[i].x + ':' + pathToSource[i].y)
                //console.log(source.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD))
                //spawn.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
            }
        }


        //var pathToSource = spawn.room.findPath(spawn.pos, source.pos);

        /*var look = flagPos.look();
        look.forEach(function(lookObject) {
            if(lookObject.type == LOOK_STRUCTURES) {
                console.log(lookObject.type)
                for (var i=0;i<lookObject.length;i+=1) {
                    console.log(lookObject[i])
                }
            }
        });*/
        //for (var i=0;i<pathToSource.length;i+=1) {
            //from.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
        //}
    }

Room.prototype.buildExtensions =
    function () {

    }

Room.prototype.buildTower =
    function () {

    }

Room.prototype.buildSourceContainers =
    function (spawnRoom, sources, controller) {
        sources.push(controller);
        for (let source of sources) {
            xCoordinates = source.pos.x;
            yCoordinates = source.pos.y;
            //console.log(spawnRoom.memory.sourceIdContainerExists != source.id)
            if (spawnRoom.memory.sourceIdContainerExists != source.id) {
                tryToBuild = spawnRoom.createConstructionSite(xCoordinates, yCoordinates, STRUCTURE_CONTAINER);
                if (tryToBuild == -7) {
                    xCoordinates -= 1;
                    tryToBuild = spawnRoom.createConstructionSite(xCoordinates, yCoordinates, STRUCTURE_CONTAINER);
                    if (tryToBuild == -7) {
                        yCoordinates -= 1;
                        tryToBuild = spawnRoom.createConstructionSite(xCoordinates, yCoordinates, STRUCTURE_CONTAINER);
                        if (tryToBuild == -7) {
                            xCoordinates += 2;
                            tryToBuild = spawnRoom.createConstructionSite(xCoordinates, yCoordinates, STRUCTURE_CONTAINER);
                            if (tryToBuild == -7) {
                                yCoordinates += 2;
                                tryToBuild = spawnRoom.createConstructionSite(xCoordinates, yCoordinates, STRUCTURE_CONTAINER);
                                console.log(tryToBuild)
                            } else if (tryToBuild == 0) {
                    let sourceContainerId = 'sourceContainer' + source.id;
                    spawnRoom.memory.sourceContainerId = source.id
                }
                        } else if (tryToBuild == 0) {
                    let sourceContainerId = 'sourceContainer' + source.id;
                    spawnRoom.memory.sourceContainerId = source.id
                }
                    } else if (tryToBuild == 0) {
                    let sourceContainerId = 'sourceContainer' + source.id;
                    spawnRoom.memory.sourceContainerId = source.id
                }

                } else if (tryToBuild == 0) {
                    let sourceContainerId = 'sourceContainer' + source.id;
                    spawnRoom.memory.sourceContainerId = source.id
                }
            }
            //var terrain = spawnRoom.lookForAtArea('terrain', source.pos.x, source.pos.y, source.pos.x, source.pos.y);
            //console.log(source.pos.x + ':' + source.pos.y)
            //console.log(terrain)
            /*for (var key in terrain) {
              if (terrain.hasOwnProperty(key)) {
                console.log(key + " -> " + terrain[key]);

                for (var keyKey in terrain[key]) {
                    console.log(keyKey + " -> " + terrain[key][key]);

                }
              }
            }*/
        }
    }