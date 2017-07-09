function drawIt1(ctx3, currentAudioTime, lines) {

	setBackgroundImageRotation(parameterValues.backgroundImageRotation);
	setBackgroundImageRepeat(parameterValues.backgroundRepeat);
	setBackgroundContainerSize(parameterValues.backgroundContainerWidth,
			parameterValues.backgroundContainerHeight);
	setBackgroundImageSize(parameterValues.backgroundImageHeight,
			parameterValues.backgroundImageWidth);
	setBackgroundImagePosition(parameterValues.backgroundImagePositionX,
			parameterValues.backgroundImagePositionY);
	setBackgroundContainerPosition(
			parameterValues.backgroundContainerPositionY,
			parameterValues.backgroundContainerPositionX)

	ctx3.clearRect(0, 0, ctx3.canvas.clientWidth, ctx3.canvas.clientHeight);

	ctx3.save();
	ctx3.globalAlpha = parameterValues.backgroundOpacity;
	ctx3.fillStyle = parameterValues.backgroundColour;

	if (parameterValues.backgroundShadowShow) {
		ctx3.shadowColor = parameterValues.backgroundShadowColour;
		ctx3.shadowOffsetX = parameterValues.backgroundShadowOffsetX;
		ctx3.shadowOffsetY = parameterValues.backgroundShadowOffsetY;
		ctx3.shadowBlur = parameterValues.backgroundShadowBlur;
	}
	ctx3.fillRect(parameterValues.textX, parameterValues.textY - 40,
			parameterValues.textWidth, parameterValues.textHeight);
	ctx3.restore();

	var aLine;
	var aWord;
	var xPosition = parameterValues.textX - 0 + 10;
	var yPosition = parameterValues.textY - 0;

	var wordWidth = 0;
	var wordSpace = 0;
	var wordWidth1 = 0;

	var currentLineWidth = 0;

	for (var i = 0; i < lines.length; i++) {

		aLine = lines[i];

		if (aLine.startTime < currentAudioTime
				&& aLine.endTime > currentAudioTime) {
			for (var j = 0; j < aLine.words.length; j++) {
				aWord = aLine.words[j];
				ctx3.font = parameterValues.fontSize + "px "
						+ parameterValues.fontFamily;

				currentLineWidth += ctx3.measureText(aWord.word).width;

				if (currentLineWidth >= (parameterValues.textWidth)) {
					currentLineWidth = ctx3.measureText(aWord.word).width
							+ (parameterValues.characterSpacing - 0);
					xPosition = (parameterValues.textX - 0 + 10);
					yPosition = yPosition + (parameterValues.lineHeight - 0);
				} else {
					currentLineWidth += (parameterValues.characterSpacing - 0);
				}
				if (aWord.startTime < currentAudioTime
						&& aWord.endTime > currentAudioTime) {
					xPosition = drawSelectedText(aWord, currentAudioTime, ctx3, xPosition, yPosition);
				} else {

					xPosition = drawUnselectedText(aWord, currentAudioTime, ctx3, xPosition, yPosition);
				}
			}
		}
	}
	return ctx3;
}

function drawUnselectedText(aWord, currentAudioTime, ctx3, xPosition, yPosition) {
	ctx3.save();
	if (parameterValues.unselectedShadowShow) {
		ctx3.shadowColor = parameterValues.unselectedShadowColour;
		ctx3.shadowOffsetX = parameterValues.unselectedShadowOffsetX;
		ctx3.shadowOffsetY = parameterValues.unselectedShadowOffsetY;
		ctx3.shadowBlur = parameterValues.unselectedShadowBlur;
	}
	ctx3.font = parameterValues.fontSize + "px " + parameterValues.fontFamily;
	ctx3.textBaseline = 'alphabetic';
	ctx3.globalAlpha = parameterValues.unselectedOpacity;
	ctx3.fillStyle = parameterValues.unselectedFontColour;
	ctx3.fillText(aWord.word, xPosition, yPosition);
	ctx3.restore();
	xPosition = xPosition + ctx3.measureText(aWord.word).width
			+ (parameterValues.characterSpacing - 0);
	ctx3.restore();
	return xPosition;
}
var easingFunction="easeOutBounce";

function drawSelectedText(aWord, currentAudioTime, ctx3, xPosition, yPosition) {
	ctx3.save();
	var wordWidth = ctx3.measureText(aWord.word).width;
	if (parameterValues.selectedShadowShow) {
		ctx3.shadowColor = parameterValues.selectedShadowColour;
		ctx3.shadowOffsetX = parameterValues.selectedShadowOffsetX;
		ctx3.shadowOffsetY = parameterValues.selectedShadowOffsetY;
		ctx3.shadowBlur = parameterValues.selectedShadowBlur;
	}
	ctx3.font = parameterValues.fontSize + "px " + parameterValues.fontFamily;
	ctx3.textBaseline = 'alphabetic';
	ctx3.globalAlpha = parameterValues.selectedOpacity;
	ctx3.fillStyle = parameterValues.selectedFontColour;
	selectedFontSize = parseInt(parameterValues.fontSize) + 0;
	var easingAmount = 0;
	//var easingDuration=(aWord.endTime - aWord.startTime);
	
	easingAmount = $.easing[parameterValues.selectedEasingFunction](0,
			(currentAudioTime - aWord.startTime), 0, parameterValues.fontSizeIncrease,
			parameterValues.selectedEasingDuration);
	
	
	easingAmount=easingAmount||0;
	console.log(easingAmount);
	
	selectedFontSize = selectedFontSize + easingAmount;
	console.log("selectedFontSize=" + selectedFontSize);
	ctx3.font = selectedFontSize + "px " + parameterValues.fontFamily;
	wordSpace = ctx3.measureText(aWord.word).width - wordWidth;
	ctx3.fillText(aWord.word, (xPosition- (easingAmount)), (yPosition + (easingAmount/2)));

	xPosition = xPosition + ctx3.measureText(aWord.word).width
			+ ((parameterValues.characterSpacing - 0) - wordSpace);

	ctx3.restore();
	return xPosition;
}

function setBackgroundImageSize(width, height) {
	$("#backgroundImageContainer").css("background-size",
			height + "px " + width + "px");
}

function setBackgroundContainerPosition(top, left) {
	$("#backgroundImageContainer").css("top", top + "px");
	$("#backgroundImageContainer").css("left", left + "px");
}
function setBackgroundContainerSize(width, height) {
	$("#backgroundImageContainer").width(width + "px");
	$("#backgroundImageContainer").height(height + "px");
}

function setBackgroundImagePosition(x, y) {
	$("#backgroundImageContainer").css("background-position",
			x + "px " + y + "px");
}

function setBackgroundImageRepeat(backgroundRepeat) {
	$("#backgroundImageContainer").css("background-repeat", backgroundRepeat);
}

function setBackgroundImageRotation(rotiationInDegrees) {
	$('#backgroundImageContainer').css({
		'-webkit-transform' : 'rotate(' + rotiationInDegrees + 'deg)',
		'-moz-transform' : 'rotate(' + rotiationInDegrees + 'deg)',
		'-ms-transform' : 'rotate(' + rotiationInDegrees + 'deg)',
		'transform' : 'rotate(' + rotiationInDegrees + 'deg)',
		'-ms-transform-origin' : '400px 300px',
		'-webkit-transform-origin' : '400px 300px',
		'transform-origin' : '400px 300px'

	});
}
