document.title="Resizer";
//main div.
var x=document.createElement("div");
x.id="main";
x.innerHTML='<br />'+"<button id='invert'>Invert</button><br /><br />";
body=document.body;
body.style.backgroundColor='black';
body.style.color='white';
body.appendChild(x);
var main= document.getElementById("main");
body.style.textAlign="center";
//image
var vid=document.createElement("video");
vid.id="vid";
vid.style.border='white solid';
vid.style.display='initial';
vid.width=640;
vid.height=360;
vid.loop="true";
vid.autoplay='true';
main.appendChild(vid);
var video=document.getElementById("vid");
//source
var source=document.createElement('source');
source.src='video.mp4';
source.type='video/mp4';
video.appendChild(source);
//height input
var input=document.createElement("input");
input.id="input";
input.style.margin='11px';
input.type="text";
input.placeholder="height in pixels";
value=input.value;
main.insertBefore(input,main.childNodes[0]);
//width input 
var input=document.createElement('input');
input.id="inputwidth";
input.type="text";
input.style.margin='11px';
input.placeholder="width in pixels";
value=input.value;
main.insertBefore(input,main.childNodes[1]);
//button
var button=document.createElement("button");
button.innerHTML="Submit";
main.insertBefore(button,main.childNodes[2]);
//paragraph
var a=document.createElement("p");
a.id="para";
main.insertBefore(a,main.childNodes[3]);
var p= document.getElementById("para");
p.innerHTML="height is" +" " + video.height+" "+"px"+" "+","+"width is" +" " + video.width+" "+"px";
//button click 
button.addEventListener("click",function(){
var i= document.getElementById("input");
var value = i.value;
var w =document.getElementById("inputwidth");
var val = w.value;
if(isNaN(value)||isNaN(val)==true)
{
	p.innerHTML="only numbers are allowed";
}
else{
video.height= value;
video.width= val;
p.innerHTML="height is" +" " + video.height +" "+ "px" +", "+ "width is" + " " + video.width+ " " +"px";
}
});
//event function
function myfunction(){
if (video.paused){
video.play();
}
else{
video.pause();
}
};

video.addEventListener('click',myfunction);
function resize(){
	vid.width=window.innerWidth;
vid.height=window.innerHeight;
p.innerHTML="height is" +" " + video.height +" "+ "px" +", "+ "width is" + " " + video.width+ " " +"px";
}
function invert(a){
var canv=document.createElement("canvas");
body.appendChild(canv);
cxt=canv.getContext('2d');
canv.width=vid.width;
canv.height=vid.height;
canv.style.opacity=a;
var x=window.setInterval(function() {draw()},20);
function draw(){
cxt.drawImage(vid,0,0,canv.width,canv.height);
 var vidData=cxt.getImageData(0,0,canv.width,canv.height);

 for (var z=0;z<vidData.data.length;z+=4)
    {
    vidData.data[z]=255-vidData.data[z];
    vidData.data[z+1]=255-vidData.data[z+1];
    vidData.data[z+2]=255-vidData.data[z+2];
    vidData.data[z+3]=255;
    }
  cxt.putImageData(vidData,0,0);
}
vid.addEventListener('play', function() {var x=window.setInterval(function() {draw()},20);},false);
vid.addEventListener('pause',function() {window.clearInterval(x);},false);
vid.addEventListener('ended',function() {clearInterval(x);},false); 
canv.addEventListener('click',myfunction); 
};
if (video.readyState > 0) { // metadata is loaded already - fire the event handler manually
  loadedmetadata.call(video);
} else {
  video.addEventListener('loadedmetadata', loadedmetadata);
}
function loadedmetadata(){
	if(video.webkitSupportsFullscreen){
vid.addEventListener('dblclick',function(){
this.webkitEnterFullScreen();
});
	}
	}
var inv=document.getElementById('invert');
inv.addEventListener('click',invertcolor);
function invertcolor()
{
	if(vid.style.display=='initial')
	{
		vid.style.display='none';
		invert(1);
	}
	else
	{
		$('canvas').remove();
		
	vid.style.display='initial';
	}
}