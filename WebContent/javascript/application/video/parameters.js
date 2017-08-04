var DEFAULT_CANVAS_WIDTH = 800;
var DEFAULT_CANVAS_HEIGHT = 600;
var videoScript = "resources/videoScripts/test2.json";

var BACKGROUND_IMAGE_LOCATION = "/images/";
var BACKROUND_IMAGE_STORE;
var parameterValues = {};
var parameterSnapshots = {
	"snapshots" : []
};

var parameterInitialiser = {
	"groups" : [ {
		"label" : "Line Options",
		"id" : "lineOptions",
		"parameters" : [ {
			"label" : "Lines Per Page",
			"name" : "linesPerPage",
			"type" : "numberOfLineRange",
			"min" : 1,
			"max" : 10,
			"step" : 1,
			"defaultValue" : 4,
			"action" : "input"
		}, {
			"label" : "Line Space",
			"name" : "newLineSpacing",
			"type" : "range",
			"min" : 0,
			"max" : 400,
			"step" : 1,
			"defaultValue" : 100,
			"action" : "input"
		}, {
			"label" : "Page Control",
			"name" : "pageControl",
			"type" : "pageControl",
			"action" : "input"
		} ]
	}, {
		"label" : "Graduated Select",
		"id" : "graduatedSelect",
		"parameters" : [ {
			"label" : "Graduated Word Type",
			"name" : "graduatedWordType",
			"type" : "select",
			"options" : {
				"off" : "off",
				"horizontal" : "horizontal",
				"vertical" : "vertical"
			},
			"action" : "input"
		}, {
			"label" : "Graduated Word Threshold",
			"name" : "graduatedWordThreshold",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : 200,
			"action" : "input"

		}, {
			"label" : "Easing Function",
			"name" : "graduatedWordEasingFunction",
			"type" : "select",
			"defaultValue" : "easeOutExpo",
			"options" : {
				"easeOutQuad" : "easeOutQuad",
				"easeInQuad" : "easeInQuad",
				"easeOutQuad" : "easeOutQuad",
				"easeInOutQuad" : "easeInOutQuad",
				"easeInCubic" : "easeInCubic",
				"easeOutCubic" : "easeOutCubic",
				"easeInOutCubic" : "easeInOutCubic",
				"easeInQuart" : "easeInQuart",
				"easeOutQuart" : "easeOutQuart",
				"easeInOutQuart" : "easeInOutQuart",
				"easeInQuint" : "easeInQuint",
				"easeOutQuint" : "easeOutQuint",
				"easeInOutQuint" : "easeInOutQuint",
				"easeInSine" : "easeInSine",
				"easeOutSine" : "easeOutSine",
				"easeInOutSine" : "easeInOutSine",
				"easeInExpo" : "easeInExpo",
				"easeOutExpo" : "easeOutExpo",
				"easeInOutExpo" : "easeInOutExpo",
				"easeInCirc" : "easeInCirc",
				"easeOutCirc" : "easeOutCirc",
				"easeInOutCirc" : "easeInOutCirc",
				"easeInElastic" : "easeInElastic",
				"easeOutElastic" : "easeOutElastic",
				"easeInOutElastic" : "easeInOutElastic",
				"easeInBack" : "easeInBack",
				"easeOutBack" : "easeOutBack",
				"easeInOutBack" : "easeInOutBack",
				"easeInBounce" : "easeInBounce",
				"easeOutBounce" : "easeOutBounce",
				"easeInOutBounce" : "easeInOutBounce"
			},
			"action" : "input"
		}, {
			"label" : "Opacity",
			"name" : "graduatedWordOpacity",
			"type" : "range",
			"min" : 0,
			"max" : 1,
			"step" : 0.1,
			"defaultValue" : 0.9,
			"action" : "input"
		}, {
			"label" : "Font Colour",
			"name" : "graduatedWordColour",
			"type" : "color",
			"defaultValue" : "#000000",
			"action" : "input"
		}, {
			"label" : "Shadow",
			"name" : "graduatedShadowShow",
			"type" : "checkbox",
			"defaultValue" : "checked",
			"action" : "click"
		}, {
			"label" : "Shadow Colour",
			"name" : "graduatedShadowColour",
			"type" : "color",
			"defaultValue" : "#000000",
			"action" : "input"
		}, {
			"label" : "Shadow Offset X",
			"name" : "graduatedShadowOffsetX",
			"type" : "range",
			"min" : -100,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Offset Y",
			"name" : "graduatedShadowOffsetY",
			"type" : "range",
			"min" : -100,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Blur",
			"name" : "graduatedShadowBlur",
			"type" : "range",
			"min" : 0,
			"max" : 30,
			"step" : 1,
			"defaultValue" : 7,
			"action" : "input"
		}

		]
	},

	{
		"label" : "Background",
		"id" : "background",
		"parameters" : [ {
			"label" : "Background Image",
			"name" : "backgroundImage",
			"type" : "file",
			"defaultValue" : "",
			"action" : "input"
		}, {
			"label" : "Repeat",
			"name" : "backgroundRepeat",
			"type" : "select",
			"options" : {
				"no-repeat" : "no-repeat",
				"repeat" : "Repeat",
				"repeat-x" : "Repeat X",
				"repeat-y" : "Repeat Y"
			},
			"action" : "input"
		}, {
			"label" : "Background Image Width",
			"name" : "backgroundImageWidth",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : DEFAULT_CANVAS_WIDTH,
			"action" : "input"

		}, {
			"label" : "Background Image Height",
			"name" : "backgroundImageHeight",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : DEFAULT_CANVAS_HEIGHT,
			"action" : "input"

		}, {
			"label" : "Background Position X",
			"name" : "backgroundImagePositionX",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : DEFAULT_CANVAS_WIDTH,
			"action" : "input"

		}, {
			"label" : "Background Position Y",
			"name" : "backgroundImagePositionY",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : DEFAULT_CANVAS_WIDTH,
			"action" : "input"

		}, {
			"label" : "Container Width",
			"name" : "backgroundContainerWidth",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : DEFAULT_CANVAS_WIDTH,
			"action" : "input"

		}, {
			"label" : "Container Height",
			"name" : "backgroundContainerHeight",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : DEFAULT_CANVAS_HEIGHT,
			"action" : "input"

		}, {
			"label" : "Container Position X",
			"name" : "backgroundContainerPositionX",
			"type" : "range",
			"min" : -2000,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : 0,
			"action" : "input"

		}, {
			"label" : "Container Position Y",
			"name" : "backgroundContainerPositionY",
			"type" : "range",
			"min" : -2000,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : 0,
			"action" : "input"

		}, {
			"label" : "Container Rotation",
			"name" : "backgroundImageRotation",
			"type" : "range",
			"min" : 0,
			"max" : 360,
			"step" : 1,
			"defaultValue" : 0,
			"action" : "input"

		} ]
	}, {
		"label" : "Selected Font Options",
		"id" : "selectedFontOptions",
		"parameters" : [ {
			"label" : "Font Family",
			"name" : "fontFamily",
			"type" : "font",
			"defaultValue" : "Comicate",
			"action" : "input",
			"options" : {
				"Comicate" : "Comicate",
				"Arial" : "Arial",
				"XXon XXoff" : "XXon XXoff",
				"C rial" : "C rial",
				"Wishing Well" : "Wishing Well",
				"80 Decibels" : "80 Decibels",
				"Gigi" : "Gigi",
				"Dancing in the Rainbow" : "Dancing in the Rainbow",
				"Millennial Solstice" : "Millennial Solstice",
				"Old English Text MT" : "Old English Text MT",
				"Ravie Regular" : "Ravie Regular",
				"Script MT" : "Script MT",
				"Oreos Outline Regular" : "Oreos",
				"Impact" : "Impact"
			},
		}, {
			"label" : "Easing Function",
			"name" : "selectedEasingFunction",
			"type" : "select",
			"defaultValue" : "easeOutExpo",
			"options" : {
				"easeOutQuad" : "easeOutQuad",
				"easeInQuad" : "easeInQuad",
				"easeOutQuad" : "easeOutQuad",
				"easeInOutQuad" : "easeInOutQuad",
				"easeInCubic" : "easeInCubic",
				"easeOutCubic" : "easeOutCubic",
				"easeInOutCubic" : "easeInOutCubic",
				"easeInQuart" : "easeInQuart",
				"easeOutQuart" : "easeOutQuart",
				"easeInOutQuart" : "easeInOutQuart",
				"easeInQuint" : "easeInQuint",
				"easeOutQuint" : "easeOutQuint",
				"easeInOutQuint" : "easeInOutQuint",
				"easeInSine" : "easeInSine",
				"easeOutSine" : "easeOutSine",
				"easeInOutSine" : "easeInOutSine",
				"easeInExpo" : "easeInExpo",
				"easeOutExpo" : "easeOutExpo",
				"easeInOutExpo" : "easeInOutExpo",
				"easeInCirc" : "easeInCirc",
				"easeOutCirc" : "easeOutCirc",
				"easeInOutCirc" : "easeInOutCirc",
				"easeInElastic" : "easeInElastic",
				"easeOutElastic" : "easeOutElastic",
				"easeInOutElastic" : "easeInOutElastic",
				"easeInBack" : "easeInBack",
				"easeOutBack" : "easeOutBack",
				"easeInOutBack" : "easeInOutBack",
				"easeInBounce" : "easeInBounce",
				"easeOutBounce" : "easeOutBounce",
				"easeInOutBounce" : "easeInOutBounce"
			},
			"action" : "input"
		}, {
			"label" : "Easing Duration (ms)",
			"name" : "selectedEasingDuration",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : 500,
			"action" : "input"
		}, {
			"label" : "Opacity",
			"name" : "selectedOpacity",
			"type" : "range",
			"min" : 0,
			"max" : 1,
			"step" : 0.1,
			"defaultValue" : 0.9,
			"action" : "input"
		}, {
			"label" : "Font Colour",
			"name" : "selectedFontColour",
			"type" : "color",
			"defaultValue" : "#000000",
			"action" : "input"
		}, {
			"label" : "Line Height",
			"name" : "lineHeight",
			"type" : "range",
			"min" : 0,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 40,
			"action" : "input"
		}, {
			"label" : "Character Spacing",
			"name" : "characterSpacing",
			"type" : "range",
			"min" : 0,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 30,
			"action" : "input"
		}, {
			"label" : "Font Size",
			"name" : "fontSize",
			"type" : "range",
			"min" : 0,
			"max" : 400,
			"step" : 1,
			"defaultValue" : 40,
			"action" : "input"
		}, {
			"label" : "Font Size Increase",
			"name" : "fontSizeIncrease",
			"type" : "range",
			"min" : 0,
			"max" : 50,
			"step" : 1,
			"defaultValue" : 10,
			"action" : "input"
		}, {
			"label" : "Shadow",
			"name" : "selectedShadowShow",
			"type" : "checkbox",
			"defaultValue" : "checked",
			"action" : "click"
		}, {
			"label" : "Shadow Colour",
			"name" : "selectedShadowColour",
			"type" : "color",
			"defaultValue" : "#000000",
			"action" : "input"
		}, {
			"label" : "Shadow Offset X",
			"name" : "selectedShadowOffsetX",
			"type" : "range",
			"min" : -100,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Offset Y",
			"name" : "selectedShadowOffsetY",
			"type" : "range",
			"min" : -100,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Blur",
			"name" : "selectedShadowBlur",
			"type" : "range",
			"min" : 0,
			"max" : 30,
			"step" : 1,
			"defaultValue" : 7,
			"action" : "input"
		} ]
	}, {
		"label" : "Unselected Font Options (Past)",
		"id" : "unselectedFontOptionsPast",
		"parameters" : [ {
			"label" : "Font Colour",
			"name" : "unselectedFontColourPast",
			"type" : "color",
			"defaultValue" : "#ffffff",
			"action" : "input"
		}, {
			"label" : "Shadow",
			"name" : "unselectedShadowShowPast",
			"type" : "checkbox",
			"defaultValue" : "checked",
			"action" : "click"
		}, {
			"label" : "Shadow Colour",
			"name" : "unselectedShadowColourPast",
			"type" : "color",
			"defaultValue" : "#000000",
			"action" : "input"
		}, {
			"label" : "Shadow Offset X",
			"name" : "unselectedShadowOffsetXPast",
			"type" : "range",
			"min" : -100,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Offset Y",
			"name" : "unselectedShadowOffsetYPast",
			"type" : "range",
			"min" : -100,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Blur",
			"name" : "unselectedShadowBlurPast",
			"type" : "range",
			"min" : 0,
			"max" : 30,
			"step" : 1,
			"defaultValue" : 7,
			"action" : "input"
		}, {
			"label" : "Opacity",
			"name" : "unselectedOpacityPast",
			"type" : "range",
			"min" : 0,
			"max" : 1,
			"step" : 0.1,
			"defaultValue" : 0.9,
			"action" : "input"
		} ]
	}, {
		"label" : "Unselected Font Options (Future)",
		"id" : "unselectedFontOptionsFuture",
		"parameters" : [ {
			"label" : "Font Colour",
			"name" : "unselectedFontColourFuture",
			"type" : "color",
			"defaultValue" : "#ffffff",
			"action" : "input"
		}, {
			"label" : "Shadow",
			"name" : "unselectedShadowShowFuture",
			"type" : "checkbox",
			"defaultValue" : "checked",
			"action" : "click"
		}, {
			"label" : "Shadow Colour",
			"name" : "unselectedShadowColourFuture",
			"type" : "color",
			"defaultValue" : "#000000",
			"action" : "input"
		}, {
			"label" : "Shadow Offset X",
			"name" : "unselectedShadowOffsetXFuture",
			"type" : "range",
			"min" : -100,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Offset Y",
			"name" : "unselectedShadowOffsetYFuture",
			"type" : "range",
			"min" : -100,
			"max" : 100,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Blur",
			"name" : "unselectedShadowBlurFuture",
			"type" : "range",
			"min" : 0,
			"max" : 30,
			"step" : 1,
			"defaultValue" : 7,
			"action" : "input"
		}, {
			"label" : "Opacity",
			"name" : "unselectedOpacityFuture",
			"type" : "range",
			"min" : 0,
			"max" : 1,
			"step" : 0.1,
			"defaultValue" : 0.9,
			"action" : "input"
		} ]
	}, {
		"label" : "Text Position",
		"id" : "textPosition",
		"parameters" : [ {
			"label" : "Background Colour",
			"name" : "backgroundColour",
			"type" : "color",
			"defaultValue" : "#ffffff",
			"action" : "change"
		}, {
			"label" : "Position X",
			"name" : "textX",
			"type" : "range",
			"min" : 0,
			"max" : DEFAULT_CANVAS_WIDTH,
			"step" : 1,
			"defaultValue" : 20,
			"action" : "input"
		}, {
			"label" : "Position Y",
			"name" : "textY",
			"type" : "range",
			"min" : 0,
			"max" : DEFAULT_CANVAS_HEIGHT,
			"step" : 1,
			"defaultValue" : 60,
			"action" : "input"
		}, {
			"label" : "Width",
			"name" : "textWidth",
			"type" : "range",
			"min" : 0,
			"max" : DEFAULT_CANVAS_WIDTH,
			"step" : 1,
			"defaultValue" : 300,
			"action" : "input"
		}, {
			"label" : "Height",
			"name" : "textHeight",
			"type" : "range",
			"min" : 0,
			"max" : DEFAULT_CANVAS_HEIGHT,
			"step" : 1,
			"defaultValue" : 300,
			"action" : "input"
		}, {
			"label" : "Shadow",
			"name" : "backgroundShadowShow",
			"type" : "checkbox",
			"defaultValue" : "checked",
			"action" : "click"
		}, {
			"label" : "Shadow Colour",
			"name" : "backgroundShadowColour",
			"type" : "color",
			"defaultValue" : "#F8F8FF",
			"action" : "input"
		}, {
			"label" : "Shadow Offset X",
			"name" : "backgroundShadowOffsetX",
			"type" : "range",
			"min" : 0,
			"max" : 10,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Offset Y",
			"name" : "backgroundOffsetY",
			"type" : "range",
			"min" : 0,
			"max" : 10,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Blur",
			"name" : "backgroundShadowBlur",
			"type" : "range",
			"min" : 0,
			"max" : 20,
			"step" : 1,
			"defaultValue" : 7,
			"action" : "input"
		}, {
			"label" : "Opacity",
			"name" : "backgroundOpacity",
			"type" : "range",
			"min" : 0,
			"max" : 1,
			"step" : 0.1,
			"defaultValue" : 0.3,
			"action" : "input"
		} ]
	}, {
		"label" : "Video",
		"id" : "videoOptions",
		"parameters" : [ {
			"label" : "FPS",
			"name" : "videoFPS",
			"type" : "range",
			"min" : 0,
			"max" : 60,
			"step" : 1,
			"defaultValue" : 25,
			"action" : "input"
		}, {
			"label" : "width",
			"name" : "videoWidth",
			"type" : "range",
			"min" : 0,
			"max" : 1920,
			"step" : 1,
			"defaultValue" : 800,
			"action" : "input"
		}, {
			"label" : "videoHeight",
			"name" : "videoHeight",
			"type" : "range",
			"min" : 0,
			"max" : 1080,
			"step" : 1,
			"defaultValue" : 600,
			"action" : "input"
		}, {
			"label" : "first frame",
			"name" : "videoFirstFrame",
			"type" : "range",
			"min" : 0,
			"max" : 10000,
			"step" : 1,
			"defaultValue" : 0,
			"action" : "input"
		}, {
			"label" : "last frame",
			"name" : "videoLastFrame",
			"type" : "range",
			"min" : 0,
			"max" : 10000,
			"step" : 1,
			"defaultValue" : 100,
			"action" : "input"
		} ]
	} ]
};

function initialiseParameters() {
	// initiate all the controls form the json
	var groups = parameterInitialiser.groups;
	var html = "";

	// Create the html objects
	for (var i = 0; i < groups.length; i++) {
		html += createParameterGroup(groups[i]);
	}

	printPages();

	$('#videoControls').html($('#videoControls').html() + html);

	// Bind the events
	for (var i = 0; i < groups.length; i++) {
		createParameterGroupEvents(groups[i]);
	}
	createOtherEventListeners();

	// Collapse to start
	for (var i = 0; i < groups.length; i++) {
		$('#' + groups[i].id + '_content').hide();
	}
}

function createParameterGroup(parameterGroup) {
	var parameters;
	var html = ""
	html += "<div>";
	html += "<p id='" + parameterGroup.id
			+ "_title' class='parameterGroupLabel'>" + parameterGroup.label
			+ "</p>";
	html += "<div class='parameterGroupContent' id='" + parameterGroup.id
			+ "_content'>";
	for (var i = 0; i < parameterGroup.parameters.length; i++) {
		parameters = parameterGroup.parameters[i];
		html += "<div>";
		html += createHtmlObject(parameters.label, parameters.name,
				parameters.type, parameters.defaultValue, parameters.min,
				parameters.max, parameters.step, parameters.options);
		html += "</div>";

		// Set the default value
		parameterValues[parameters.name] = parameters.defaultValue;
	}
	html += "</div>";
	html += "</div>";
	return html;
}

function createParameterGroupEvents(parameterGroup) {
	$('#' + parameterGroup.id + '_title').on('click', function() {
		$('#' + parameterGroup.id + '_content').toggle("slow", function() {
			// Animation complete.
		});
		$(".parameterGroupContent").each(function(index) {
			if ($(this).attr('id') != parameterGroup.id + '_content') {
				$(this).hide("slow", function() {
					// Animation complete.
				});
			}
		});
	})

	var parameters;
	for (var i = 0; i < parameterGroup.parameters.length; i++) {
		parameters = parameterGroup.parameters[i];
		createEventListener(parameters.name, parameters.action, parameters.type);
	}
}

function createEventListener(parameterName, action, type) {
	if (type == "range" || type == "color") {
		$('#' + parameterName).on(
				action,
				function() {
					parameterValues[parameterName] = this.value;
					$('#' + parameterName + "_value").html(this.value);
					drawIt1(videoContext,
							$("#audio").prop("currentTime") * 1000,
							currentStateStore.lineArray)
				})
	} else if (type == "checkbox") {
		$('#' + parameterName).on(
				action,
				function() {
					parameterValues[parameterName] = this.checked;
					drawIt1(videoContext,
							$("#audio").prop("currentTime") * 1000,
							currentStateStore.lineArray)
				})
	} else if (type == "file") {
		$('#' + parameterName).on(action, function(event) {
			// Prevent default as you can't update a file tag programatically
			event.preventDefault();
			if (this.value) {
				parameterValues[parameterName] = this.value;
			} else {
				parameterValues[parameterName] = BACKROUND_IMAGE_STORE
			}
		})
	} else if (type == "select") {
		$('#' + parameterName).on(
				action,
				function() {
					parameterValues[parameterName] = this.value;
					drawIt1(videoContext,
							$("#audio").prop("currentTime") * 1000,
							currentStateStore.lineArray)
				})

	} else if (type == "font") {
		$('#' + parameterName).on(
				action,
				function() {
					parameterValues[parameterName] = this.value;
					drawIt1(videoContext,
							$("#audio").prop("currentTime") * 1000,
							currentStateStore.lineArray)
				})

	}

	else if (type == "numberOfLineRange") {
		$('#' + parameterName).on(
				action,
				function() {
					console.log("Yoo");
					parameterValues[parameterName] = this.value;
					$('#' + parameterName + "_value").html(this.value);
					generateNewPages();
					drawIt1(videoContext,
							$("#audio").prop("currentTime") * 1000,
							currentStateStore.lineArray)
				})
	}

}

function createOtherEventListeners() {
	$('#' + 'backgroundImage').on(
			'change',
			function() {
				var files = !!this.files ? this.files : [];
				if (!files.length || !window.FileReader)
					return;
				if (/^image/.test(files[0].type)) {
					var reader = new FileReader();
					reader.readAsDataURL(files[0]);
					parameterValues['backgroundImage'] = files[0].name;
					reader.onloadend = function() {
						setBackgroundImage1(this.result, DEFAULT_CANVAS_WIDTH,
								DEFAULT_CANVAS_HEIGHT);
					}
				}

				uploadFile();
				drawIt1(videoContext, $("#audio").prop("currentTime") * 1000,
						currentStateStore.lineArray)
			})

	$('#' + 'printParameters').on('click', function() {
	})
	$('#' + 'recordParameters').on('click', function() {
		createParameterSnapshot();
	})
	$('#' + 'applyParameters').on('click', function() {
		var parameterSnapshot = parameterSnapshots.snapshots[0];
		loadParameterSnapshot(parameterSnapshot);
	})
	$('#' + 'loadParameters').on('click', function() {
		loadParametersFromFile();
	})
}

function loadParametersFromFile() {
	var ts = new Date().getTime();
	ts = '?' + ts;
	console.log("videoScript:" + videoScript);
	$.getJSON(videoScript + ts, function(data) {
		loadParameterSnapshot(data.videoSnapshot.snapshots[0]);
		currentStateStore.lineArray = data.lyricRecorderSynchronisedLyrics;
		if (data.pages) {
			console.log(data.pages);
			loadPages(data.pages);
		} else {
			generateNewPages()
		}
	});
}

function loadDefaultParametersFromFile(theVideoScript) {
	var ts = new Date().getTime();
	ts = '?' + ts;
	console.log("videoScript:" + theVideoScript);
	$.getJSON(theVideoScript + ts, function(data) {
		loadParameterSnapshot(data.videoSnapshot.snapshots[0]);
	});
}

function loadAllParametersFromFile(theVideoScript) {
	var ts = new Date().getTime();
	ts = '?' + ts;
	console.log("videoScript:" + theVideoScript);
	$.getJSON(theVideoScript + ts, function(data) {
		currentStateStore.trackMetaData = data;
		currentStateStore.lineArray = data.lyricRecorderSynchronisedLyrics;
		
		loadParameterSnapshot(data.videoSnapshot.snapshots[0]);
		
	});
}


var parameterSnapshotId = 0;
function loadPages(pages) {
	currentStateStore.book.pages = pages;
}

function loadParameterSnapshot(parameterSnapshot) {
	console.log(parameterSnapshot);
	for ( var key in parameterSnapshot.parameterValues) {
		if (key == "backgroundImage") {
			BACKROUND_IMAGE_STORE = parameterSnapshot.parameterValues[key];
			setBackgroundImage(parameterSnapshot.parameterValues[key],
					DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT);
			// $('#' + key).val(parameterSnapshot.parameterValues[key]);
			$('#' + key).trigger('input');

		} else {
			parameterValues[key] = parameterSnapshot.parameterValues[key];
			$('#' + key).val(parameterSnapshot.parameterValues[key]);
			$('#' + key).trigger('input');
		}
	}

	if (parameterSnapshot.pages) {
		console.log(parameterSnapshot.pages);
		loadPages(parameterSnapshot.pages);
	} else {
		generateNewPages()
	}
}

// When called from the file upload
function setBackgroundImage1(imageUrl) {
	$("#backgroundImageContainer").css("background-image",
			"url(" + imageUrl + ")");
	$("#backgroundImageContainer").css("background-image",
			"url(" + imageUrl + ")");

}
function setBackgroundImage(imageUrl) {
	imageURL = "./images/" + imageUrl;
	$("#backgroundImageContainer").css("background-image",
			"url('" + imageURL + "')");
}

function generateSingleSnapshot() {
	var newSnapshot = {};
	for ( var key in parameterValues) {
		newSnapshot[key] = parameterValues[key];
	}
	parameterSnapshots.snapshots[0] = {
		id : 0,
		parameterValues : newSnapshot
	};
	return parameterSnapshots;
}

function getParameterSnapshotObject() {
	var newSnapshot = {};
	for ( var key in parameterValues) {
		newSnapshot[key] = parameterValues[key];
	}
	parameterSnapshots.snapshots.push({
		id : parameterSnapshotId,
		parameterValues : newSnapshot
	});
	return parameterSnapshots;
}

function createParameterSnapshot() {
	var newSnapshot = {};
	for ( var key in parameterValues) {
		newSnapshot[key] = parameterValues[key];
	}
	parameterSnapshots.snapshots.push({
		id : parameterSnapshotId,
		parameterValues : newSnapshot
	});
	download(JSON.stringify(parameterSnapshots), 'test.json',
			'application/json');
	parameterSnapshotId++;
}

function download(text, name, type) {
	var a = document.createElement("a");
	var file = new Blob([ text ], {
		type : type
	});
	a.href = URL.createObjectURL(file);
	a.download = name;
	a.click();
}

function createHtmlObject(parameterLabel, parameterName, parameterType,
		parameterValue, parameterMin, parameterMax, parameterStep,
		parameterOptions) {
	var html = "";
	html += parameterLabel + " ";
	if (parameterType == "color") {
		html += "<input type='color' id='" + parameterName + "' name='"
				+ parameterName + "' value='" + parameterValue + "'></input>";
	} else if (parameterType == "range" || parameterType == "numberOfLineRange") {
		html += "<input type='range' id='" + parameterName + "' name='"
				+ parameterName + "' value='" + parameterValue + "' min='"
				+ parameterMin + "' max='" + parameterMax + "' step='"
				+ parameterStep + "'></input>";

		html += "<span id='" + parameterName + "_value'>" + parameterValue
				+ "</span>"

	} else if (parameterType == "checkbox") {
		html += "<input type='checkbox' id='" + parameterName + "' name='"
				+ parameterName + "' value='" + parameterValue + "' "
				+ parameterValue + "></input>";
	} else if (parameterType == "file") {

		html += "<form enctype='multipart/form-data'>"
		html += "<input type='file' id='" + parameterName + "' name='"
				+ parameterName + "' value='" + parameterValue + "' "
				+ parameterValue + " accept='image/*'></input>";
		html += "</form>"
	} else if (parameterType == "select") {
		html += "<select id='" + parameterName + "' name='" + parameterName
				+ "'>";
		for ( var key in parameterOptions) {
			html += "<option value='" + key + "'>" + parameterOptions[key]
					+ "</option>";
		}
		html += "</select>";
	} else if (parameterType == "font") {
		html += "<select id='" + parameterName + "' name='" + parameterName
				+ "'>"
		for ( var key in parameterOptions) {
			html += "<option style=\"font-size: 20px; font-family: '" + key
					+ "'\" value='" + key + "'>" + parameterOptions[key]
					+ "</option>";
		}
		html += "</select>";
	} else if (parameterType == "pageControl") {
		html += "<div id='pageControl'></div>"
	}
	return html;
}

function uploadFile() {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', './FileReceiver');
	xhr.onload = function(progressEvent) {
		if (progressEvent.target.response == "ERROR") {

		} else {
			console.log(progressEvent.target.response);
			parameterValues['backgroundImage'] = progressEvent.target.response;
		}
	};
	xhr.onerror = function(event) {
		console.log("Ahh");
	};
	xhr.upload.onprogress = function(event) {
		if (event.lengthComputable) {
			var complete = (event.loaded / event.total * 100 | 0);
			console.log(complete);
		}
	}
	xhr.send(new FormData($('form')[0]));
}

function printPages() {
	var thePage;
	var html = "";
	for (var i = 0; i < currentStateStore.book.pages.length; i++) {
		thePage = currentStateStore.book.pages[i];
		html += "<p class='pageTitle'>Page " + i + "</p>";
		for (var j = 0; j < thePage.lines.length; j++) {
			if (i > 0) {
				html += "<span class='pageLine'>Line " + j + "</span>";
				html += "<a href=''>Move Up</a>";
			} else {
				html += "<span class='pageLine'>Line " + j + "</span>";
			}
			html += "<a href=''>Move Down</a>";
			html += "<BR>"
			console.log("Line: " + j)
		}
	}
	$('#pageControl').html(html);
}

function generateNewPages() {
	// clear the existing array
	currentStateStore.book.pages.length = 0;
	var linesPerPage = parameterValues.linesPerPage;
	var aLine;
	var currentPage = -1;
	console.log(currentStateStore.lineArray);
	for (var i = 0; i < currentStateStore.lineArray.length; i++) {
		aLine = currentStateStore.lineArray[i];
		if (i % linesPerPage === 0) {
			currentStateStore.book.pages.push({
				startTime : aLine.startTime,
				lines : [ i ]
			});
			if (linesPerPage == 1) {
				currentStateStore.book.pages[i].endTime = aLine.endTime;
			}
			currentPage++;
		} else {
			currentStateStore.book.pages[currentPage].lines.push(i);
			currentStateStore.book.pages[currentPage].endTime = aLine.endTime;
		}
	}
	console.log(currentStateStore.book.pages);
	printPages();
}
