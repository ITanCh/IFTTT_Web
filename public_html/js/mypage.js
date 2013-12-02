/* 
 * link with personal page
 * show all information of this user
 */

var request;
var taskrequest;

/*
 *check if this user log in and get user's infomation  
 */
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
                createtable();                      //Attention!
                return;
            }
        }            
       location.href="index.html";        //this uer dosen't log in ,so he cannot get into this page
    }  
}   

/*
 * get all tasks if this user
 */
function createtable(){
    if(window.XMLHttpRequest) {  
        taskrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        taskrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(taskrequest!==null){  
            taskrequest.open("GET","gettaskinfo",true);
            taskrequest.onreadystatechange=tasksback;
            taskrequest.send(null);
    }  
}

function tasksback(){
    if(taskrequest.readyState===4){  
        if(taskrequest.status===200){  
            var flag=taskrequest.responseText;
            var obj=eval('('+flag+')');
            var alltasks="";
            for(var i=0,l=obj.task.length;i<l;i++){             //get all tasks infomation
                //task:name ,create time, status
                if(obj.task[i].isrunning===false){
                    alltasks+="<tr><td>"+obj.task[i].name+"</td><td>"+obj.task[i].ctime+"</td><td>"+obj.task[i].status+"</td>\n\
                           <td><a onclick='viewtask("+obj.task[i].name+")'><i class='icon-eye-open tooltip' title='view'></i></a>\n\
                            <a class='starticon' href=''><i class='icon-play tooltip' title='start it'></i></a></td></tr>";
                }
                else{
                    alltasks+="<tr><td>"+obj.task[i].name+"</td><td>"+obj.task[i].ctime+"</td><td>"+obj.task[i].status+"</td>\n\
                           <td><a onclick='viewtask("+obj.task[i].name+")'><i class='icon-eye-open tooltip' title='view'></i></a>\n\
                            <a class='stopicon' href=''><i class='icon-stop tooltip' title='stop it'></i></a></td></tr>";
                }
            }
            document.getElementById("tablebody").innerHTML=alltasks;
        }            
    }  
}

/*
 * if user want to view a task in detail
 */
//var vtrequest;
//function viewtask(name){
//    if(window.XMLHttpRequest) {  
//        vtrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
//    }else if(window.ActiveXObject) {  
//        vtrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
//    }
//    if(vtrequest!==null){  
//            vtrequest.open("GET","gettaskinfo",true);       //gettaskinfo
//            vtrequest.onreadystatechange=viewtaskback;
//            vtrequest.send(null);
//    }  
//}
//
//function viewtaskback(){
//     if(vtrequest.readyState===4){  
//        if(vtrequest.status===200){ 
//            var flag=vtrequest.responseText;
//            var obj=eval('('+flag+')');
//        }
//    }
//}


/*
 * create a task
 */
//when choose this 
function choosethis(id){
    var content=document.getElementById("createthiscontent");
    if(id==="createthisradio1"){            //time
        var text="<input id='cthis0_1' type='text' placeholder='2013-11-11'/>\n\
                <br><br>\n\
                <input id='cthis0_2' type='text' placeholder='11:11'/>";
        content.innerHTML=text;
    }
    else if(id==="createthisradio2"){       //mail
        var text="<input id='cthis1_1' type='text' placeholder='name@example.com'/>\n\
                <br><br>\n\
                <input id='cthis1_2' type='text' placeholder='Password'/>";
        content.innerHTML=text;
        
    }
    else if(id==="createthisradio3"){       //weibo
        var text="<input id='cthis2_1' type='text' placeholder='Weibo account '/>\n\
                <br><br>\n\
                <input id='cthis2_2' type='text' placeholder='Password'/>";
        content.innerHTML=text;
    }
}

//when choose this 
function choosethat(id){
    var content=document.getElementById("createthatcontent");
    if(id==="createthatradio1"){            //send weibo
        var text='<textarea id="cthat0_1" placeholder="Say something"></textarea><br>\n\
                <input id="cthat0_2" type="text" placeholder="Weibo account" /><br><br>\n\
                <input id="cthat0_3" type="pw" placeholder="Password" />';
                        
        content.innerHTML=text;
    }
    else if(id==="createthatradio2"){       //send mail
         var text='<textarea id="cthat1_1"  placeholder="Say something"></textarea><br>\n\
                    <input id="cthat1_2" type="text" placeholder="name@example.com" />';
        content.innerHTML=text;
        
    }
}
//when click create
var createrequest;
function createtask(){
    var thisobj=document.getElementsByName("cthis");                //choose this    
    var taskname=document.getElementById("ctaskname").value;        //get name
    var thistype;
    var thisdata="";
    for(var i=0;i<thisobj.length;i++){                              //get this
        if(thisobj[i].checked){
            thistype=i;
            if(i===0){                                              //time out
                thisdata+="&date="+document.getElementById("cthis0_1").value+"&time="+document.getElementById("cthis0_2").value;
                break;
            }
            else if(i===1){                                              //get mail
                thisdata+="&addr="+document.getElementById("cthis1_1").value+"&pw="+document.getElementById("cthis1_2").value;
                break;
            }
            else if(i===2){                                              // look for weibo
                thisdata+="&count="+document.getElementById("cthis2_1").value+"&pw="+document.getElementById("cthis2_2").value;
                break;
            }
        }
    }
     
    var thatobj=document.getElementsByName("cthat");                //choose this    
    var thattype;
    var thatdata="";
    for(var i=0;i<thatobj.length;i++){                              //get this
        if(thatobj[i].checked){
            thattype=i;
            if(i===0){                                              //send weibo
                thatdata+="&account="+document.getElementById("cthat0_2").value+"&pw="+document.getElementById("cthat0_3").value+"&content="+document.getElementById("cthat0_1").value;
                break;
            }
            else if(i===1){                                          //send mail
                thatdata+="&addr="+document.getElementById("cthat1_2").value+"&content="+document.getElementById("cthat1_1").value;
                break;
            }
         }
    }
    var url="taskmanager?name="+taskname+"&thistype="+thistype+thisdata+"&thattype="+thattype+thatdata;    
    if(window.XMLHttpRequest) {  
        createrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        createrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    
    if(createrequest!==null){  
            createrequest.open("GET",url,true);       //gettaskinfo
            createrequest.onreadystatechange=createback;
            createrequest.send(null);
    }  
}
function createback(){
    if(createrequest.readyState===4){  
        if(createrequest.status===200){ 
            var flag=createrequest.responseText;
            if(flag==="success"){
                document.getElementById("createback").innerHTML='<div class="notice success">\n\
                    <i class="icon-ok icon-large"></i> Create task successfully <a href="#close" class="icon-remove"></a></div>';
            }
            else{
                document.getElementById("createback").innerHTML='<div class="notice warning">\n\
                <i class="icon-warning-sign icon-large"></i> Sorry ,create task unsuccessfully  <a href="#close" class="icon-remove"></a></div>';
            }
        }
    }
}




