/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var request;
/*
 * user name
 */
function namevalid(){
    var nameObj=document.getElementsByName("username");
    var name=nameObj[0].value;
  
    if(name===""){                                      //if name is empty
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("nameinfo").innerHTML=info;
        return false;
    }
    
    var reg=/^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;                //name consists of a-z A-Z _
    if(!reg.test(name)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name must consist of 'a-z'or'A-Z'or' _'<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("nameinfo").innerHTML=info;
        return false;
    }
    
    if(window.XMLHttpRequest) {  
        request = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        requset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(request!==null){  
        var url = "register?name="+name;        //OB servlet name
        request.open("GET",url,true);
        request.onreadystatechange=nameback;
        request.send(null);
    }
}
    
    function nameback(){
        if(request.readyState===4){  
            if(request.status===200){  
                    var flag=request.responseText;
                    if(flag==="nameavailble"){                      //a good name 
                        var info="<div class='notice success'><i class='icon-ok'></i>\n\
                                A good name<a href='#close' class='icon-remove'></a></div>";  
                        document.getElementById("nameinfo").innerHTML=info;
                        return true;
                    }
                    else{
                        var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                                   </i>Please change the name<a href='#close' class='icon-remove'></a></div>";
                        document.getElementById("nameinfo").innerHTML=info;
                    }  
            }
             else if(flag==="nameused"){                        //name is used 
                var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                          </i>name has been used<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("nameinfo").innerHTML=info;
            }
        }
       else{
            var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                </i>Sorry, a server exception<a href='#close' class='icon-remove'></a></div>";
            document.getElementById("nameinfo").innerHTML=info;
       }
       return false;
    }   


/*
 * mail
 */
function mailvalid(){
    var mailObj=document.getElementsByName("usermail");
    var mail=mailObj[0].value;
  
    if(mail===""){                                      //if name is empty
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Mail address cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("mailinfo").innerHTML=info;
        return false;
    }
    
    var reg=/^[a-z0-9][a-z0-9\._-]*@[a-z0-9][a-z0-9-]*\.([a-z0-9][a-z0-9-]*\.)*[a-z]+$/;               //mail address
    if(!reg.test(mail)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Mail address is not valid <a href='#close' class='icon-remove'></a></div>";
        document.getElementById("mailinfo").innerHTML=info;
        return false;
    }
    
    if(window.XMLHttpRequest) {  
        request = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        requset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(request!==null){  
        var url = "register?mail="+mail;        //OB servlet name
        request.open("GET",url,true);
        request.onreadystatechange=mailback;
        request.send(null);
    }
}
    
    function mailback(){
        if(request.readyState===4){  
            if(request.status===200){  
                    var flag=request.responseText;
                    if(flag==="mailavailble"){                      //good mail
                        var info="<div class='notice success'><i class='icon-ok'></i>\n\
                                A good mail<a href='#close' class='icon-remove'></a></div>";  
                        document.getElementById("mailinfo").innerHTML=info;
                        return true;
                    }
                    else if(flag==="mailused"){
                        var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                                   </i>this mail address has been used<a href='#close' class='icon-remove'></a></div>";
                        document.getElementById("mailinfo").innerHTML=info;
                    }  
            }  
            else{
                var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                          </i>Sorry, a server exception<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("mailinfo").innerHTML=info;
            }  
        }
        else{
            var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                     </i>Sorry, a server exception<a href='#close' class='icon-remove'></a></div>";
            document.getElementById("mailinfo").innerHTML=info;
        } 
        return false;
    }  
    
/*
 * pw1
 */
function pw1valid(){
    var pw1Obj=document.getElementsByName("pw1");
    var pw1=pw1Obj[0].value;
  
    if(pw1===""){                                      //if name is empty
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Password cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("pw1info").innerHTML=info;
        return false;
    }
    
    var reg=/^[a-zA-Z0-9]{6,}$/;     //pw1          
    if(!reg.test(pw1)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Password must consist of 'a-z'or'A-Z'(length>=6) <a href='#close' class='icon-remove'></a></div>";
        document.getElementById("pw1info").innerHTML=info;
        return false;
    }
    
   var info="<div class='notice success'><i class='icon-ok'></i>\n\
                                OK<a href='#close' class='icon-remove'></a></div>";  
   document.getElementById("pw1info").innerHTML=info;  
   return true;
}

function pw2valid(){
    var pw2Obj=document.getElementsByName("pw2");
    var pw2=pw2Obj[0].value;
    var pw1Obj=document.getElementsByName("pw1");
    var pw1=pw1Obj[0].value;
    if(pw1===pw2){                                      //if pw are different
        var info="<div class='notice success'><i class='icon-ok'></i>\n\
                  OK<a href='#close' class='icon-remove'></a></div>";  
        document.getElementById("pw2info").innerHTML=info;  
        return true;
    }
    var info="<div class='notice error'><i class='icon-remove-sign '>\n\
              </i>The two passwords differ<a href='#close' class='icon-remove'></a></div>";
    document.getElementById("pw2info").innerHTML=info;
    return false;
 
}

function create(){
    if(mailvalid()&&namevalid()&&pw1valid()&&pw2valid()){
        var nameObj=document.getElementsByName("username");
        var name=nameObj[0].value;
        var mailObj=document.getElementsByName("usermail");
        var mail=mailObj[0].value;
        var pw1Obj=document.getElementsByName("pw1");
        var pw1=pw1Obj[0].value;
        var url = "register?mail="+mail+"&name="+name+"&pw="+pw1;        //OB servlet 
        if(window.XMLHttpRequest) {  
            request = new XMLHttpRequest();  //IE7, Firefox, Opera 
        }else if(window.ActiveXObject) {  
            requset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
        }
        if(request!==null){  
            request.open("GET",url,true);
            request.onreadystatechange=createback;
            request.send(null);
        }
    }
}

function createback(){
        if(request.readyState===4){  
                if(request.status===200){  
                    var flag=request.responseText;
                    if(flag==="success"){
                        //go to personal page
                    }
                   else{
                       var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                        </i>Failed to create a user<a href='#close' class='icon-remove'></a></div>";
                       document.getElementById("pw2info").innerHTML=info;  
                   }
                }else{
                         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                            </i>Failed to create a user<a href='#close' class='icon-remove'></a></div>";
                        document.getElementById("pw2info").innerHTML=info;  
                }
        }else{
            var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                        </i>Failed to create a user<a href='#close' class='icon-remove'></a></div>";
            document.getElementById("pw2info").innerHTML=info;  
        }
            
}
    
      