/* 
 * link with adminpage
 * @author tianchi
 */


$(document).ready(checklogin);
var request;
function checklogin() {
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (request !== null) {
        request.open("GET", "getuserinfo", true);
        request.onreadystatechange = checkback;
        request.send(null);
    }
}

function checkback() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            var flag = request.responseText;
            var obj = eval('(' + flag + ')');
            if (obj.admin === true) {
                return;
            }
        }
        location.href = "index.html";        //this uer dosen't log in ,so he cannot get into this page
    }
}

//delete a user
var deleterequest;
function deleteuser() {
    var name = document.getElementById("deleteuser").value;
    if (name === "") {                                      //if name is empty
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("deleteinfo").innerHTML = info;
        return false;
    }

    var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;                //name consists of a-z A-Z _
    if (!reg.test(name)) {
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name must consist of 'a-z'or'A-Z'or' _'<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("deleteinfo").innerHTML = info;
        return false;
    }
    if (window.XMLHttpRequest) {
        deleterequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        deleterequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (deleterequest !== null) {
        document.getElementById("deletebutton").setAttribute("disabled", "disabled");
        deleterequest.open("GET", "admin?name=" + name + "&delete=true", true);
        deleterequest.onreadystatechange = deleteback;
        deleterequest.send(null);
    }
}

function deleteback() {
    if (deleterequest.readyState === 4) {
        if (deleterequest.status === 200) {
            var flag = deleterequest.responseText;
            if (flag === "success") {
                var info = "<div class='notice success'><i class='icon-ok'></i>\n\
                                Delete successfully!<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("deleteinfo").innerHTML = info;
            }
            else {
                var info = "<div class='notice error'><i class='icon-remove-sign'>\n\
                            </i>" + flag + "<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("deleteinfo").innerHTML = info;
            }
        }
        document.getElementById("deletebutton").removeAttribute("disabled");
    }
}

//edit a suer's pw
var editpwrequest;
function editpw() {
    //pw valid
    var pw = document.getElementById("editpw").value;
    if (pw === "") {                                      //if name is empty
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Password cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editpwinfo").innerHTML = info;
        return false;
    }

    var reg = /^[a-zA-Z0-9]{6,}$/;
    if (!reg.test(pw)) {
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Password must consist of 'a-z'or'A-Z'(length>=6) <a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editpwinfo").innerHTML = info;
        return false;
    }

    //name valid
    var name = document.getElementById("editpwname").value;
    if (name === "") {                                      //if name is empty
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editpwinfo").innerHTML = info;
        return false;
    }

    var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;                //name consists of a-z A-Z _
    if (!reg.test(name)) {
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name must consist of 'a-z'or'A-Z'or' _'<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editpwinfo").innerHTML = info;
        return false;
    }
    if (window.XMLHttpRequest) {
        editpwrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        editpwrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (editpwrequest !== null) {
        document.getElementById("editpwbutton").setAttribute("disabled", "disabled");
        editpwrequest.open("GET", "admin?name=" + name + "&pw=" + pw, true);
        editpwrequest.onreadystatechange = editpwback;
        editpwrequest.send(null);
    }
}

function editpwback() {
    if (editpwrequest.readyState === 4) {
        if (editpwrequest.status === 200) {
            var flag = editpwrequest.responseText;
            if (flag === "success") {
                var info = "<div class='notice success'><i class='icon-ok'></i>\n\
                                Edit successfully!<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editpwinfo").innerHTML = info;
            }
            else {
                var info = "<div class='notice error'><i class='icon-remove-sign'>\n\
                            </i>" + flag + "<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editpwinfo").innerHTML = info;
            }
        }
        document.getElementById("editpwbutton").removeAttribute("disabled");
    }
}


//edit a suer's level
var editlevelrequest;
function editlevel() {
    //level valid
    var level = document.getElementById("editlevel").value;
    if (level < 0) {                                      //if name is empty
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Level cannot be negative<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editlevelinfo").innerHTML = info;
        return false;
    }

    //name valid
    var name = document.getElementById("editlevelname").value;
    if (name === "") {                                      //if name is empty
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editlevelinfo").innerHTML = info;
        return false;
    }

    var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;                //name consists of a-z A-Z _
    if (!reg.test(name)) {
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name must consist of 'a-z'or'A-Z'or' _'<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editlevelinfo").innerHTML = info;
        return false;
    }
    if (window.XMLHttpRequest) {
        editlevelrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        editlevelrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (editlevelrequest !== null) {
        document.getElementById("editlevelbutton").setAttribute("disabled", "disabled");
        editlevelrequest.open("GET", "admin?name=" + name + "&level=" + level, true);
        editlevelrequest.onreadystatechange = editlevelback;
        editlevelrequest.send(null);
    }
}

function editlevelback() {
    if (editlevelrequest.readyState === 4) {
        if (editlevelrequest.status === 200) {
            var flag = editlevelrequest.responseText;
            if (flag === "success") {
                var info = "<div class='notice success'><i class='icon-ok'></i>\n\
                                Edit successfully!<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editlevelinfo").innerHTML = info;
            }
            else {
                var info = "<div class='notice error'><i class='icon-remove-sign'>\n\
                            </i>" + flag + "<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editlevelinfo").innerHTML = info;
            }
        }
        document.getElementById("editlevelbutton").removeAttribute("disabled");
    }
}

//edit a suer's money
var editmoneyrequest;
function editmoney() {
    //money valid
    var money = document.getElementById("editmoney").value;
    if (money < 0) {                                      //if name is empty
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Money cannot be negative<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editmoneyinfo").innerHTML = info;
        return false;
    }

    //name valid
    var name = document.getElementById("editmoneyname").value;
    if (name === "") {                                      //if name is empty
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name cannot be empty<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editmoneyinfo").innerHTML = info;
        return false;
    }

    var reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/;                //name consists of a-z A-Z _
    if (!reg.test(name)) {
        var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                 </i>Name must consist of 'a-z'or'A-Z'or' _'<a href='#close' class='icon-remove'></a></div>";
        document.getElementById("editmoneyinfo").innerHTML = info;
        return false;
    }
    if (window.XMLHttpRequest) {
        editmoneyrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        editmoneyrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (editmoneyrequest !== null) {
        document.getElementById("editmoneybutton").setAttribute("disabled", "disabled");
        editmoneyrequest.open("GET", "admin?name=" + name + "&money=" + money, true);
        editmoneyrequest.onreadystatechange = editmoneyback;
        editmoneyrequest.send(null);
    }
}

function editmoneyback() {
    if (editmoneyrequest.readyState === 4) {
        if (editmoneyrequest.status === 200) {
            var flag = editmoneyrequest.responseText;
            if (flag === "success") {
                var info = "<div class='notice success'><i class='icon-ok'></i>\n\
                                Edit successfully!<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editmoneyinfo").innerHTML = info;
            }
            else {
                var info = "<div class='notice error'><i class='icon-remove-sign'>\n\
                            </i>" + flag + "<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editmoneyinfo").innerHTML = info;
            }
        }
        document.getElementById("editmoneybutton").removeAttribute("disabled");
    }
}


//edit this
var editthisrequest;
function editthis(i) {
    var thisid = document.getElementById("editthis").value;

    if (window.XMLHttpRequest) {
        editthisrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        editthisrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (editthisrequest !== null) {
        document.getElementById("editthisbutton").setAttribute("disabled", "disabled");
        editthisrequest.open("GET", "admin?thisid=" + thisid + "&edit=" + i, true);
        editthisrequest.onreadystatechange = editthisback;
        editthisrequest.send(null);
    }
}

function editthisback() {
    if (editthisrequest.readyState === 4) {
        if (editthisrequest.status === 200) {
            var flag = editthisrequest.responseText;
            if (flag === "success") {
                var info = "<div class='notice success'><i class='icon-ok'></i>\n\
                                Edit successfully!<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editthisinfo").innerHTML = info;
            }
            else {
                var info = "<div class='notice error'><i class='icon-remove-sign'>\n\
                            </i>" + flag + "<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editthisinfo").innerHTML = info;
            }
        }
        document.getElementById("editthisbutton").removeAttribute("disabled");
    }
}

//edit that
var editthatrequest;
function editthat(i) {
    var thatid = document.getElementById("editthat").value;
    alert(thatid);
    if (window.XMLHttpRequest) {
        editthatrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        editthatrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (editthatrequest !== null) {
        document.getElementById("editthatbutton").setAttribute("disabled", "disabled");
        editthatrequest.open("GET", "admin?thatid=" + thatid + "&edit=" + i, true);
        editthatrequest.onreadystatechange = editthatback;
        editthatrequest.send(null);
    }
}

function editthatback() {
    if (editthatrequest.readyState === 4) {
        if (editthatrequest.status === 200) {
            var flag = editthatrequest.responseText;
            if (flag === "success") {
                var info = "<div class='notice success'><i class='icon-ok'></i>\n\
                                Edit successfully!<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editthatinfo").innerHTML = info;
            }
            else {
                var info = "<div class='notice error'><i class='icon-remove-sign'>\n\
                            </i>" + flag + "<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("editthatinfo").innerHTML = info;
            }
        }
        document.getElementById("editthatbutton").removeAttribute("disabled");
    }
}

//get user log
var logrequest;
var logindex = 0;
function loguser() {
    logindex = 0;
    if (window.XMLHttpRequest) {
        logrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        logrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (logrequest !== null) {
        document.getElementById("logbutton").setAttribute("disabled", "disabled");
        logrequest.open("GET", "getlog?logindex=" + logindex, true);
        logrequest.onreadystatechange = logback;
        logrequest.send(null);
    }
}

function logback() {
    if (logrequest.readyState === 4) {
        if (logrequest.status === 200) {
            var flag = logrequest.responseText;
            if (flag !== "fail") {
                document.getElementById("logtext").innerHTML = flag;
            }
        }
        document.getElementById("logbutton").removeAttribute("disabled");
    }
}

function nextpage() {

    if (window.XMLHttpRequest) {
        logrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        logrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (logrequest !== null) {
        var index = logindex + 1;
        logrequest.open("GET", "getlog?logindex=" + index, true);
        logrequest.onreadystatechange = nextback;
        logrequest.send(null);
    }
}

function nextback() {
    if (logrequest.readyState === 4) {
        if (logrequest.status === 200) {
            var flag = logrequest.responseText;
            if (flag !== "fail") {
                logindex++;
                document.getElementById("logtext").innerHTML = flag;
            }
        }
        document.getElementById("logbutton").removeAttribute("disabled");
    }
}

function forwardpage() {

    if (window.XMLHttpRequest) {
        logrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        logrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (logrequest !== null) {
        var index = logindex - 1;
        logrequest.open("GET", "getlog?logindex=" + index, true);
        logrequest.onreadystatechange = forwardback;
        logrequest.send(null);
    }
}

function forwardback() {
    if (logrequest.readyState === 4) {
        if (logrequest.status === 200) {
            var flag = logrequest.responseText;
            if (flag !== "fail") {
                logindex--;
                document.getElementById("logtext").innerHTML = flag;
            }
        }
        document.getElementById("logbutton").removeAttribute("disabled");
    }
}

//send message
var msgrequest;
function sendmsg() {
    var name = document.getElementById("touser").value;
    var content = document.getElementById("msgtext").value;

    if (window.XMLHttpRequest) {
        msgrequest = new XMLHttpRequest();  //IE7, Firefox, Opera 
    } else if (window.ActiveXObject) {
        msgrequest = new ActiveXObject("Microsoft.XMLHTTP");   //IE5,IE6
    }
    if (msgrequest !== null) {
        url = "sendmsg?name=" + name + "&msg=" + content;
        url = encodeURI(encodeURI(url));
        document.getElementById("sendmsgbutton").setAttribute("disabled", "disabled");
        msgrequest.open("GET",url , true);
        msgrequest.onreadystatechange = msgback;
        msgrequest.send(null);
    }
}

function msgback() {
    if (msgrequest.readyState === 4) {
        if (msgrequest.status === 200) {
            var flag = msgrequest.responseText;
            if (flag === 'success') {
                var info = "<div class='notice success'><i class='icon-ok'></i>\n\
                                Send successfully !<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("msginfo").innerHTML = info;
            }
            else {
                var info = "<div class='notice error'><i class='icon-remove-sign '>\n\
                            </i>"+flag+"<a href='#close' class='icon-remove'></a></div>";
                document.getElementById("msginfo").innerHTML = info;
            }
        }
        document.getElementById("sendmsgbutton").removeAttribute("disabled");
    }

}