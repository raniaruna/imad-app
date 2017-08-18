console.log('Loaded!');

function loadCommentForm(){
    var commentHTML =` <h3>Add Cooment </h3><input type='text' id='comment' placeholder='Add comment'/><br/>
                    
                    <input type='submit' id='cooment_btn' value='Save'/>` ;
    var commentForm = document.getElementById("cooment_form");
    commentForm.innerHTML = commentHTML;
    
}
function loadComments(articleName){
    alert("getting comments");
    var request = new XMLHttpRequest();
if(request.readyState== XMLHttpRequest.DONE){
    var comments = document.getElementById("comments");
		   
			if(request.status===200){
			    
			    var content = '<ul>';
			    var commentData =JSON.parse(request.responseText);
			    for(var i=0; i< commentData.length; i++){
			        content +=`<li>
			                ${commentData[i].comment}
			                 - (${articleData[i].timestamp.split('T')[0]})</li>`;
			    }
			    content +='</ul>';
			    comments.innerHTML =content;
			    
			} else {
			   comments.innerHTML ='Could not load all Comments!';
			  
			}
		}
	request.open('GET','/get-comments/'+articleName,true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(null);
}
function loadLoginForm(){
    var loginHTML =` <h3>Login User </h3><input type='text' id='username' value='newuser2'/><br/>
                    <input type='password' id='password' value='password'/><br/>
                    <input type='submit' id='login_btn' value='Login'/> <input type='submit' id='register_btn' value='Register'/><br/><spam id='txt-result'></spam>`;
   var registerHTML =` <h3>Register User </h3>User Name :<input type='text' id='username'/><br/>
                    Password :<input type='password' id='password'/><br/>Name:<input type='text' id='user_name'/><br/>
                    Email: <input type='text' id='user_email'/><br/>
                    <input type='submit' id='register_btn' value='Register'/><br/><input type='submit' id='login_btn' value='Login'/><spam id='txt-result'></spam>`;
    var loginUser =`Hi ,{username} `;
                    
    var login =document.getElementById("login_area");
                    login.innerHTML = loginHTML;//registerHTML;
                    
                    
                    
var register = document.getElementById("register_btn");

register.onclick = function(){
//create req obj
 
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
 
 var textRes = document.getElementById("txt-result");
					
	var request = new XMLHttpRequest();

	//capture response and store in variable 
	request.onreadystatechange =function(){
		if(request.readyState== XMLHttpRequest.DONE){
		    
			if(request.status===200){
			    loginBtn.value ='Sucess!'
			} else if(request.status===403){
			    loginBtn.value ='Invalid credentials. Try again';
			} else if(request.status===500){
			    alert('Something went wrong on the server. Try again');
			    loginBtn.value ='Login';
			}else {   
			    alert('Something went wrong on the server');
			    loginBtn.value ='Login';
			}
			loadLogin();
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

function  loadLogedInUser(username){
     var login =document.getElementById("login_area");
                    login.innerHTML = `<h3>Hi ,<i>${username}</i> </h3>
                                        <a href='/logout'>Logout</a>`;
}

function loadLogin(){
    var request = new XMLHttpRequest();

	//capture response and store in variable 
	request.onreadystatechange =function(){
		if(request.readyState== XMLHttpRequest.DONE){
		    
			if(request.status===200){
			    console.log('response :'+request.responseText);
			   loadLogedInUser(request.responseText);
			} else {
			   
			    loadLoginForm();
			}
		}
	};
	request.open('GET', '/checklogin', true);
    request.send(null);
	
}
 
function loadArticles(){
    
    var request = new XMLHttpRequest();

	//capture response and store in variable 
	request.onreadystatechange =function(){
		if(request.readyState== XMLHttpRequest.DONE){
		    var articles =document.getElementById("articles_area");
			if(request.status===200){
			    
			    var content = '<ul>';
			    var articleData =JSON.parse(request.responseText);
			    for(var i=0; i< articleData.length; i++){
			        content +=`<li>
			                <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
			                (${articleData[i].date.split('T')[0]})</li>`;
			    }
			    content +='</ul>';
			    articles.innerHTML =content;
			    
			} else {
			   articles.innerHTML ='Could not load all articles!';
			  
			}
		}
	};
	request.open('GET', '/get-articles', true);
    request.send(null);
	
}


loadLogin();
loadArticles();
