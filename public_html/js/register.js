/* 
 * create a new account
 * link with signup.html
 * @author tianchi
 */

var request;
var nametrue=false;
var mailtrue=false;
var pw1true=false;
var pw2true=false;
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
        nametrue=false;
        return false;
    }
    
    var reg=/^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;                //name consists of a-z A-Z _
    if(!reg.test(name)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name must consist of 'a-z'or'A-Z'or' _'<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("nameinfo").innerHTML=info;
        nametrue=false;
        return false;
    }
    
    if(window.XMLHttpRequest) {  
        request = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        requset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(request!==null){  
        var url = "getreg?name="+name;        //OB servlet name
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
                        nametrue=true;
                        return true;
                    }
                    else if(flag==="nameused"){                        //name is used
                            var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                            </i>name has been used<a href='#close' class='icon-remove'></a></div>";
                            document.getElementById("nameinfo").innerHTML=info;
                            nametrue=false;
                            return false;
                    }
            }
               else{
                      var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                                 </i>Network errors<a href='#close' class='icon-remove'></a></div>";
                      document.getElementById("nameinfo").innerHTML=info;
                      nametrue=false;
                      return false;
                   }  
        }
     
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
        mailtrue=false;
        return false;
    }
    
    var reg=/^[a-z0-9][a-z0-9\._-]*@[a-z0-9][a-z0-9-]*\.([a-z0-9][a-z0-9-]*\.)*[a-z]+$/;               //mail address
    if(!reg.test(mail)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Mail address is not valid <a href='#close' class='icon-remove'></a></div>";
        document.getElementById("mailinfo").innerHTML=info;
        mailtrue=false;
        return false;
    }
    
    if(window.XMLHttpRequest) {  
        request = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        requset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(request!==null){  
        var url = "getreg?mail="+mail;        //OB servlet name
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
                        mailtrue=true;
                        return true;
                    }
                    else if(flag==="mailused"){
                        var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                                   </i>this mail address has been used<a href='#close' class='icon-remove'></a></div>";
                        document.getElementById("mailinfo").innerHTML=info;
                        mailtrue=false;
                        return false;
                    }  
            }  
            else{
                var info="<div class='notice error'><i class='icon-remove-sign'>\n\
                          </i>Network errors<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("mailinfo").innerHTML=info;
                mailtrue=false;
                return false;
            }  
        }
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
        pw1=false;
        return false;
    }
    
    var reg=/^[a-zA-Z0-9]{6,}$/;     //pw1          
    if(!reg.test(pw1)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Password must consist of 'a-z'or'A-Z'(length>=6) <a href='#close' class='icon-remove'></a></div>";
        document.getElementById("pw1info").innerHTML=info;
        pw1=false;
        return false;
    }
    
   var info="<div class='notice success'><i class='icon-ok'></i>\n\
                                OK<a href='#close' class='icon-remove'></a></div>";  
   document.getElementById("pw1info").innerHTML=info;  
   pw1=false;
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
        pw2=true;
        return true;
    }
    var info="<div class='notice error'><i class='icon-remove-sign '>\n\
              </i>The two passwords differ<a href='#close' class='icon-remove'></a></div>";
    document.getElementById("pw2info").innerHTML=info;
    pw2=false;
    return false;
 
}

function create(){
    if(mailtrue&&nametrue&&pw1true&&pw2true){
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
                        location.href="personalpage.html";
                    }
                    else{
                       var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                        </i>Failed to create a user<a href='#close' class='icon-remove'></a></div>";
                       document.getElementById("pw2info").innerHTML=info;  
                   }
                }else{
                         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                            </i>Network error<a href='#close' class='icon-remove'></a></div>";
                        document.getElementById("pw2info").innerHTML=info;  
                }
        }
}
    
      