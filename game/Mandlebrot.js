let densitySlider
let smoothnessSlider
let mandlebrotSet
let density = 5
let smoothness = 20

let buton1X = 1030
let buton1Y = 300
let buton2X = 1030
let buton2Y = 360
let butonSize = 30

let xmin = -2
let size = 4
let ymin = -2
let smoothnessStep = 0

let zoomX = -500
let zoomY = -500

let zoomOnClick = false
let drawn = true

let s = "For optimal zoom, bring details to 5 and smoothness to 7.\n\nFor esthetic zoom, bring details to 10 and smoothness around 20."

function setup()
{
	createCanvas(1300,1000);
	background(0);
	noStroke();
	fill(255);
	rect(1000,0,300,1000);
	densitySlider = createSlider(1,10,5,1);
	smoothnessSlider = createSlider(7,100,7,1);
	densitySlider.position(1025,80);
	smoothnessSlider.position(1025,160);
	mandlebrotSet = new MandlebrotSet();
	mandlebrotSet.start();
}

function draw()
{

	if(mandlebrotSet.finished)
	{
		noStroke();
		fill(255);
		rect(1000,0,300,1000);
		fill(0);
		strokeWeight(255);
		text("                Details : " + densitySlider.value() + "\n      (more details = slower)",1010,50);
		text("            Smoothness : " + smoothnessSlider.value() + "\n(smoother processing = slower)",1010,130);
		text("Generate",1070,321);
		text("Zoom on click",1070,381);
		text(s,1010,500,280,400);
		smoothness = smoothnessSlider.value();
		density = densitySlider.value();
		fill(0,140,140)
		rect(buton1X,buton1Y,butonSize,butonSize);
		if(zoomOnClick)
		{
			fill(0,255,0)
			text("ON",1030,410);
		}
		else
		{
			fill(255,0,0)
			text("OFF",1030,410);
		}
		rect(buton2X,buton2Y,butonSize,butonSize);
	}
	else if(!mandlebrotSet.calculated)
	{
		stroke(0,0,255)
		strokeWeight(5)
		noFill()
		rect(zoomX,zoomY,400,400)
		mandlebrotSet.calculate(xmin,ymin,size,11-density,smoothness,smoothnessStep);
		smoothnessStep++;
		noStroke()
		fill(0,0,255,40)
		rect(zoomX+400*(smoothnessStep-1)/smoothness,zoomY,400/smoothness,400)
		if(smoothnessStep==smoothness)
		{
			smoothnessStep=0;
			mandlebrotSet.calculated=true;
			mandlebrotSet.map(xmin,ymin,size);
			background(0);
			noStroke();
			fill(255);
			rect(1000,0,300,1000);
		}
	}
	else
	{
		strokeWeight((11-density)/2)
		for(let i=0+((int)(mandlebrotSet.length*(smoothnessStep)/smoothness));i<((int)(mandlebrotSet.length*(smoothnessStep+1)/smoothness));i++)
		{
			if(mandlebrotSet.colorSet[i]==0)
			{
				stroke(0);
			}
			else
			{
			stroke((mandlebrotSet.colorSet[i]*2)%256,(mandlebrotSet.colorSet[i]*5)%256,(mandlebrotSet.colorSet[i]*7)%256);
			}

			point(mandlebrotSet.Xset[i],mandlebrotSet.Yset[i]);
		}
		smoothnessStep++;
		if(smoothnessStep==smoothness)
		{
			smoothnessStep=0;
			mandlebrotSet.finished=true;
		}
	}
}

function mousePressed()
{
    if(mandlebrotSet.finished)
    {
        if((mouseX >=  buton1X ) && (mouseX <= buton1X + butonSize ) && (mouseY >= buton1Y ) && (mouseY <= buton1Y + butonSize ))
        {
			noStroke();
			fill(255);
			rect(1000,0,300,1000);
			mandlebrotSet = new MandlebrotSet();
            mandlebrotSet.start();
		}

        if((mouseX >=  buton2X ) && (mouseX <= buton2X + butonSize ) && (mouseY >= buton2Y ) && (mouseY <= buton2Y + butonSize ))
        {
			zoomOnClick=!zoomOnClick;
		}

		if(((mouseX >=  0 ) && (mouseX <= 1000 ) && (mouseY >= 0 ) && (mouseY <= 1000 )) && (zoomOnClick))
        {
			zoomX=mouseX-200;
			zoomY=mouseY-200;
			let newSize = size * 0.4;
			let newXmin = map(mouseX-200,0,1000,xmin,xmin+size);
			let newYmin = map(mouseY-200,0,1000,ymin,ymin+size);

			size=newSize;
			xmin=newXmin;
			ymin=newYmin;

			noStroke();
			fill(255);
			rect(1000,0,300,1000);
			mandlebrotSet = new MandlebrotSet();
			mandlebrotSet.start()
		}
	}
}