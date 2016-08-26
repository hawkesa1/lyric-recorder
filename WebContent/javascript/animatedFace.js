function drawFace(talking) {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var centerX = canvas.width / 2;
	var centerY = canvas.height / 2;
	var radius = 70;

	context.clearRect(0, 0, canvas.width, canvas.height);
	
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'green';
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = '#003300';
	context.stroke();

	radius = 20;
	context.beginPath();
	context.arc(centerX - 30, centerY - 20, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'white';
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = '#003300';
	context.stroke();

	radius = 20;
	context.beginPath();
	context.arc(centerX + 30, centerY - 20, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'white';
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = '#003300';
	context.stroke();

	if (talking) {
		radius = 30;
		context.beginPath();
		context.arc(centerX, centerY + 30, radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'white';
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = '#003300';
		context.stroke();
	} else {
		context.beginPath();
		context.moveTo(centerX - 30, centerY + 30);
		context.lineTo(centerX + 30, centerY + 30);
		context.stroke();
	}
}