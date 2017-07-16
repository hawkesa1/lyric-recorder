var BACKGROUND_IMAGE_LOCATION = "/images/";
var BACKROUND_IMAGE_STORE;
var parameterValues = {};
var parameterSnapshots = {
	"snapshots" : []
};

// numberOfLinesToDisplay
// graduatedWordColour
// graduatedWordOpacity
// graduatedWordEasingFunction
// graduatedWordThreshold
// graduatedWordType

var parameterInitialiser = {
	"groups" : [

	{
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
				"no-repeat" : "No Repeat",
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
			"defaultValue" : 800,
			"action" : "input"

		}, {
			"label" : "Background Image Height",
			"name" : "backgroundImageHeight",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : 600,
			"action" : "input"

		}, {
			"label" : "Background Position X",
			"name" : "backgroundImagePositionX",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : 800,
			"action" : "input"

		}, {
			"label" : "Background Position Y",
			"name" : "backgroundImagePositionY",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : 800,
			"action" : "input"

		}, {
			"label" : "Container Width",
			"name" : "backgroundContainerWidth",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : 800,
			"action" : "input"

		}, {
			"label" : "Container Height",
			"name" : "backgroundContainerHeight",
			"type" : "range",
			"min" : 0,
			"max" : 2000,
			"step" : 1,
			"defaultValue" : 600,
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
				"Script MT" : "Script MT"
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
			"action" : "input"
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
			"min" : 0,
			"max" : 10,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Offset Y",
			"name" : "selectedShadowOffsetY",
			"type" : "range",
			"min" : 0,
			"max" : 10,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Blur",
			"name" : "selectedShadowBlur",
			"type" : "range",
			"min" : 0,
			"max" : 20,
			"step" : 1,
			"defaultValue" : 7,
			"action" : "input"
		} ]
	}, {
		"label" : "Unselected Font Options",
		"id" : "unselectedFontOptions",
		"parameters" : [ {
			"label" : "Font Colour",
			"name" : "unselectedFontColour",
			"type" : "color",
			"defaultValue" : "#ffffff",
			"action" : "input"
		}, {
			"label" : "Shadow",
			"name" : "unselectedShadowShow",
			"type" : "checkbox",
			"defaultValue" : "checked",
			"action" : "input"
		}, {
			"label" : "Shadow Colour",
			"name" : "unselectedShadowColour",
			"type" : "color",
			"defaultValue" : "#000000",
			"action" : "input"
		}, {
			"label" : "Shadow Offset X",
			"name" : "unselectedShadowOffsetX",
			"type" : "range",
			"min" : 0,
			"max" : 10,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Offset Y",
			"name" : "unselectedShadowOffsetY",
			"type" : "range",
			"min" : 0,
			"max" : 10,
			"step" : 1,
			"defaultValue" : 5,
			"action" : "input"
		}, {
			"label" : "Shadow Blur",
			"name" : "unselectedShadowBlur",
			"type" : "range",
			"min" : 0,
			"max" : 20,
			"step" : 1,
			"defaultValue" : 7,
			"action" : "input"
		}, {
			"label" : "Opacity",
			"name" : "unselectedOpacity",
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
			"max" : 800,
			"step" : 1,
			"defaultValue" : 20,
			"action" : "input"
		}, {
			"label" : "Position Y",
			"name" : "textY",
			"type" : "range",
			"min" : 0,
			"max" : 600,
			"step" : 1,
			"defaultValue" : 60,
			"action" : "input"
		}, {
			"label" : "Width",
			"name" : "textWidth",
			"type" : "range",
			"min" : 0,
			"max" : 800,
			"step" : 1,
			"defaultValue" : 300,
			"action" : "input"
		}, {
			"label" : "Height",
			"name" : "textHeight",
			"type" : "range",
			"min" : 0,
			"max" : 600,
			"step" : 1,
			"defaultValue" : 300,
			"action" : "input"
		}, {
			"label" : "Shadow",
			"name" : "backgroundShadowShow",
			"type" : "checkbox",
			"defaultValue" : "checked",
			"action" : "input"
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
	} ]
};

function initialiseParameters() {
	var groups = parameterInitialiser.groups;
	var html = "";

	// Create the html objects
	for (var i = 0; i < groups.length; i++) {
		html += createParameterGroup(groups[i]);
	}

	$('#videoControls').html($('#videoControls').html() + html);
	// $('#controls').html($('#controls').html() + html);

	// Bind the events
	for (var i = 0; i < groups.length; i++) {
		createParameterGroupEvents(groups[i]);
	}
	createOtherEventListeners();

	// Collapse to start
	for (var i = 0; i < groups.length; i++) {
		$('#' + groups[i].id + '_content').hide();
	}

	loadParametersFromFile();
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
	$('#' + parameterGroup.id + '_title').on(
			'click',
			function() {
				$('#' + parameterGroup.id + '_content').toggle("slow",
						function() {
							// Animation complete.
						});
				$(".parameterGroupContent").each(
						function(index) {
							if ($(this).attr('id') != parameterGroup.id
									+ '_content') {
								console.log($(this).attr('id') + " "
										+ parameterGroup.id + '_content');

								$(this).hide("slow", function() {
									// Animation complete.
								});
							}
						});
				// console.log("Hid: " + parameterGroup.id + '_content');
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
					drawIt1(videoContext,
							$("#audio").prop("currentTime") * 1000,
							currentStateStore.lineArray)
				})
	} else if (type == "checkbox") {
		$('#' + parameterName).on(
				action,
				function() {
					parameterValues[parameterName] = this.checked;
					drawIt1(videoContext, (1100 / 60) * 1000,
							currentStateStore.lineArray);
				})
	} else if (type == "file") {
		$('#' + parameterName).on(action, function(event) {
			// Prevent default as you can't update a file tag programatically
			event.preventDefault();
			console.log("Changed to:" + this.value);
			if (this.value) {
				parameterValues[parameterName] = this.value;
			} else {
				parameterValues[parameterName] = BACKROUND_IMAGE_STORE
			}
			console.log("Changed to:" + parameterValues[parameterName]);
		})
	} else if (type == "select") {
		$('#' + parameterName).on(
				action,
				function() {
					console.log("Changed to:" + this.value);
					parameterValues[parameterName] = this.value;
					drawIt1(videoContext,
							$("#audio").prop("currentTime") * 1000,
							currentStateStore.lineArray)
				})

	} else if (type == "font") {
		$('#' + parameterName).on(
				action,
				function() {
					console.log("Changed to:" + this.value);
					parameterValues[parameterName] = this.value;
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
						setBackgroundImage1(this.result, 800, 600);
					}
				}

				uploadFile();

				drawIt1(videoContext, $("#audio").prop("currentTime") * 1000,
						currentStateStore.lineArray)
			})

	$('#' + 'printParameters').on('click', function() {
		console.log(parameterValues);
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
	$.getJSON("resources/videoScripts/test1.json" + ts, function(data) {
		console.log(data);
		loadParameterSnapshot(data.snapshots[0]);
	});
}

var parameterSnapshotId = 0;

function loadParameterSnapshot(parameterSnapshot) {
	for ( var key in parameterSnapshot.parameterValues) {
		if (key == "backgroundImage") {
			console.log("About to set background image to:"
					+ parameterSnapshot.parameterValues[key]);
			BACKROUND_IMAGE_STORE = parameterSnapshot.parameterValues[key];
			setBackgroundImage(parameterSnapshot.parameterValues[key], 800, 600);

			// $('#' + key).val(parameterSnapshot.parameterValues[key]);
			$('#' + key).trigger('input');

		} else {
			$('#' + key).val(parameterSnapshot.parameterValues[key]);
			$('#' + key).trigger('input');
		}
	}
}

// When called from the file upload
function setBackgroundImage1(imageUrl) {
	$("#backgroundImageContainer").css("background-image",
			"url(" + imageUrl + ")");

}
function setBackgroundImage(imageUrl) {
	imageURL = "./images/" + imageUrl;
	console.log("Setting backfround to: " + imageURL);
	$("#backgroundImageContainer").css("background-image",
			"url('" + imageURL + "')");
}

function getParameterSnapshotObject() {
	var newSnapshot = {};
	for ( var key in parameterValues) {
		console.log("Settingz: " + key + " to " + parameterValues[key]);
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
		console.log("Settingz: " + key + " to " + parameterValues[key]);
		newSnapshot[key] = parameterValues[key];
	}
	parameterSnapshots.snapshots.push({
		id : parameterSnapshotId,
		parameterValues : newSnapshot
	});
	console.log(parameterSnapshots);
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
	} else if (parameterType == "range") {
		html += "<input type='range' id='" + parameterName + "' name='"
				+ parameterName + "' value='" + parameterValue + "' min='"
				+ parameterMin + "' max='" + parameterMax + "' step='"
				+ parameterStep + "'></input>";
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
	}
	return html;
}

function uploadFile() {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', './FileReceiver');
	xhr.onload = function(progressEvent) {
		if (progressEvent.target.response == "ERROR") {
			console.log("Some sort of error occurred");
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
