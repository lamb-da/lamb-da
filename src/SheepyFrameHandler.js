const fs = require('fs');
const Canvas = require('canvas');
const Image = Canvas.Image;

function SheepyFrameHandler(sheepyConfig) {
    let width = sheepyConfig.getWidth();
    let height = sheepyConfig.getHeight();
    this.context = new Canvas(width, height).getContext('2d');
    this.context.fillStyle = "rgba(255,255,255,0)";
    this.context.fillRect(0, 0, width, height);
}

SheepyFrameHandler.prototype.addImage = function(image, offsetX, offsetY) {
    this.context.drawImage(image, offsetX || 0, offsetY || 0);
}

SheepyFrameHandler.prototype.addResizedImage = function(image, offsetX, offsetY, width, height) {
    this.context.drawImage(image, offsetX || 0, offsetY || 0, width, height);
}

SheepyFrameHandler.prototype.getFrame = function() {
    return this.context;
}

module.exports = SheepyFrameHandler;