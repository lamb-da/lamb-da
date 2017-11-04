const config = require("./config");

function SheepyConfig(sheepyType) {
    this.sheepyType = sheepyType;
    this.sheepyConfig = require("./sheepyconfigs/" + sheepyType);
}

SheepyConfig.prototype.getHeight = function() {
    return this.sheepyConfig.height || config.HEIGHT;
}

SheepyConfig.prototype.getWidth = function() {
    return this.sheepyConfig.width || config.WIDTH;
}

SheepyConfig.prototype.getSheepyType = function() {
    return this.sheepyType;
}

SheepyConfig.prototype.getFollowingFrames = function() {
    return this.sheepyConfig.followingFrames;
}

SheepyConfig.prototype.getNumberOfFrames = function() {
    return this.sheepyConfig.followingFrames.length;
}

SheepyConfig.prototype.shouldFlipX = function() {
    return this.sheepyConfig.flipX || false;
}

SheepyConfig.prototype.shouldFlipY = function() {
    return this.sheepyConfig.flipY || false;
}

module.exports = SheepyConfig;
