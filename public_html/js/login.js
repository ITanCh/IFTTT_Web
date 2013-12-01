/* 
 * user log in 
 * link with ifttt.html
 */

function namevalid(){
    var nameObj=document.getElementsByName("name");
    var name=nameObj[0].value;
  
    if(name===""){                                      //if name is empty
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name is not valid<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("logininfo").innerHTML=info;
        return false;
    }
    
    var reg=/^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;                //name consists of a-z A-Z _
    if(!reg.test(name)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name is not valid<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("logininfo").innerHTML=info;
        return false;
    }
     document.getElementById("logininfo").innerHTML="";
     return true;
}

function pwvalid(){
    var pwObj=document.getElementsByName("pw");
    var pw=pwObj[0].value;
  
    if(pw===""){                                      //if name is empty
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Password is not valid<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("logininfo").innerHTML=info;
        return false;
    }
    
    var reg=/^[a-zA-Z0-9]{6,}$/;     //pw1          
    if(!reg.test(pw)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Password is not valid<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("logininfo").innerHTML=info;
        return false;
    }  
   document.getElementById("logininfo").innerHTML=""; 
   return true;
}

var request;
function login(){
    if(namevalid()&&pwvalid()){
        var nameObj=document.getElementsByName("name");
        var name=nameObj[0].value;
        var pwObj=document.getElementsByName("pw");
        var pw=pwObj[0].value;
        var url = "login?name="+name+"&pw="+pw;        //OB login servlet 
        if(window.XMLHttpRequest) {  
            request = new XMLHttpRequest();  //IE7, Firefox, Opera 
        }else if(window.ActiveXObject) {  
            requset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
        }
        if(request!==null){  
            request.open("GET",url,true);
            request.onreadystatechange=loginback;
            request.send(null);
        }
    }
       
}

function loginback(){
        if(request.readyState===4){  
                if(request.status===200){  
                    var flag=request.responseText;
                    if(flag==="success"){
                        //go to personal page
                        location.href="personalpage.html";
                    }
                   else{
                       var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                        </i>Incorrect username or password<a href='#close' class='icon-remove'></a></div>";
                       document.getElementById("logininfo").innerHTML=info;  
                   }
                }else{
                         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                            </i>The Internet has some problem<a href='#close' class='icon-remove'></a></div>";
                        document.getElementById("logininfo").innerHTML=info;  
                }
        }else{
            var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                        </i>The Internet has some problem<a href='#close' class='icon-remove'></a></div>";
            document.getElementById("logininfo").innerHTML=info;  
        }
            
}


