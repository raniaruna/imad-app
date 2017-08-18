console.log('Articles ..Loaded!');

function loadCommentForm(){
    var commentHTML =` <h3>Add Cooment </h3><input type='text' id='comment' placeholder='Add comment'/><br/>
                    
                    <input type='submit' id='comment_btn' value='Save'/>` ;
    var commentForm = document.getElementById("comment_form");
    commentForm.innerHTML = commentHTML;
    
}
function loadComments(articleName){
   var comment = document.getElementById("comment");
    var request = new XMLHttpRequest();
    request.onreadystatechange =function(){
if(request.readyState== XMLHttpRequest.DONE){
    
		   
			if(request.status===200){
			    
			    var content = '<ul>';
			    var commentData =JSON.parse(request.responseText);
			    for(var i=0; i< commentData.length; i++){
			        content +=`<li> ${commentData[i].comment} -(${commentData[i].timestamp.split('T')[0]})</li>`;
			    }
			    content +='</ul>';
			    comment.innerHTML = content;
			    console.log(request.responseText);
			} else {
			   comment.innerHTML ='Could not load all Comments!';
			  
			}
		}
    };
	request.open('GET','/get-comments/'+articleName,true);
	request.setRequestHeader('Content-Type','application/json');
	request.send(null);
}

