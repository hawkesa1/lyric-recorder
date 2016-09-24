var waveForm;

var mp3Location = "./resources/convertedMp3/";
var downloadableMp3Location = "./resources/downloadableMp3/";

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
var currentLineIndex = 0;
var currentWordIndex = 0;

var trackDuration = 0;
var currentLyricView = "";

var previousPlayingWordId = "";
var nextWordToAddId = "";
var highestEndTime = 0;
var lastAddedWordId = "";

var availableTracks = new Array();
var ECLIPSE_FILE_WAIT = 5000;
var markerWordAtTheEnd; // put a word at the end so you cant drag beyond it


function animate() {
	requestAnimationFrame(animate);
	draw();
}

function draw() {
	lyricTracker.canvas.context.clearRect(0, 0, lyricTracker.canvas.width, lyricTracker.canvas.height);
	waveForm.draw($("#audio").prop("currentTime") * 1000, lyricTracker.canvas.context);
}
