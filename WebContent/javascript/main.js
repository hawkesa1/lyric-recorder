var windowWidth = 0;
var waveForm;
var canvas1, context1;
var touchDiv;
var mp3Location = "./resources/convertedMp3/";
var downloadableMp3Location = "./resources/downloadableMp3/";
var audioTime;
var lineArray = new Array();
var onlyWordsArray = new Array();
var stopAtTime;
var currentSongId;
var currentSelectedWordId = "";
var currentSelectedWord;

var currentSelectedWordNextWord = null;
var currentSelectedWordPreviousWord = null;

var currentPlayingWordId = "";
var currentHoveredWordId = "";
var currentDoubleClickedWordId = "";
var currentPlayingWord;

var startOfWordMouseDownX = 0;
var endOfWordMouseDownX = 0;
var middleOfWordMouseDownX = 0;
var trackingMouseDownX = 0;

var WAV_FILE_TIME_GAP = 10;
var DRAW_TIME_BY_PAGE_WIDTH = 0;
var POINT_SPACING = 2;
var X_MOVE = 0;
var arcRadius = 2;
var SHIFT_TO_FIX_LINE_THICKNESS = 0.5;

var screenPressed = false;
var startX = 0;
var veryStartX = 0;
var clickStartTime = 0;
var wasPaused = true;
var clickedWhilePausedX = 0;
var trackingClicked = 0;
var trackingSquareX = 0;

var hoverWhilePausedX = 0;
var doubleClickedWhilePausedX = 0;

var canvas1Height = 200;
var canvas1Width = 800;


var trackDuration = 0;

var currentLyricView = "";

var isAWordHovered = false;
var isAWordEdgeHovered = false;
var isAWordPlaying = false;
var previousPlayingWordId = "";

var nextWordToAddId = "";
var highestEndTime = 0;
var lastAddedWordId = "";

var theFillColour = "";
var theLineColour = "";
var availableTracks = new Array();

var ECLIPSE_FILE_WAIT = 5000;

var markerWordAtTheEnd; //put a word at the end so you cant drag beyond it


$(document).ready(function($) {
	
	
	console.log("The Document is Ready!");
	loadUploader();
	addCanvasToPage();
	bindCanvasTouchControls();
	// drawFace(false);
	bindKeyboadControls();
	
	//loadATrack("1474274553224");

	
});

var spaceIsDown=false;

function bindKeyboadControls() {
	$(document).keydown(function(e) {
		if (e.which == 32 && !spaceIsDown && currentLyricView === "WORD_VIEW") {
			console.log("space down");
			e.preventDefault();
			$('#addCurrentWord').mousedown();
			$('#addCurrentWord').addClass("activeProgramatically"); 
			spaceIsDown=true;
		}
	});
	$(document).keyup(function(e) {
		if (e.which == 32 && currentLyricView === "WORD_VIEW") {
			console.log("space released");
			$('#addCurrentWord').mouseup();
			$('#addCurrentWord').removeClass("activeProgramatically"); 
			spaceIsDown=false;
		}
	});
}

function addCanvasToPage() {
	canvas1 = document.createElement('canvas');
	canvas1.width = canvas1Width;
	canvas1.height = canvas1Height;
	canvas1.id = "canvas1";
	context1 = canvas1.getContext('2d');
	$('#canvasContainer').html(canvas1);
}

var audioTime;
function animate() {
	requestAnimationFrame(animate);
	audioTime = $("#audio").prop("currentTime") * 1000;
	draw();
}
function draw() {
	drawCanvas1(audioTime);

}
function drawCanvas1(time) {
	context1.clearRect(0, 0, canvas1.width, canvas1.height);
	$('#canvas1').css("background-color", $('#backgroundColor').val());
	waveForm.draw(time, context1);
}
