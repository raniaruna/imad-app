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


 var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };

var register = document.getElementById("register_btn1");

register.onclick = function(){
//create req obj
 alert('create clicked');
 var textRes = document.getElementById("txt-result");
					textRes.innerHTML = 'Registering..  ';
	var request = new XMLHttpRequest();

	//capture response and store in variable 
	request.onreadystatechange =function(){
		if(request.readyState== XMLHttpRequest.DONE){
		    
			if(req.status===200){
			    alert('User created successfully');
					textRes.innerHTML += request.responseText;
					register.value='Registered'
			} else {
			    alert('could not register the user');
			    textRes.innerHTML += 'Error : '+request.status;
			}
		}
	};
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	
   console.log(username);
   console.log(password);
   console.log('creating');
   	//make the request
	request.open('POST','/create-user',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username: username, password: password}));
	register.value='Registering ...'
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