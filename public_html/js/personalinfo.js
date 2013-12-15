/* 
 * suer edit his personal infomation
 * link with personalpage
 * @author tianchi
 */

/*
 * show personal information
 */
function showinfo(){
    var name=document.getElementById("bigusername").innerHTML;
    var mailaddr=document.getElementById("mail").innerHTML;
    document.getElementById("changeusername").value=name;
    document.getElementById("changemailaddr").value=mailaddr;
}

//when user want to change name

function changename(){
    document.getElementById("changeusername").removeAttribute("disabled");
    document.getElementById("changeusername").setAttribute("class","enabled");
    var button=document.getElementById("changenamebutton");
    button.setAttribute("class","pill orange small");
    button.setAttribute("onclick","okchangename()");
    button.innerHTML='<i class="icon-ok-sign"></i> OK';
}

//name has been changed
var changenamerequest;
function okchangename(){
    var name=document.getElementById("changeusername").value;
    if(name===""){                                      //if name is empty
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("changenameinfo").innerHTML=info;
        return false;
        }
    var reg=/^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;                //name consists of a-z A-Z _
    if(!reg.test(name)){
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name must consist of 'a-z'or'A-Z'or' _'<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("changenameinfo").innerHTML=info;
        return false;
    }
    
    if(window.XMLHttpRequest) {  
        changenamerequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        changenamerequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(changenamerequest!==null){ 
            document.getElementById("changenamebutton").setAttribute("disabled","disabled");
            changenamerequest.open("POST","edituserinfo?name="+name,true);
            changedname = name;
            changenamerequest.onreadystatechange=changenameback;
            changenamerequest.send(null);
    }  
}
var changedname;
function changenameback(){
    if(changenamerequest.readyState===4){  
        if(changenamerequest.status===200){  
            var flag=changenamerequest.responseText;
            if(flag==="success"){
                document.getElementById("bigusername").innerHTML=changedname;
                document.getElementById("username").innerHTML=changedname;
                document.getElementById("changeusername").setAttribute("class","disabled");
                document.getElementById("changeusername").setAttribute("disabled","disabled");
                var button=document.getElementById("changenamebutton");
                button.setAttribute("class","pill green small");
                button.setAttribute("onclick","changename()");
                button.innerHTML='<i class="icon-pencil"></i> Edit';
            }
            else{
                    var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                    </i>"+flag+"<a href='#close' class='icon-remove'></a></div>";
                    document.getElementById("changenameinfo").innerHTML=info;
            } 
        }
     document.getElementById("changenamebutton").removeAttribute("disabled");
    }
}

//when user want to change mail

function changemail(){
    document.getElementById("changemailaddr").removeAttribute("disabled");
    document.getElementById("changemailaddr").setAttribute("class","enabled");
    var button=document.getElementById("changemailbutton");
    button.setAttribute("class","pill orange small");
    button.setAttribute("onclick","okchangemail()");
    button.innerHTML='<i class="icon-ok-sign"></i> OK';
}

//mail has been changed
var changemailrequest;
function okchangemail(){
    var mail=document.getElementById("changemailaddr").value;
    if(mail===""){                                      //if mail is empty
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Mail address cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("changemailinfo").innerHTML=info;
        return false;
    }
    
    var reg=/^[a-z0-9][a-z0-9\._-]*@[a-z0-9][a-z0-9-]*\.([a-z0-9][a-z0-9-]*\.)*[a-z]+$/;               //mail address
    if(!reg.test(mail)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Mail address is not valid <a href='#close' class='icon-remove'></a></div>";
        document.getElementById("changemailinfo").innerHTML=info;
        return false;
    }
    if(window.XMLHttpRequest) {  
        changemailrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        changemailrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(changemailrequest!==null){ 
            document.getElementById("changemailbutton").setAttribute("disabled","disabled");
            changemailrequest.open("POST","edituserinfo?mail="+mail,true);
            changedmail = mail;
            changemailrequest.onreadystatechange=changemailback;
            changemailrequest.send(null);
    }  
}

var changedmail;
function changemailback(){
    if(changemailrequest.readyState===4){ 
        if(changemailrequest.status===200){  
            var flag=changemailrequest.responseText;
            if(flag==="success"){
                document.getElementById("mail").innerHTML=changedmail;
                document.getElementById("changemailaddr").setAttribute("class","disabled");
                document.getElementById("changemailaddr").setAttribute("disabled","disabled");
                var button=document.getElementById("changemailbutton");
                button.setAttribute("class","pill green small");
                button.setAttribute("onclick","changemail()");
                button.innerHTML='<i class="icon-pencil"></i> Edit';
            }
            else{
                    var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                    </i>"+flag+"<a href='#close' class='icon-remove'></a></div>";
                    document.getElementById("changemailinfo").innerHTML=info;
            }  
        }
       document.getElementById("changemailbutton").removeAttribute("disabled");
    }
}




