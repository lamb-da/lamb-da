# Lamb-da
Lamb-da provides Sheepy as a Service. It is a fork of https://parrotify.github.io/

## Lamb-da UI
You can use the [Lamb-da UI](https://lamb-da.github.io/) to create sheepys in a friendlier manner (see its [GitHub repo](https://github.com/lamb-da/lamb-da.github.io)).

## Basic call

https://lamb-da.herokuapp.com/sheepy

![Sheepy](https://lamb-da.herokuapp.com/sheepy "Sheepy")

## Overlay

You can add an overlay that follows the sheepy using the overlay query parameter:

https://lamb-da.herokuapp.com/sheepy?overlay=http://i.imgur.com/QJ41dQb.png

Here is the result: ![Upvote Sheepy](https://lamb-da.herokuapp.com/sheepy?overlay=http://i.imgur.com/QJ41dQb.png "Upvote Sheepy")

The image is not shown because it is too big and is not rendered in the canvas.

### Overlay Parameters

To solve this problem, it is possible to adjust it the overlay with the following parameters:

* overlayHeight
* overlayWidth
* overlayOffsetX
* overlayOffsetY
* flipOverlayY
* flipOverlayX

https://lamb-da.herokuapp.com/sheepy?overlay=http://i.imgur.com/QJ41dQb.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-3

Here is the result: ![Upvote Sheepy](https://lamb-da.herokuapp.com/sheepy?overlay=http://i.imgur.com/QJ41dQb.png&overlayWidth=15&overlayHeight=15&overlayOffsetX=-7&overlayOffsetY=-3 "Upvote Sheepy")

## Delay

You can adjust the delay between frames using the delay query parameter: 

https://lamb-da.herokuapp.com/sheepy?delay=20

Here is the result: ![Fast Sheepy](https://lamb-da.herokuapp.com/sheepy?delay=20 "Fast Sheepy")

## Base Sheepy

You can change the base sheepy using `/sheepy/:basesheepy`. 

The list of supported base sheepys is in the `basesheepys` folder.

Note that the changing the base sheepy also supports all the other parameters.

https://lamb-da.herokuapp.com/sheepy/rightsheepy

Here is the result: ![Right Sheepy](https://lamb-da.herokuapp.com/sheepy/rightsheepy? "Right Sheepy")

For a bigger :

https://lamb-da.herokuapp.com/sheepy/mega?overlay=http://vignette3.wikia.nocookie.net/runescape2/images/0/0a/Wizard_hat_(t)_detail.png&overlayWidth=100&overlayHeight=100&overlayOffsetY=-150

![Mega Wizard Sheepy](https://lamb-da.herokuapp.com/sheepy/mega?overlay=http://vignette3.wikia.nocookie.net/runescape2/images/0/0a/Wizard_hat_(t)_detail.png&overlayWidth=100&overlayHeight=100&overlayOffsetY=-150? "Mega Wizard Sheepy")

https://lamb-da.herokuapp.com/basesheepys returns the list of available sheepys.
