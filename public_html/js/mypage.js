/* 
 * link with personal page
 * show all information of this user
 */

var request;
function checklogin(){
    if(window.XMLHttpRequest) {  
        request = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        requset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(request!==null){  
            request.open("GET","getlogin",true);
            request.onreadystatechange=checkback;
            request.send(null);
    }  
}

function checkback(){
    if(request.readyState===4){  
        if(request.status===200){  
            var flag=request.responseText;
            if(flag==="true")return;
        }            
       location.href="index.html";        //this uer dosen't log in ,so he cannot get into this page
    }  
}



