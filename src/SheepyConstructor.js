const GIFEncoder = require('gifencoder');
const SheepyFramesReader = require("./SheepyFramesReader");
const SheepyFrameHandler = require("./SheepyFrameHandler");
const SheepyConfig = require("./SheepyConfig");
const ImageFactory = require("./ImageFactory");
const config = require("./config");

function SheepyConstructor(writeStream, sheepyConstructorConfiguration) {
    this.imageFactory = new ImageFactory();
    this.setBaseSheepy("sheepy");
}

SheepyConstructor.prototype.start = function(writeStream, configuration) {
    this.encoder = new GIFEncoder(this.sheepyConfig.getWidth(), this.sheepyConfig.getHeight());
    this.encoder.createReadStream().pipe(writeStream);
    this.encoder.start();
    this.encoder.setTransparent("#000000");
    this.encoder.setRepeat(0);
    this.encoder.setDelay(configuration.delay || 40);
}

SheepyConstructor.prototype.setBaseSheepy = function(sheepyType) {
    this.sheepyConfig = new SheepyConfig(sheepyType);
}

SheepyConstructor.prototype.getFramesHandlers = function() {
    if(!this.sheepyFrameHandlers) {
        this.initializeFramesHandlers();
    }
    return this.sheepyFrameHandlers;
}

SheepyConstructor.prototype.initializeFramesHandlers = function() {
    let framesReader = new SheepyFramesReader(this.sheepyConfig);

    this.sheepyFrameHandlers = framesReader.getFrames().map((file) => {
        console.log(file);
        return this.imageFactory.fromFileSync(file);
    }).map((image) => {
        var frameHandler = new SheepyFrameHandler(this.sheepyConfig);
        frameHandler.addImage(image);
        return frameHandler;
    });
}

SheepyConstructor.prototype.addOverlayImage = function(overlay) {
    return this.imageFactory.get(overlay).then((image) => {
        this.getFramesHandlers().map(handler => {
            handler.addImage(image);
        });
    });
}

SheepyConstructor.prototype.addFollowingOverlayImage = function(overlay, offsetX, offsetY, width, height, flipX, flipY) {
    let followingFrames = this.sheepyConfig.getFollowingFrames();

    if(this.sheepyConfig.shouldFlipX()) {
        flipX = !flipX;
    }
    if(this.sheepyConfig.shouldFlipY()) {
        flipY = !flipY;
    }

    return this.imageFactory.get(overlay).then((image) => {
        let imageHeight = parseInt(height || image.height);
        let imageWidth = parseInt(width || image.width);

        let frameHandler = function(handler, frame) {
            let shouldFlipX = frame.flipX ? !flipX : flipX;
            let shouldFlipY = frame.flipY ? !flipY : flipY;

            handler.addResizedImage(image, 
                                    flipPositionIfActivated(frame.x, imageWidth, shouldFlipY) + (offsetX || 0), 
                                    flipPositionIfActivated(frame.y, imageHeight, shouldFlipX) + (offsetY || 0), 
                                    flipSizeIfActivated(imageWidth, shouldFlipY), 
                                    flipSizeIfActivated(imageHeight, shouldFlipX));
        }

        this.getFramesHandlers().map((handler, index) => {
            let currentFrame = followingFrames[index];
            if (currentFrame.multiple) {
                currentFrame.multiple.forEach(frame => {
                    frameHandler(handler, frame);
                })
            } else {
                frameHandler(handler, currentFrame);
            }
        });
    });
}

function flipPositionIfActivated(currentPosition, size, flip) {
    return flip ? (currentPosition + size) : currentPosition;
}

function flipSizeIfActivated(currentSize, flip) {
    return flip ? currentSize * -1 : currentSize;
}

SheepyConstructor.prototype.finish = function() {
    this.getFramesHandlers().forEach(handler => {
        this.encoder.addFrame(handler.getFrame());
    });
    this.encoder.finish();
}

module.exports = SheepyConstructor;