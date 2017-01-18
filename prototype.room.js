Room.prototype.buildxxx =
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
        }*/
    }



Room.prototype.buildRoadsForImportantObjects =
    function (room) {
		var sources = room.find(FIND_SOURCES);
		var controller = room.controller;
		var spawns = room.find(FIND_MY_SPAWNS);
		var structures = room.find(FIND_MY_STRUCTURES, { filter: function (structure) {
											return structure.structureType == STRUCTURE_EXTRACTOR
												|| structure.structureType ==  STRUCTURE_STORAGE }
		});

        sources.concat(spawns);
		structures.push(controller);

        console.log(room,"buildroads betwen",structures);
		for (var i = 0 ; i < structures.length ; i++ ){
			for (var j = 0 ; j < structures.length ; j++ ){
				if ( i != j) {
					this.buildRoad(structures[i].pos, structures[j].pos);
				}
			}
		}
    }


Room.prototype.buildRoadsFromToLocations =
    function (from, to) {
        for (let source of sources) {
            var pathToSource = spawn.room.findPath(spawn.pos, source.pos);

            for (var i=0;i<pathToSource.length;i+=1) {
                spawn.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
            }
        }

    }


Room.prototype.buildRoadsToSources =
    function (spawn, sources) {
        for (let source of sources) {
            var pathToSource = spawn.room.findPath(spawn.pos, source.pos);

            for (var i=0;i<pathToSource.length;i+=1) {
                spawn.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
            }
        }

    }

Room.prototype.buildRoadsToFlag =
    function (from, to) {
        flagPos = Game.flags[to].pos;
        pathToSource = from.room.findPath(from.pos, flagPos);

        for (var i=0;i<pathToSource.length;i+=1) {
            from.room.createConstructionSite(pathToSource[i].x, pathToSource[i].y, STRUCTURE_ROAD)
        }
    }

Room.prototype.buildExtensions =
    function () {

    }

Room.prototype.buildTower =
    function () {

    }

Room.prototype.buildSourceContainers =
    function (spawnRoom, sources) {
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