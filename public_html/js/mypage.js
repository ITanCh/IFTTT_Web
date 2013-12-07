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

function viewtaskback(id){
     if(vtrequest.readyState===4){  
        if(vtrequest.status===200){
            //insert main fame firstly
            var mainframe='<hr>\n\
                            <label for="taskname">Task Name:</label>\n\
                            <input id="taskname"  type="text" />\n\
                            <hr class="alt2" />\n\
                            <div id="thismenu">\n\
                            <fieldset>\n\
                            <legend>IF</legend>\n\
                            <input type="radio" name="this" id="thisradio1" onclick="editthis(this.id)" /> <label for="thisradio1" class="inline">Time Out</label><br />\n\
                            <input type="radio" name="this" id="thisradio2" onclick="editthis(this.id)"/> <label for="thisradio2" class="inline">Receive Mail</label><br />\n\
                             <input type="radio" name="this" id="thisradio3" obclick="editthis(this.id)"/> <label for="thisradio3" class="inline">Monitor Weibo</label>\n\
                            </fieldset>\n\
                             </div>\n\
                        <div id="thiscontent">\n\
                        <!--insert when user want to view some task-->\n\
                        </div>\n\
                    <div id="thatmenu">\n\
                        <fieldset>\n\
                        <legend>THEN</legend>\n\
                            <input type="radio" name="that" id="thatradio1" onclick="editthat(this.id)"/> <label for="thatradio1" class="inline">Send Weibo</label><br />\n\
                            <input type="radio" name="that" id="thatradio2" onclick="editthat(this.id)"/> <label for="thatradio2" class="inline">Send Mail</label>\n\
                        </fieldset>\n\
                    </div>\n\
                    <div id="thatcontent">\n\
                        <!--insert when user want to view some task-->\n\
                    </div>\n\
                    <ul class="button-bar">\n\
                    <li><button id="edittask"class="orange" onclick="edittask()"><i class="icon-pencil"></i> Edit</button></li>\n\
                    <li><button id="oktask"  class=""  onclick="okedit('+id+')" disabled="disabled"><i class="icon-ok-sign"></i> Ok</button></li>\n\
                    <li><button id="deletetask" class="red" onclick="deletetask('+id+')"><i class="icon-remove-sign"></i> Delete</button></li>\n\
                    <div id="editback"></div>\n\
                    </ul>\n\
                    <hr class="alt2" />';
            document.getElementById("taskview").innerHTML=mainframe;
            
            //fill in all text
            var flag=vtrequest.responseText;
            if(flag===fals)return;
            var obj=eval('('+flag+')');
            //fill this content
            var thisradio;
            document.getElementById("taskname").value=obj.name;
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
                thistext='<textarea id="this2_3"  name="this" >'+obj.thisaccount+'</textarea><br>\n\
                    <input id="this2_1" name="this"  type="text"  value="'+obj.thiscontent+'"/>\n\
                    <br><br>\n\
                    <input id="this2_2"  name="this" type="text"  placeholder="Default Password is the last one"/>';
            }
            thisradio.checked=true;
            thiscontent.innerHTML=thistext;
            thisradio.setAttribute("onclick","noteditthis("+thistext+")");
            //fill that content
            var thatradio;
            var thatcontent=document.getElementById("thatcontent");
            var thattext;
            if(obj.thattype===0){            //send weibo
                thatradio=document.getElementById("thatradio1");
                thattext='<textarea id="that0_1"   name="that">'+obj.thatcontent+'</textarea><br>\n\
                <input id="that0_2" name="that" type="text" value="'+obj.thataccount+' /><br><br>\n\
                <input id="that0_3" name="that" type="pw" placeholder="Default Password is the last one" />';
            }
            else if(obj.thattype===1){       //send mail
                thatradio=document.getElementById("thatradio2");
                thattext='<textarea id="that1_1" name="that">'+obj.thatcoutent+'</textarea><br>\n\
                    <input id="that1_2" name="that" type="text" value="'+obj.thataddr+'" />';
            }
            thatradio.checked=true;
            thatcontent.innerHTML=thattext;
            thatradio.setAttribute("onclick","noteditthat("+thattext+")");
            //make them  disabled
            document.getElementById("taskname").setAttribute("disabled","disabled");
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
//recover old text
function notedittthis(text){
    document.getElementById("thiscontent").innerHTML=text;
}

function noteditthat(text){
    document.getElementById("thatcontent").innerHTML=text;
}

//edit this 
function editthis(id){
    var content=document.getElementById("thiscontent");
    var text;
    if(id==="thisradio1"){            //time
        text="<input id='this0_1' type='text' placeholder='2013-11-11'/>\n\
                <br><br>\n\
                <input id='this0_2' type='text' placeholder='11:11'/>";
    }
    else if(id==="createthisradio2"){       //mail
        text="<input id='this1_1' type='text' placeholder='name@example.com'/>\n\
                <br><br>\n\
                <input id='this1_2' type='text' placeholder='Password'/>";       
    }
    else if(id==="createthisradio3"){       //weibo
        text="<textarea id='this2_3' placeholder='The content you look for'></textarea><br>\n\
                    <input id='this2_1' type='text' placeholder='Weibo account '/>\n\
                    <br><br>\n\
                    <input id='this2_2' type='text' placeholder='Password'/>";  
    }
    content.innerHTML=text;
}
//edit that
function editthat(id){
    var content=document.getElementById("thatcontent");
    var text;
    if(id==="thatradio1"){            //send weibo
        text='<textarea id="that0_1" placeholder="Say something"></textarea><br>\n\
                <input id="that0_2" type="text" placeholder="Weibo account" /><br><br>\n\
                <input id="that0_3" type="pw" placeholder="Password" />';
    }
    else if(id==="thatradio2"){       //send mail
         text='<textarea id="that1_1"  placeholder="Say something"></textarea><br>\n\
                    <input id="that1_2" type="text" placeholder="name@example.com" />';
    }
    content.innerHTML=text;
}
//edit a task
function edittask(){
    //make them editable
    document.getElementById("taskname").removeAttribute("disabled");
    var thisobj=document.getElementsByName("this");
    for(var i=0;i<thisobj.length;i++){
        thisobj[i].removeAttribute('disabled');
    }
    var thatobj=document.getElementsByName("that");
    for(var i=0;i<thatobj.length;i++){
        thatobj[i].removeAttribute("disabled");
    }
    var editbutton=document.getElementById("edittask");//black this button
    editbutton.setAttribute("class","");
    editbutton.setAttribute("disabled","disabled");
    //make ok clickable
    var okbutton=document.getElementById("oktask");
    okbutton.setAttribute("class","green");
    okbutton.removeAttribute("disabled");
}

//the task has been edited and click ok
var editrequset;
function okedit(id){
    var thisobj=document.getElementsByName("this");                //choose this    
    var taskname=document.getElementById("taskname").value;        //get name
    var thistype=-1;
    var thisdata="";
    for(var i=0;i<thisobj.length;i++){                              //get this
        if(thisobj[i].checked){
            thistype=i;
            if(i===0){                                              //time out
                thisdata+="&thisdate="+document.getElementById("this0_1").value+"&thistime="+document.getElementById("this0_2").value;
                break;
            }
            else if(i===1){                                              //get mail
                thisdata+="&thisaddr="+document.getElementById("this1_1").value+"&thispw="+document.getElementById("this1_2").value;
                break;
            }
            else if(i===2){                                              // look for weibo
                thisdata+="&thiscount="+document.getElementById("this2_1").value+"&thispw="+document.getElementById("this2_2").value+"&thicontent="+document.getElementById("this2_3").value;
                break;
            }
        }
    }
     
    var thatobj=document.getElementsByName("that");                //choose this    
    var thattype=-1;
    var thatdata="";
    for(var i=0;i<thatobj.length;i++){                              //get this
        if(thatobj[i].checked){
            thattype=i;
            if(i===0){                                              //send weibo
                thatdata+="&thataccount="+document.getElementById("that0_2").value+"&thatpw="+document.getElementById("that0_3").value+"&content="+document.getElementById("that0_1").value;
                break;
            }
            else if(i===1){                                          //send mail
                thatdata+="&thataddr="+document.getElementById("that1_2").value+"&thatcontent="+document.getElementById("that1_1").value;
                break;
            }
         }
    }
    var url="taskmanager?tid="+id+"name="+taskname+"&thistype="+thistype+thisdata+"&thattype="+thattype+thatdata;    
    //alert(url);
    if(window.XMLHttpRequest) {  
        editrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        editrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    
    if(editrequest!==null){  
            document.getElementById("deletetask").setAttribute('class','');
            document.getElementById("deletetask").setAttribute('disabled','disabled');
            document.getElementById("oktask").setAttribute('class','');
            document.getElementById("oktask").setAttribute('disabled','disabled');
            editrequest.open("POST",url,true);       //gettaskinfo
            editrequest.onreadystatechange=editback;
            editrequest.send(null);
    }  
}

function editback(){
  if(editrequest.readyState===4){  
        if(editrequest.status===200){ 
            var flag=editrequest.responseText;
            if(flag==="success"){
                document.getElementById("taskview").innerHTML='<div class="notice success">\n\
                    <i class="icon-ok icon-large"></i>Edit sucessfully!<a href="#close" class="icon-remove"></a></div>';
                createtable();          //update task table
                return;
            }
            else{
                document.getElementById("editback").innerHTML='<div class="notice error">\n\
                <i class="icon-remove-sign icon-large"></i>'+flag+'<a href="#close" class="icon-remove"></a></div>';
            }  
        }
    }
    document.getElementById("oktask").setAttribute('class','green');
    document.getElementById("oktask").removeAttribute('disabled');
    document.getElementById("deletetask").setAttribute('class','red');
    document.getElementById("deletetask").removeAttribute('disabled');
}

//delete a task
var deleterequset;
var deleteflag=0;
function notdelete(){
    document.getElementById("editback").innerHTML="";
    deleteflag=0;
}
function deletetask(id){
    if(deleteflag===0){                 //double click to delete a task. safer
        deleteflag=1;                   
         document.getElementById("editback").innerHTML='<div class="notice warning">\n\
                <i class="icon-warning-sign icon-large"></i>Click again , you will delete this task!<a href="#close" class="icon-remove"></a></div>';
                setTimeout("notdelete()",2000);         //2s later,if not double click ,do not delete
        return;
    }
    deleteflag=0;
    if(window.XMLHttpRequest) {  
        deleterequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        deleterequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    
    if(deleterequest!==null){  
            //disable button
            document.getElementById("deletetask").setAttribute('class','');
            document.getElementById("deletetask").setAttribute('disabled','disabled');
            document.getElementById("oktask").setAttribute('class','');
            document.getElementById("oktask").setAttribute('disabled','disabled');
            deleterequest.open("POST","taskmanager?tid="+id,true);       //gettaskinfo
            deleterequest.onreadystatechange=deleteback;
            deleterequest.send(null);
    } 
    
}

function deleteback(){
    if(editrequest.readyState===4){  
        if(editrequest.status===200){ 
            var flag=editrequest.responseText;
            if(flag==="success"){
                   document.getElementById("taskview").innerHTML='<div class="notice success">\n\
                    <i class="icon-ok icon-large"></i>Delete sucessfully!<a href="#close" class="icon-remove"></a></div>';
                createtable();          //update task table
                return;
            }
            else{
                document.getElementById("editback").innerHTML='<div class="notice error">\n\
                <i class="icon-remove-sign icon-large"></i>'+flag+'<a href="#close" class="icon-remove"></a></div>';
            }
        }
    }
    var edit=document.getElementById("edittask");
    var editflag=edit.getAttribute("disabled");
    if(editflag==='disabled'){
        document.getElementById("oktask").setAttribute('class','green');
        document.getElementById("oktask").removeAttribute('disabled');
    }
    document.getElementById("deletetask").setAttribute('class','red');
    document.getElementById("deletetask").removeAttribute('disabled');
}
//function disableedit(){
//            var thisradio;
//            var thiscontent=document.getElementById("thiscontent");
//            var thistext;
//            var thistype=2;
//            if(thistype===0){            //time
//                thisradio=document.getElementById("thisradio1");
//                thistext='<input id="this0_1" name="this" type="text" value="'+'obj.thisdate'+'"/>\n\
//                <br><br>\n\
//                <input id="this0_2"  name="this" type="text"  value="'+'obj.thistime'+'"/>';
//            }
//            else if(thistype===1){       //mail
//                thisradio=document.getElementById("thisradio2");
//                thistext='<input id="this1_1"  name="this" type="text"  value="'+'obj.thisaddr'+'"/>\n\
//                <br><br>\n\
//                <input id="this1_2"  name="this" type="text" placeholder="Default Password is the last one"/>';
//            }
//            else if(thistype===2){       //weibo
//                thisradio=document.getElementById("thisradio3");
//                thistext='<textarea id="this2_3"  name="this" >'+'obj.thisaccount'+'</textarea><br>\n\
//                    <input id="this2_1" name="this"  type="text"  value="'+'obj.thiscontent'+'"/>\n\
//                    <br><br>\n\
//                    <input id="this2_2"  name="this" type="text" placeholder="Default Password is the last one"/>';
//            }
//            thisradio.checked=true;
//            thiscontent.innerHTML=thistext;
//            
//            //fill that content
//            var thatradio;
//            var thatcontent=document.getElementById("thatcontent");
//            var thattext;
//            var thattype=0;
//            if(thattype===0){            //send weibo
//                thatradio=document.getElementById("thatradio1");
//                thattext='<textarea id="that0_1"   name="that">'+'obj.thatcontent'+'</textarea><br>\n\
//                <input id="that0_2" name="that" type="text" value="'+'obj.thataccount'+'"/><br><br>\n\
//                <input id="that0_3" name="that" type="pw" placeholder="Default Password is the last one" />';
//            }
//            else if(thattype===1){       //send mail
//                thatradio=document.getElementById("thatradio2");
//                thattext='<textarea id="that1_1" name="that">'+'obj.thatcoutent'+'</textarea><br>\n\
//                    <input id="that1_2" name="that" type="text" value="'+'obj.thataddr'+'" />';
//            }
//            thatradio.checked=true;
//            thatcontent.innerHTML=thattext;
//             var thisobj=document.getElementsByName("this");
//             for(var i=0;i<thisobj.length;i++){
//            thisobj[i].setAttribute('disabled','disabled');
//            }
//            var thatobj=document.getElementsByName("that");
//            for(var i=0;i<thatobj.length;i++){
//            thatobj[i].setAttribute('disabled','disabled');
//            }
//}

/*
 * create a task
 * 
 */
// reprint the create task view
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
    var thistype=-1;
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
    var thattype=-1;
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
    //alert(url);
    if(window.XMLHttpRequest) {  
        createrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    }else if(window.ActiveXObject) {  
        createrequset = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    
    if(createrequest!==null){  
            document.getElementById("createbutton").setAttribute('class','');
            document.getElementById("createbutton").setAttribute('disabled','disabled');
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
                //timer reprint in 3s 
                setTimeout("timereprintcreate(2)",1000);
                setTimeout("timereprintcreate(1)",2000);
                setTimeout("timereprintcreate(0)",3000);
                return;
            }
            else{                       //give me reason of unsuccess
                document.getElementById("createback").innerHTML='<div class="notice error">\n\
                <i class="icon-remove-sign icon-large"></i>'+flag+'<a href="#close" class="icon-remove"></a></div>';
            }  
        }
    }
    document.getElementById("createbutton").setAttribute('class','green');
    document.getElementById("createbutton").removeAttribute('disabled');
}

//timer about reprint
function timereprintcreate(t){
     document.getElementById("createback").innerHTML='<div class="notice success">\n\
                    <i class="icon-ok icon-large"></i>Successfully! I will reprint '+t+' s later...<a href="#close" class="icon-remove"></a></div>';
    if(t===0){
        getcreateview();        //reprint view
    }
}




