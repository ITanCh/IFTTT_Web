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
                msgready();
            }
        }
    }
}
function closemsg(){
     document.getElementById("message").innerHTML='';
}
function msgready() {

    // the element we want to apply the jScrollPane
    var $el = $('#jp-container').jScrollPane({
        verticalGutter: -16
    }),
    // the extension functions and options 	
    extensionPlugin = {
        extPluginOpts: {
            // speed for the fadeOut animation
            mouseLeaveFadeSpeed: 500,
            // scrollbar fades out after hovertimeout_t milliseconds
            hovertimeout_t: 1000,
            // if set to false, the scrollbar will be shown on mouseenter and hidden on mouseleave
            // if set to true, the same will happen, but the scrollbar will be also hidden on mouseenter after "hovertimeout_t" ms
            // also, it will be shown when we start to scroll and hidden when stopping
            useTimeout: false,
            // the extension only applies for devices with width > deviceWidth
            deviceWidth: 980
        },
        hovertimeout: null, // timeout to hide the scrollbar
        isScrollbarHover: false, // true if the mouse is over the scrollbar
        elementtimeout: null, // avoids showing the scrollbar when moving from inside the element to outside, passing over the scrollbar
        isScrolling: false, // true if scrolling
        addHoverFunc: function() {

            // run only if the window has a width bigger than deviceWidth
            if ($(window).width() <= this.extPluginOpts.deviceWidth)
                return false;

            var instance = this;

            // functions to show / hide the scrollbar
            $.fn.jspmouseenter = $.fn.show;
            $.fn.jspmouseleave = $.fn.fadeOut;

            // hide the jScrollPane vertical bar
            var $vBar = this.getContentPane().siblings('.jspVerticalBar').hide();

            /*
             * mouseenter / mouseleave events on the main element
             * also scrollstart / scrollstop - @James Padolsey : http://james.padolsey.com/javascript/special-scroll-events-for-jquery/
             */
            $el.bind('mouseenter.jsp', function() {

                // show the scrollbar
                $vBar.stop(true, true).jspmouseenter();

                if (!instance.extPluginOpts.useTimeout)
                    return false;

                // hide the scrollbar after hovertimeout_t ms
                clearTimeout(instance.hovertimeout);
                instance.hovertimeout = setTimeout(function() {
                    // if scrolling at the moment don't hide it
                    if (!instance.isScrolling)
                        $vBar.stop(true, true).jspmouseleave(instance.extPluginOpts.mouseLeaveFadeSpeed || 0);
                }, instance.extPluginOpts.hovertimeout_t);


            }).bind('mouseleave.jsp', function() {

                // hide the scrollbar
                if (!instance.extPluginOpts.useTimeout)
                    $vBar.stop(true, true).jspmouseleave(instance.extPluginOpts.mouseLeaveFadeSpeed || 0);
                else {
                    clearTimeout(instance.elementtimeout);
                    if (!instance.isScrolling)
                        $vBar.stop(true, true).jspmouseleave(instance.extPluginOpts.mouseLeaveFadeSpeed || 0);
                }

            });

            if (this.extPluginOpts.useTimeout) {

                $el.bind('scrollstart.jsp', function() {

                    // when scrolling show the scrollbar
                    clearTimeout(instance.hovertimeout);
                    instance.isScrolling = true;
                    $vBar.stop(true, true).jspmouseenter();

                }).bind('scrollstop.jsp', function() {

                    // when stop scrolling hide the scrollbar (if not hovering it at the moment)
                    clearTimeout(instance.hovertimeout);
                    instance.isScrolling = false;
                    instance.hovertimeout = setTimeout(function() {
                        if (!instance.isScrollbarHover)
                            $vBar.stop(true, true).jspmouseleave(instance.extPluginOpts.mouseLeaveFadeSpeed || 0);
                    }, instance.extPluginOpts.hovertimeout_t);

                });

                // wrap the scrollbar
                // we need this to be able to add the mouseenter / mouseleave events to the scrollbar
                var $vBarWrapper = $('<div/>').css({
                    position: 'absolute',
                    left: $vBar.css('left'),
                    top: $vBar.css('top'),
                    right: $vBar.css('right'),
                    bottom: $vBar.css('bottom'),
                    width: $vBar.width(),
                    height: $vBar.height()
                }).bind('mouseenter.jsp', function() {

                    clearTimeout(instance.hovertimeout);
                    clearTimeout(instance.elementtimeout);

                    instance.isScrollbarHover = true;

                    // show the scrollbar after 100 ms.
                    // avoids showing the scrollbar when moving from inside the element to outside, passing over the scrollbar								
                    instance.elementtimeout = setTimeout(function() {
                        $vBar.stop(true, true).jspmouseenter();
                    }, 100);

                }).bind('mouseleave.jsp', function() {

                    // hide the scrollbar after hovertimeout_t
                    clearTimeout(instance.hovertimeout);
                    instance.isScrollbarHover = false;
                    instance.hovertimeout = setTimeout(function() {
                        // if scrolling at the moment don't hide it
                        if (!instance.isScrolling)
                            $vBar.stop(true, true).jspmouseleave(instance.extPluginOpts.mouseLeaveFadeSpeed || 0);
                    }, instance.extPluginOpts.hovertimeout_t);

                });

                $vBar.wrap($vBarWrapper);

            }

        }

    },
    // the jScrollPane instance
    jspapi = $el.data('jsp');

    // extend the jScollPane by merging	
    $.extend(true, jspapi, extensionPlugin);
    jspapi.addHoverFunc();

}
