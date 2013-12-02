/* 
 * link with personal page
 * show all information of this user
 */

var request;
var taskrequest;
//$(document).ready(checklogin);

function checklogin(){
    if(window.XMLHttpRequest) {  
        request = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        requset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(request!==null){  
            request.open("GET","getuserinfo",true);
            request.onreadystatechange=checkback;
            request.send(null);
    }  
}

function checkback(){
    if(request.readyState===4){  
        if(request.status===200){  
            var flag=request.responseText;
            if(flag==="false"){              
              location.href="index.html";        //this uer dosen't log in ,so he cannot get into this page
            }
            else{                        //log in successfully ,load user information          
                var obj=eval('('+flag+')');
                document.getElementById("username").innerHTML=obj.username;
                document.getElementById("bigusername").innerHTML=obj.username;
                document.getElementById("money").innerHTML=obj.coins;
                document.getElementById("mail").innerHTML=obj.mail;
                createtable();
                return;
            }
        }            
       location.href="index.html";        //this uer dosen't log in ,so he cannot get into this page
    }  
}   


function createtable(){
    if(window.XMLHttpRequest) {  
        taskrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        taskrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(taskrequest!==null){  
            taskrequest.open("GET","gettasks",true);
            taskrequest.onreadystatechange=tasksback;
            inforequest.send(null);
    }  
}

function tasksback(){
    if(inforequest.readyState===4){  
        if(inforequest.status===200){  
            var flag=taskrequest.responseText;
            var obj=eval('('+flag+')');
            var alltasks="";
            for(var i=0,l=obj.task.length;i<l;i++){
                //task:name ,create time, status
                if(obj.task[i].isrunning===false){
                    alltasks+="<tr><td>"+obj.task[i].name+"</td><td>"+obj.task[i].ctime+"</td><td>"+obj.task[i].status+"</td>\n\
                           <td><a onclick='viewtask()'><i class='icon-eye-open tooltip' title='view and modify'></i></a>\n\
                            <a class='starticon' href=''><i class='icon-play tooltip' title='start it'></i></a></td></tr>";
                }
                else{
                    alltasks+="<tr><td>"+obj.task[i].name+"</td><td>"+obj.task[i].ctime+"</td><td>"+obj.task[i].status+"</td>\n\
                           <td><a href=''><i class='icon-eye-open tooltip' title='view and modify'></i></a>\n\
                            <a class='stopicon' href=''><i class='icon-stop tooltip' title='stop it'></i></a></td></tr>";
                }
            }
            document.getElementById("tablebody").innerHTML=alltasks;
        }            
    }  
}  







