console.log('Loaded!');


function loadLoginForm(){
    var loginHTML =` <h3>Login User </h3><input type='text' id='username'/><br/>
                    <input type='password' id='password'/><br/>
                    <input type='submit' id='login_btn' value='Login'/><br/><spam id='txt-result'></spam>`;
   var registerHTML =` <h3>Register User </h3>User Name :<input type='text' id='username'/><br/>
                    Password :<input type='password' id='password'/><br/>Name:<input type='text' id='user_name'/><br/>
                    Email: <input type='text' id='user_email'/><br/>
                    <input type='submit' id='register_btn' value='Register'/><br/><input type='submit' id='login_btn' value='Login'/><spam id='txt-result'></spam>`;
                    
    var login =document.getElementById("login_area");
                    login.innerHTML = registerHTML;// loginHTML;
                    console.log('here 222');
                    
                    
var register = document.getElementById("register_btn");

register.onclick = function(){
//create req obj
 alert('create clicked');
 var textRes = document.getElementById("txt-result");
					textRes.innerHTML = 'Registering..  ';
	var request = new XMLHttpRequest();

	//capture response and store in variable 
	request.onreadystatechange =function(){
		if(request.readyState== XMLHttpRequest.DONE){
		    
			if(request.status===200){
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
	var user_name = document.getElementById("user_name").value;
	var user_email = document.getElementById("user_email").value;
	
   console.log(username);
   console.log(password);
   console.log('creating');
   	//make the request
	request.open('POST','/create-user',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username: username, name:user_name, email:user_email, password: password}));
	register.value='Registering ...'
}; // register end
var loginBtn = document.getElementById("login_btn");

loginBtn.onclick = function(){
//create req obj
 alert('login clicked');
 var textRes = document.getElementById("txt-result");
					textRes.innerHTML = 'Enter Credentials..  ';
	var request = new XMLHttpRequest();

	//capture response and store in variable 
	request.onreadystatechange =function(){
		if(request.readyState== XMLHttpRequest.DONE){
		    
			if(request.status===200){
			    alert('User logIn successfully');
					textRes.innerHTML = request.responseText;
					
			} else {
			    alert('Invalid User');
			    textRes.innerHTML = 'Error : '+request.status;
			}
		}
	};
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	
   console.log(username);
   console.log(password);
   console.log('login ');
   	//make the request
	request.open('POST','/login',true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({username: username, password: password}));
	
};//login


}

function  loadLogedInUser(){}
function loadLogin(){
    var request = new XMLHttpRequest();

	//capture response and store in variable 
	request.onreadystatechange =function(){
		if(request.readyState== XMLHttpRequest.DONE){
		    
			if(request.status===200){
			   loadLogedInUser();
			} else {
			   
			    loadLoginForm();
			}
		}
	};
	request.open('GET', '/checklogin', true);
    request.send(null);
	
}
loadLogin();
