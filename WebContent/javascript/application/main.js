var waveForm;

var mp3Location = "./resources/convertedMp3/";
var downloadableMp3Location = "./resources/downloadableMp3/";

var lineArray = new Array();
var onlyWordsArray = new Array();

function CurrentStateStore()
{
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
	var currentLyricView = "";
	var currentlyAddingWord = false;
	var markerWordAtTheEnd; 
	var ECLIPSE_FILE_WAIT = 5000;
	var trackDuration = 0;
	var nextWordToAddId = "";
	var highestEndTime = 0;
	var lastAddedWordId = "";
}


function animate() {
	requestAnimationFrame(animate);
	draw();
}

function draw() {
	lyricTracker.canvas.context.clearRect(0, 0, lyricTracker.canvas.width, lyricTracker.canvas.height);
	waveForm.draw($("#audio").prop("currentTime") * 1000, lyricTracker.canvas.context);
}
