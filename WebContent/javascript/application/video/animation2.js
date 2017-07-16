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
	word1Context.clearRect(0, 0, word1Context.canvas.clientWidth,
			word1Context.canvas.clientHeight);

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
	

	

	for (var i = 0; i < lines.length; i++) {

		aLine = lines[i];

		// If this is the current line
		if (aLine.startTime < currentAudioTime
				&& aLine.endTime > currentAudioTime) {
			
			drawLine(ctx3, currentAudioTime, aLine, parameterValues.textY - 0);
			drawLine(ctx3, currentAudioTime, lines[i+1], parameterValues.textY - 0+(parameterValues.lineHeight-0));
			drawLine(ctx3, currentAudioTime, lines[i+1], parameterValues.textY - 0+((parameterValues.lineHeight-0)*2));
		}
	}
	return ctx3;
}


function drawLine(ctx3, currentAudioTime, aLine, thisLineYPosition)
{
	var currentLineWidth = 0;
	var aWord;
	var xPosition = parameterValues.textX - 0 + 10;

	var wordWidth = 0;
	var wordSpace = 0;
	var wordWidth1 = 0;
	
	// for each word
	for (var j = 0; j < aLine.words.length; j++) {
		aWord = aLine.words[j];
		ctx3.font = parameterValues.fontSize + "px "
				+ parameterValues.fontFamily;
		//add this word to the current line and measure the width
		currentLineWidth += ctx3.measureText(aWord.word).width;
		
		//if the line width is wider than desired, start a new line
		if (currentLineWidth >= (parameterValues.textWidth)) {
			currentLineWidth = ctx3.measureText(aWord.word).width
					+ (parameterValues.characterSpacing - 0);
			xPosition = (parameterValues.textX - 0 + 10);
			thisLineYPosition = thisLineYPosition + (parameterValues.lineHeight - 0);
		} else {
			currentLineWidth += (parameterValues.characterSpacing - 0);
		}
		
		// if this is the current word
		if (aWord.startTime < currentAudioTime
				&& aWord.endTime > currentAudioTime) {
			xPosition = drawSelectedText(aWord, currentAudioTime, ctx3,
					xPosition, thisLineYPosition);
		} else {
			xPosition = drawUnselectedText(aWord, currentAudioTime,
					ctx3, xPosition, thisLineYPosition);
		}
	}
}



// numberOfLinesToDisplay
// graduatedWordColour
// graduatedWordOpacity
// graduatedWordEasingFunction
// graduatedWordThreshold
// graduatedWordType

function drawCoveredWord(aWord, xPosition, yPosition, selectedFontSize,
		theWordWidth, currentAudioTime) {

	word1Context.save();

	var percentComplete = (currentAudioTime - aWord.startTime)
			/ (aWord.endTime - aWord.startTime);
	console.log(percentComplete);
	word1Context.strokeStyle = 'rgba(0,0,0,0)';
	word1Context.beginPath();

	if (parameterValues.graduatedWordType == 'horizontal') {

		word1Context
				.rect(
						xPosition,
						((yPosition - selectedFontSize + 20) + (selectedFontSize - (selectedFontSize)
								* percentComplete)), (theWordWidth),
						(selectedFontSize) * percentComplete);
	} else if (parameterValues.graduatedWordType == 'vertical') {
		word1Context.rect((xPosition - 10), (yPosition - selectedFontSize),
				((theWordWidth * percentComplete) + 10),
				(selectedFontSize + 20));
	}
	word1Context.stroke();
	word1Context.clip();
	word1Context.closePath();
	// Draw red rectangle after clip()
	if (parameterValues.selectedShadowShow) {
		word1Context.shadowColor = parameterValues.selectedShadowColour;
		word1Context.shadowOffsetX = parameterValues.selectedShadowOffsetX;
		word1Context.shadowOffsetY = parameterValues.selectedShadowOffsetY;
		word1Context.shadowBlur = parameterValues.selectedShadowBlur;
	}

	word1Context.textBaseline = 'alphabetic';

	// word1Context.fillStyle = parameterValues.selectedFontColour;
	word1Context.fillStyle = parameterValues.graduatedWordColour;
	word1Context.globalAlpha = parameterValues.graduatedWordOpacity;

	// word1Context.fillStyle="red";
	// word1Context.fillRect(0,0,150,100);
	// word1Context.globalAlpha=0.9;
	word1Context.font = selectedFontSize + "px " + parameterValues.fontFamily;
	word1Context.fillText(aWord.word, xPosition, yPosition);

	word1Context.restore();
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
var easingFunction = "easeOutBounce";

function drawSelectedText(aWord, currentAudioTime, ctx3, xPosition, yPosition) {
	console.log("Draw Selected Word3");
	
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
	var endTimeA = (aWord.startTime - 0)
			+ (parameterValues.selectedEasingDuration - 0);

	if (currentAudioTime < endTimeA) {
		easingAmount = $.easing[parameterValues.selectedEasingFunction](0,
				(currentAudioTime - aWord.startTime), 0,
				parameterValues.fontSizeIncrease,
				parameterValues.selectedEasingDuration);
	} else {
		easingAmount = parameterValues.fontSizeIncrease - 0;
	}
	easingAmount = easingAmount || 0;
	
	selectedFontSize = selectedFontSize + easingAmount;
	ctx3.font = selectedFontSize + "px " + parameterValues.fontFamily;
	wordSpace = ctx3.measureText(aWord.word).width - wordWidth;
	ctx3.fillText(aWord.word, (xPosition - (easingAmount)),
			(yPosition + (easingAmount / 2)));

	if (parameterValues.graduatedWordType != "off") {
		if ((aWord.endTime - aWord.startTime) > parameterValues.graduatedWordThreshold) {
			drawCoveredWord(aWord, (xPosition - (easingAmount)),
					(yPosition + (easingAmount / 2)), selectedFontSize, ctx3
							.measureText(aWord.word).width, currentAudioTime);
		}
	}
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
