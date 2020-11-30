class Robot {
    fallen = false;
    verbose = false;
    roomData = {
        boundX : null,
        boundY : null
    };

    constructor(props) {
        [ this.posX, this.posY, this.orientation, this.roomData.boundX, this.roomData.boundY, this.fallPoints ] = props;
    }

    /**
     * Start the robot with a set of instructions
     * 
     * @param {array} instructions The single letter instructions
     */
    start(instructions) {
        this.debug('Robot starting...');
        instructions.forEach(instruction => {
            if(!this.fallen) {
                this.debug(this.posX + ' ' + this.posY + ' ' + this.orientation);
                if(instruction === 'L' || instruction === 'R') {
                    this.turn(instruction);
                } else if(instruction === 'F') {
                    this.move(instruction);
                } else {
                    console.log('Unknown command: ' + instruction);
                }
                this.debug(instruction);
                this.debug(this.posX + ' ' + this.posY + ' ' + this.orientation);
            }
        });

        // Final output
        return {
            posX : this.posX,
            posY : this.posY,
            orientation : this.orientation,
            fallen : this.fallen
        };
    }

    /**
     * Turn the robot in a given direction
     * 
     * @param {string} dir The direction to turn, either L (left) or R (right)
     */
    turn(dir) {
        if(this.orientation === 'N') {
            this.orientation = dir === 'L' ? 'W' : 'E';
        } else if(this.orientation === 'E') {
            this.orientation = dir === 'L' ? 'N' : 'S';
        } else if(this.orientation === 'S') {
            this.orientation = dir === 'L' ? 'E' : 'W';
        } else if(this.orientation === 'W') {
            this.orientation = dir === 'L' ? 'S' : 'N';
        }
    }

    /**
     * Move the robot in a given direction
     * 
     * @param {string} dir The direction to move, F (forward)
     */
    move(dir) {
        // Store the current grid location in case of a fall
        let currLoc = {
            posX : this.posX,
            posY : this.posY
        };

        // We only have 'F' (forward) at the moment, but more instructions can be added
        if(dir === 'F') {
            // Ignore the command if the robot would fall off
            if(this.fallPoints.indexOf(this.posX + this.posY + this.orientation) === -1) {
                if(this.orientation === 'N') {
                    this.posY++;
                } else if(this.orientation === 'E') {
                    this.posX++;
                } else if(this.orientation === 'S') {
                    this.posY--;
                } else if(this.orientation === 'W') {
                    this.posX--;
                }
            }
        }

        if(this.hasFallen()) {
            this.fallen = currLoc.posX + currLoc.posY + this.orientation;
            this.posX = currLoc.posX;
            this.posY = currLoc.posY;
        }
    }

    /**
     * Detect if the robot has fallen outside the bounds of the room
     */
    hasFallen() {
        return this.posX < 0 || this.posY < 0 || this.posX > this.roomData.boundX || this.posY > this.roomData.boundY;
    }

    /**
     * Output the robots movements if verbose is turned on
     * 
     * @param {string} msg The message to log
     */
    debug(msg) {
        this.verbose && console.log(msg)
    }
}

module.exports = Robot;
