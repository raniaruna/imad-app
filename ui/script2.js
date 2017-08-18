console.log('Articles ..Loaded!');

function loadCommentForm(){
    var commentHTML =` <h3>Add Cooment </h3><input type='text' id='comment' placeholder='Add comment'/><br/>
                    
                    <input type='submit' id='cooment_btn' value='Save'/>` ;
    var commentForm = document.getElementById("cooment_form");
    commentForm.innerHTML = commentHTML;
    
}
function loadComments(articleName){
   console.log('get comments for '+articleName);
    var request = new XMLHttpRequest();
if(request.readyState== XMLHttpRequest.DONE){
    var comments = document.getElementById("comments");
		   
			if(request.status===200){
			    
			    var content = '<ul>';
			    var commentData =JSON.parse(request.responseText);
			    comments.innerHTML = commentData;//content;
			    console.log(request.responseText);
			} else {
			   comments.innerHTML ='Could not load all Comments!';
			  
			}
		}
	request.open('GET','/get-comments/'+articleName,true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(null);
}

