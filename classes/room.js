class Room {
    fallPoints = [];
    robots = [];

    constructor(props) {
        [ this.boundX, this.boundY ] = props;
    }

    /**
     * Get room data to pass to the robots
     */
    get roomData() {
        return [this.boundX, this.boundY, this.fallPoints];
    }
}

module.exports = Room;
