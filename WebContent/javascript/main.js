var canvas1;
var canvas1Height = 335;
var canvas1Width = 800;

$(document).ready(function($) {
	console.log("The Document is Ready!");
	loadUploader();
	addCanvasToPage();
});

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



