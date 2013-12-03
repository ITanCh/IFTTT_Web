/* 
 * link with personal page
 * show all information of this user
 * @author tianchi
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
                var alltasks="";
                for(var i=0,l=obj.task.length;i<l;i++){             //get all tasks infomation
                    //task:name ,create time, status
                    if(obj.task[i].isrunning===false){
                        alltasks+="<tr><td>"+obj.task[i].name+"</td><td>"+obj.task[i].ctime+"</td><td>"+obj.task[i].status+"</td>\n\
                           <td><a onclick='viewtask("+obj.task[i].tid+")'><i class='icon-eye-open tooltip' title='view'></i></a>\n\
                            <a class='starticon' href=''><i class='icon-play tooltip' title='start it'></i></a></td></tr>";
                    }
                    else{
                        alltasks+="<tr><td>"+obj.task[i].name+"</td><td>"+obj.task[i].ctime+"</td><td>"+obj.task[i].status+"</td>\n\
                           <td><a onclick='viewtask("+obj.task[i].tid+")'><i class='icon-eye-open tooltip' title='view'></i></a>\n\
                            <a class='stopicon' href=''><i class='icon-stop tooltip' title='stop it'></i></a></td></tr>";
                    }
                }
                document.getElementById("tablebody").innerHTML=alltasks;
                return;
            }
        }            
       location.href="index.html";        //this uer dosen't log in ,so he cannot get into this page
    }  
}   

/*
 * when click my task get all tasks of this user
 */
function createtable(){
    if(window.XMLHttpRequest) {  
        taskrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        taskrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(taskrequest!==null){  
            taskrequest.open("GET","getuserinfo",true);
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
                           <td><a onclick='viewtask("+obj.task[i].id+")'><i class='icon-eye-open tooltip' title='view'></i></a>\n\
                            <a class='starticon' href=''><i class='icon-play tooltip' title='start it'></i></a></td></tr>";
                }
                else{
                    alltasks+="<tr><td>"+obj.task[i].name+"</td><td>"+obj.task[i].ctime+"</td><td>"+obj.task[i].status+"</td>\n\
                           <td><a onclick='viewtask("+obj.task[i].id+")'><i class='icon-eye-open tooltip' title='view'></i></a>\n\
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
var vtrequest;
function viewtask(tid){
    if(window.XMLHttpRequest) {  
        vtrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        vtrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if(vtrequest!==null){  
            vtrequest.open("GET","gettaskinfo?tid="+tid,true);       //gettaskinfo
            vtrequest.onreadystatechange=viewtaskback;
            vtrequest.send(null);
    }  
}

function viewtaskback(){
     if(vtrequest.readyState===4){  
        if(vtrequest.status===200){ 
            var flag=vtrequest.responseText;
            if(flag===fals)return;
            var obj=eval('('+flag+')');
            //fill this content
            var thisradio;
            var thiscontent=document.getElementById("thiscontent");
            var thistext;
            if(obj.thistype===0){            //time
                thisradio=document.getElementById("thisradio1");
                thistext='<input id="this0_1" name="this" type="text" disabled="disabled" value="'+obj.thisdate+'"/>\n\
                <br><br>\n\
                <input id="this0_2"  name="this" type="text" disabled="disabled" value="'+obj.thistime+'"/>';
            }
            else if(obj.thistype===1){       //mail
                thisradio=document.getElementById("thisradio2");
                thistext='<input id="this1_1"  name="this" type="text" disabled="disabled" value="'+obj.thisaddr+'"/>\n\
                <br><br>\n\
                <input id="this1_2"  name="this" type="text" disabled="disabled" placeholder="Default Password is the last one"/>';
            }
            else if(obj.thistype===2){       //weibo
                thisradio=document.getElementById("thisradio3");
                thistext='<textarea id="this2_3"  name="this" value="'+obj.thisaccount+'"></textarea><br>\n\
                    <input id="this2_1" name="this"  type="text"  value="'+obj.thiscontent+'"/>\n\
                    <br><br>\n\
                    <input id="this2_2"  name="this" type="text"  placeholder="Default Password is the last one"/>';
            }
            thisradio.checked=true;
            thiscontent.innerHTML=thistext;
            
            //fill that content
            var thatradio;
            var thatcontent=document.getElementById("thatcontent");
            var thattext;
            if(obj.thattype===0){            //send weibo
                thatradio=document.getElementById("thatradio1");
                thattext='<textarea id="that0_1"   name="that" value="'+obj.thatcontent+'"></textarea><br>\n\
                <input id="that0_2" name="that" type="text" value="'+obj.thataccount+' /><br><br>\n\
                <input id="that0_3" name="that" type="pw" placeholder="Default Password is the last one" />';
            }
            else if(obj.thattype===1){       //send mail
                thatradio=document.getElementById("thatradio2");
                thattext='<textarea id="that1_1" name="that" value="'+obj.thatcoutent+'"></textarea><br>\n\
                    <input id="that1_2" name="that" type="text" value="'+obj.thataddr+'" />';
            }
            thatradio.checked=true;
            thatcontent.innerHTML=thattext;
            //make tham all disabled
            var thisobj=document.getElementsByName("this");
            for(var i=0;i<thisobj.length;i++){
                thisobj[i].setAttribute('disabled','disabled');
            }
            var thatobj=document.getElementsByName("that");
            for(var i=0;i<thatobj.length;i++){
                thatobj[i].setAttribute('disabled','disabled');
            }
            
        }
    }
}

//edit a task
function edittask(){
    var thisobj=document.getElementsByName("this");
    for(var i=0;i<thisobj.length;i++){
        thisobj[i].removeAttribute('disabled');
    }
    var thatobj=document.getElementsByName("that");
    for(var i=0;i<thatobj.length;i++){
        thatobj[i].removeAttribute("disabled");
    }
}

//the task has been edited and click ok
function disableedit(){
            var thisradio;
            var thiscontent=document.getElementById("thiscontent");
            var thistext;
            var thistype=2;
            if(thistype===0){            //time
                thisradio=document.getElementById("thisradio1");
                thistext='<input id="this0_1" name="this" type="text" value="'+'obj.thisdate'+'"/>\n\
                <br><br>\n\
                <input id="this0_2"  name="this" type="text"  value="'+'obj.thistime'+'"/>';
            }
            else if(thistype===1){       //mail
                thisradio=document.getElementById("thisradio2");
                thistext='<input id="this1_1"  name="this" type="text"  value="'+'obj.thisaddr'+'"/>\n\
                <br><br>\n\
                <input id="this1_2"  name="this" type="text" placeholder="Default Password is the last one"/>';
            }
            else if(thistype===2){       //weibo
                thisradio=document.getElementById("thisradio3");
                thistext='<textarea id="this2_3"  name="this"  value="'+'obj.thisaccount'+'"></textarea><br>\n\
                    <input id="this2_1" name="this"  type="text"  value="'+'obj.thiscontent'+'"/>\n\
                    <br><br>\n\
                    <input id="this2_2"  name="this" type="text" placeholder="Default Password is the last one"/>';
            }
            thisradio.checked=true;
            thiscontent.innerHTML=thistext;
            
            //fill that content
            var thatradio;
            var thatcontent=document.getElementById("thatcontent");
            var thattext;
            var thattype=0;
            if(thattype===0){            //send weibo
                thatradio=document.getElementById("thatradio1");
                thattext='<textarea id="that0_1"   name="that" value="'+'obj.thatcontent'+'"></textarea><br>\n\
                <input id="that0_2" name="that" type="text" value="'+'obj.thataccount'+'"/><br><br>\n\
                <input id="that0_3" name="that" type="pw" placeholder="Default Password is the last one" />';
            }
            else if(thattype===1){       //send mail
                thatradio=document.getElementById("thatradio2");
                thattext='<textarea id="that1_1" name="that" value="'+'obj.thatcoutent'+'"></textarea><br>\n\
                    <input id="that1_2" name="that" type="text" value="'+'obj.thataddr'+'" />';
            }
            thatradio.checked=true;
            thatcontent.innerHTML=thattext;
             var thisobj=document.getElementsByName("this");
             for(var i=0;i<thisobj.length;i++){
            thisobj[i].setAttribute('disabled','disabled');
            }
            var thatobj=document.getElementsByName("that");
            for(var i=0;i<thatobj.length;i++){
            thatobj[i].setAttribute('disabled','disabled');
            }
}

/*
 * create a task
 * 
 */
//when click create task
function getcreateview(){
    var text='<label for="ctaskname">Task Name:</label>\n\
                    <input id="ctaskname" type="text" />\n\
                    <hr class="alt2" />\n\
                    <div id="createthismenu">\n\
                        <fieldset>\n\
                        <legend>IF</legend>\n\
                        <input type="radio" name="cthis" id="createthisradio1" onclick="choosethis(this.id)"/> <label for="createthisradio1" class="inline">Time Out</label><br />\n\
                        <input type="radio" name="cthis" id="createthisradio2" onclick="choosethis(this.id)"/> <label for="createthisradio2" class="inline">Receive Mail</label><br />\n\
                        <input type="radio" name="cthis" id="createthisradio3" onclick="choosethis(this.id)"/> <label for="createthisradio3" class="inline">Monitor Weibo</label>\n\
                        </fieldset>\n\
                    </div>\n\
                    <div id="createthiscontent">\n\
                    </div>\n\
                    <div id="createthatmenu">\n\
                        <fieldset>\n\
                        <legend>THEN</legend>\n\
                            <input type="radio" name="cthat" id="createthatradio1" onclick="choosethat(this.id)"/> <label for="createthatradio1" class="inline">Send Weibo</label><br />\n\
                            <input type="radio" name="cthat" id="createthatradio2" onclick="choosethat(this.id)"/> <label for="createthatradio2" class="inline">Send Mail</label>\n\
                        </fieldset>\n\
                    </div>\n\
                    <div id="createthatcontent">\n\
                    </div>\n\
                    <button id="createbutton" class="green" onclick="createtask()"><i class="icon-ok-sign"></i> Ok</button>\n\
                    <div id="createback"></div>\n\
                    <hr class="alt2" />';
    document.getElementById("createtaskview").innerHTML=text;
}
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
        var text="<textarea id='cthis2_3' placeholder='The content you look for'></textarea><br>\n\
                    <input id='cthis2_1' type='text' placeholder='Weibo account '/>\n\
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
                thisdata+="&thisdate="+document.getElementById("cthis0_1").value+"&thistime="+document.getElementById("cthis0_2").value;
                break;
            }
            else if(i===1){                                              //get mail
                thisdata+="&thisaddr="+document.getElementById("cthis1_1").value+"&thispw="+document.getElementById("cthis1_2").value;
                break;
            }
            else if(i===2){                                              // look for weibo
                thisdata+="&thiscount="+document.getElementById("cthis2_1").value+"&thispw="+document.getElementById("cthis2_2").value+"&thicontent="+document.getElementById("cthis2_3").value;
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
                thatdata+="&thataccount="+document.getElementById("cthat0_2").value+"&thatpw="+document.getElementById("cthat0_3").value+"&content="+document.getElementById("cthat0_1").value;
                break;
            }
            else if(i===1){                                          //send mail
                thatdata+="&thataddr="+document.getElementById("cthat1_2").value+"&thatcontent="+document.getElementById("cthat1_1").value;
                break;
            }
         }
    }
    var url="taskmanager?name="+taskname+"&thistype="+thistype+thisdata+"&thattype="+thattype+thatdata;    
    alert(url);
    if(window.XMLHttpRequest) {  
        createrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        createrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    
    if(createrequest!==null){  
            createrequest.open("POST",url,true);       //gettaskinfo
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
                document.getElementById("createbutton").setAttribute('disabled','disabled');
            }
            else{                       //give me reason of unsuccess
                document.getElementById("createback").innerHTML='<div class="notice warning">\n\
                <i class="icon-warning-sign icon-large"></i>'+flag+'<a href="#close" class="icon-remove"></a></div>';
            }
            
        }
    }
}




