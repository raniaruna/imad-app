console.log('Loaded!');
/*
//change content;

var element =document.getElementById("main-text");
element.innerHTML = 'New Value';
var marginLeft =50;
var limit=500;
var incr =5;
function moveImg(){
	if(marginLeft>limit || marginLeft<50){
		incr *=-1;
	}
marginLeft +=incr;

img.style.marginLeft = marginLeft +"px";
}
var img =document.getElementById("madi");
img.onclick =function (){
	var interval =setInterval(moveImg,50);
};
*/
var button = document.getElementById("counter");

button.onclick=function(){
	//create req obj
	var req = new XMLHttpRequest();

	//capture response and store in variable 
	req.onreadystatechange =function(){
		if(req.readyState== XMLHttpRequest.DONE){
			if(req.status===200){
					var counter = req.responseText;
					var span =document.getElementById("count");
					span.innerHTML = counter.toString();
			}
		}

	};

	//make the request
	req.open('GET','http://raniaruna2005.imad.hasura-app.io/counter',true);
	req.send(null);
};

var create_submit = document.getElementById("create-submit-btn");

create_submit.onclick = function(){
//create req obj
	var req = new XMLHttpRequest();

	//capture response and store in variable 
	req.onreadystatechange =function(){
		if(req.readyState== XMLHttpRequest.DONE){
			if(req.status===200){
					var names = req.responseText;
					 names=JSON.parse(names);
					
					var list='';
					for(var i=0; i<names.length; i++){
						list += '<li>'+names[i]+ '</li>';
					}
					
					var ul = document.getElementById("name-list");
					ul.innerHTML = list;
			}
		}

	};
	var nameInput = document.getElementById("name");
	var name =nameInput.value;

	//make the request
	req.open('POST','http://raniaruna2005.imad.hasura-app.io/create-name',true);
	req.send(null);
};

var submit = document.getElementById("submit-btn");
submit.onclick = function(){
//create req obj
	var req = new XMLHttpRequest();

	//capture response and store in variable 
	req.onreadystatechange =function(){
		if(req.readyState== XMLHttpRequest.DONE){
			if(req.status===200){
					var names = req.responseText;
					 names=JSON.parse(names);
					
					var list='';
					for(var i=0; i<names.length; i++){
						list += '<li>'+names[i]+ '</li>';
					}
					
					var ul = document.getElementById("name-list");
					ul.innerHTML = list;
			}
		}

	};
	var nameInput = document.getElementById("name");
	var name =nameInput.value;

	//make the request
	req.open('GET','http://raniaruna2005.imad.hasura-app.io/submit-name?name='+name,true);
	req.send(null);
};

/*submit.onclick = function(){
	var names=['name1','name2','name3'];
	var list='';
	for(var i=0; i<names.length; i++){
		list += '<li>'+names[i]+ '</li>';
	}
	var ul = document.getElementById("name-list");
	ul.innerHTML = list;
};
*/