/* 
 * suer edit his personal infomation
 * link with personalpage
 * @author tianchi
 */

/*
 * show personal information
 */
function showinfo(){
    var mailaddr=document.getElementById("mail").innerHTML;
    document.getElementById("changemailaddr").value=mailaddr;
}

//when user want to change name

function changepw(){
    document.getElementById("changepw1").removeAttribute("disabled");
    document.getElementById("changepw2").removeAttribute("disabled");
    document.getElementById("changepw3").removeAttribute("disabled");
    document.getElementById("changepw1").setAttribute("class","enable");
    document.getElementById("changepw2").setAttribute("class","enable");
    document.getElementById("changepw3").setAttribute("class","enable");
    var button=document.getElementById("changepwbutton");
    button.setAttribute("class","pill orange small");
    button.setAttribute("onclick","okchangepw()");
    button.innerHTML='<i class="icon-ok-sign"></i> OK';
}

//name has been changed
var changepwrequest;
function okchangepw(){
    var pw1=document.getElementById("changepw1").value;
    var pw2=document.getElementById("changepw2").value;
    var pw3=document.getElementById("changepw3").value;
     if(pw2===""){                                      //if name is empty
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Password cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("changepwinfo").innerHTML=info;
        return false;
    }
    
    var reg=/^[a-zA-Z0-9]{6,}$/;     //pw1          
    if(!reg.test(pw2)){
         var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Password must consist of 'a-z'or'A-Z'(length>=6) <a href='#close' class='icon-remove'></a></div>";
        document.getElementById("changepwinfo").innerHTML=info;
        return false;
    }
    
     if(pw2!==pw3){                                      //if pw are different
        var info="<div class='notice error'><i class='icon-remove-sign '>\n\
              </i>The two passwords differ<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("changepwinfo").innerHTML=info; 
        return false;
    }
    
    if(window.XMLHttpRequest) {  
        changepwrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        changepwrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(changepwrequest!==null){ 
            document.getElementById("changepwbutton").setAttribute("disabled","disabled");
            changepwrequest.open("POST","edituserinfo?oldpw="+pw1+"&newpw="+pw2,true);
            changepwrequest.onreadystatechange=changepwback;
            changepwrequest.send(null);
    }  
}

function changepwback(){
    if(changepwrequest.readyState===4){  
        if(changepwrequest.status===200){  
            var flag=changepwrequest.responseText;
            if(flag==="success"){
                document.getElementById("changepw1").setAttribute("disabled","disabled");
                document.getElementById("changepw2").setAttribute("disabled","disabled");
                document.getElementById("changepw3").setAttribute("disabled","disabled");
                document.getElementById("changepw1").value="";
                document.getElementById("changepw2").value="";
                document.getElementById("changepw3").value="";
                var button=document.getElementById("changepwbutton");
                button.setAttribute("class","pill green small");
                button.setAttribute("onclick","changepw()");
                button.innerHTML='<i class="icon-pencil"></i> Edit';
                document.getElementById("changepwinfo").innerHTML="";
            }
            else{
                    var info="<div class='notice error'><i class='icon-remove-sign '>\n\
                    </i>"+flag+"<a href='#close' class='icon-remove'></a></div>";
                    document.getElementById("changepwinfo").innerHTML=info;
            } 
        }
     document.getElementById("changepwbutton").removeAttribute("disabled");
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
        changemailrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
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


//get message from servlet
var messagerequest;
function getmessage(){
     if(window.XMLHttpRequest) {  
        messagerequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        messagerequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(messagerequest!==null){ 
            messagerequest.open("GET","getmessage",true);
            messagerequest.onreadystatechange=messageback;
            messagerequest.send(null);
    }  
}

function messageback(){
    if(messagerequest.readyState===4){ 
        if(messagerequest.status===200){  
            var flag=messagerequest.responseText;
            if(flag!=="fail"){
                var obj=eval('('+flag+')');
                document.getElementById("message").innerHTML='<div id="jp-container" class="jp-container"></div>\n\
                            <button class="small red" onclick="closemsg()"><i class="icon-plus-sign"></i> close</button>';
                var msg='';
                for(var i=0,l=obj.length;i<l;i++){  
                   msg+='<a target="_blank">\n\
                            <div>\n\
                            <h5>'+obj[i].fromuname+'</h5>\n\
                            <h6>'+obj[i].time+'</h6>'+obj[i].content+'\n\
                        </div></a>'; 
                }
                document.getElementById("jp-container").innerHTML=msg;
            }
        }
    }
}
function closemsg(){
     document.getElementById("message").innerHTML='';
}
