const config = require("./config");
const leftpad = require("left-pad")

function SheepyFramesReader(sheepyConfig) {
    this.sheepyConfig = sheepyConfig;
}

SheepyFramesReader.prototype.getFrames = function() {
    let frames = [];
    let numberOfFrames = this.sheepyConfig.getNumberOfFrames();
    for(var i = 1; i <= numberOfFrames; i++) {
        frames.push(`${config.baseSheepys}/${this.sheepyConfig.getSheepyType()}/frame-${leftpad(i, 3, '0')}.gif`);
    }
    return frames;
}

module.exports = SheepyFramesReader;
