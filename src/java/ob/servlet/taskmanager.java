/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.servlet;

import PO.TaskPO;
import PO.UserInfoPO;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.dao.TaskDao;
import ob.dao.UserDao;
import ob.config.LogText;
import ob.manager.RunningTask;
import ob.util.AESUtil;

/**
 *
 * @author oubeichen
 */
public class taskmanager extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        loginedUserName = (String) request.getSession().getAttribute("username");
        if (loginedUserName != null && !loginedUserName.equals("")) {//虽然用session即可判断是否登录，但必须查询数据库才能得到uid
            loginedUserid = (Integer) request.getSession().getAttribute("userid");
            po = userdao.getinfo(loginedUserid);
            if (po.getUsername().equals(loginedUserName)) {//找到了对应用户
                if (getdata(request) && validate())//获取数据并且验证输入合法
                {
                    if (tid == null) {
                        if (taskdao.saveTask(task()).equals("success")) {//新建Task
                            outinfo = "success";
                        } else {
                            outinfo = LogText.ADDTASKERROR;
                        }
                    } else {
                        if (start != null) {
                            if (RunningTask.addTask(taskpo)) {
                                outinfo = "success";
                            } else {
                                outinfo = "start task failed";
                            }
                        } else if (stop != null) {
                            RunningTask.delTask(tid);
                        } else if (del != null) {
                            if (RunningTask.isHere(tid)) {
                                outinfo = "请停止任务后再删除";
                            } else {
                                if (taskdao.deleteTask(tid)) {
                                    outinfo = "success";
                                } else {
                                    outinfo = "stop task failed";
                                }
                            }
                        } else {
                            if (RunningTask.isHere(tid)) {
                                outinfo = "请停止任务后再修改";
                            } else {
                                if (taskdao.updateTask(task())) {//新建Task
                                    outinfo = "success";
                                } else {
                                    outinfo = LogText.EDITTASKERROR;
                                }
                            }
                        }
                    }
                }
            } else {
                outinfo = "数据库出错，请稍后访问";
            }
        }
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            /* TODO output your page here. You may use following sample code. */
            out.print(outinfo);
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    /**
     * 获取request中的输入
     *
     * @param request
     * @return
     */
    public boolean getdata(HttpServletRequest request) {
        del = request.getParameter("del");
        start = request.getParameter("start");
        stop = request.getParameter("stop");
        tid = request.getParameter("tid");
        //if新建任务
        taskname = request.getParameter("name");
        if (request.getParameter("thistype") != null || request.getParameter("thattype") != null) {
            try {
                thistype = Integer.parseInt(request.getParameter("thistype"));
                thattype = Integer.parseInt(request.getParameter("thattype"));
            } catch (NumberFormatException e) {
                outinfo = "ThisType or ThatType Error";
                return false;
            }
        }
        if (thistype == 0) {
            thisstr1 = request.getParameter("thisdate");
            thisstr2 = request.getParameter("thistime");
        } else if (thistype == 1) {
            thisstr1 = request.getParameter("thisaddr");
            thisstr2 = request.getParameter("thispw");
        } else if (thistype == 2) {
            thisstr1 = request.getParameter("thisaccount");
            thisstr2 = request.getParameter("thispw");
            thistext = request.getParameter("thistext");
        }
        if (thattype == 0) {//weibo
            thatusername = request.getParameter("thataccount");
            thatpassword = request.getParameter("thatpw");
        } else if (thattype == 1) {//mail
            thatusername = request.getParameter("thataddr");
        }
        thattext = request.getParameter("thattext");
        return true;
    }

    /**
     * 验证输入合法
     *
     * @return
     */
    public boolean validate() {
        if (tid != null) {//是修改任务
            taskpo = taskdao.getTask(tid);
            if (taskpo != null) {
                if (taskpo.getUid() != loginedUserid) {//任务不归该用户所属
                    outinfo = "找不到要修改的任务，请刷新页面重试";
                    return false;
                }else{
                    if (taskpo.getThistype() != thistype && (thistype == 1 || thistype == 2)) {//更换了thistype，必须输入密码
                        if (thisstr2 == null || thisstr2.equals("")) {//有输入密码，需要验证输入合法
                            outinfo = "请输入this中的密码";
                            return false;
                        }
                    }
                    if(taskpo.getThattype() != thattype && (thattype == 0)){
                        if (thatpassword == null || thatpassword.equals("")) {
                            outinfo = "请输入that中的密码";
                            return false;
                        }
                    }
                }
            } else {
                outinfo = "找不到要修改的任务，请刷新页面重试";
                return false;//找不到任务
            }
            if (del != null || start != null || stop != null) {//删除、新建、停止任务只需要验证tid
                return true;
            }
        } else {//新建任务，必须要输入密码项
            taskpo = null;
            if (thistype == 1 || thistype == 2) {
                if (thisstr2 == null || thisstr2.equals("")) {//有输入密码，需要验证输入合法
                    outinfo = "请输入this中的密码";
                    return false;
                }
            }
            if (thattype == 0) {//发微博要密码
                if (thatpassword == null || thatpassword.equals("")) {
                    outinfo = "请输入that中的密码";
                    return false;
                }
            }
        }
        if (taskname.length() > 25) {
            outinfo = "标题太长";
            return false;
        } else if (taskname.length() < 2) {
            outinfo = "标题太短";
            return false;
        }
        if (thistype < 0 || thistype > 3) {
            outinfo = "选择的this类型有误";
            return false;
        }
        if (thattype < 0 || thattype > 2) {
            outinfo = "选择的that类型有误";
            return false;
        }
        if (thistype == 0) {
            if (!thisstr1.matches("^([0-9]{4})-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1])$")) {
                outinfo = "this输入的日期有误";
                return false;
            }
            if (!thisstr2.matches("^([0-1][0-9]|[2][0-3]):([0-5][0-9])$")) {
                outinfo = "this输入的时间有误";
                return false;
            }
        } else if (thistype == 1) {
            if (!thisstr1.matches("^[a-z0-9][a-z0-9\\._-]*@[a-z0-9][a-z0-9-]*\\.([a-z0-9][a-z0-9-]*\\.)*[a-z]+$")) {
                outinfo = "this输入的邮箱格式有误";
                return false;
            }
        }
        if (thisstr1.length() < 2) {
            outinfo = "this输入的登录名太短";
            return false;
        } else if (thisstr1.length() > 25) {
            outinfo = "this输入的登录名太长";
            return false;
        }
        if (thisstr2.length() > 25) {
            outinfo = "this输入的密码太长";
            return false;
        }
        if (thattype == 1) {
            if (!thatusername.matches("^[a-z0-9][a-z0-9\\._-]*@[a-z0-9][a-z0-9-]*\\.([a-z0-9][a-z0-9-]*\\.)*[a-z]+$")) {
                outinfo = "that输入的邮箱格式有误";
                return false;
            }
        }
        if (thatusername.length() < 2) {
            outinfo = "that输入的登录名太短";
            return false;
        } else if (thatusername.length() > 25) {
            outinfo = "that输入的登录名太长";
            return false;
        }
        if (thatpassword != null && thatpassword.length() > 25) {
            outinfo = "that输入的密码太长";
            return false;
        }
        if (thattext.equals("")) {
            outinfo = "请输入that发送消息内容";
            return false;
        }
        return true;
    }

    public TaskPO task() {
        if (taskpo == null) {
            taskpo = new TaskPO();
            taskpo.setCtime(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
        }
        taskpo.setUid(loginedUserid);
        taskpo.setTaskname(taskname);

        taskpo.setThistype(thistype);
        taskpo.setThattype(thattype);
        taskpo.setThisstr1(thisstr1);
        if (thistype == 1 || thistype == 2) {
            if (thisstr2 != null && !thisstr2.equals("")) {//有输入密码，前面已经验证输入合法
                taskpo.setThisstr2(AESUtil.Encrytor(thisstr2));
            }
        } else {
            taskpo.setThisstr2(thisstr2);
        }
        taskpo.setThistext(thistext);
        taskpo.setThatusername(thatusername);
        if (thatpassword != null && !thatpassword.equals("")) {
            taskpo.setThatpassword(AESUtil.Encrytor(thatpassword));
        }
        taskpo.setThattext(thattext);
        return taskpo;
    }

    private String outinfo;
    private final UserDao userdao = new UserDao();
    private final TaskDao taskdao = new TaskDao();
    private String loginedUserName;
    private int loginedUserid;
    private UserInfoPO po;
    private TaskPO taskpo;

    //用于处理Task的临时变量
    private String del;//如果是删除任务，则需要用到tid
    private String tid;//如果是编辑、删除任务，则需要用到tid
    private String start;//如果是开始任务，则需要用到start
    private String stop;//如果是结束任务，则需要用到stopp

    private String taskname;
    //getter和setter设置的东西太多，所以干脆用public，请原谅
    private int thistype;
    //新浪API限制了不能访问其他用户的微博，所以只能登陆后访问自己的微博了
    private String thisstr1;//type == 0 date//type == 1 email//type == 2 weiboid
    private String thisstr2;//type == 0 time//type == 1 emailpass//type ==2 weibopass
    private String thistext;
    
    private int thattype;

    private String thatusername;//type==0 weiboname//type==1 src email
    private String thatpassword;//type==0 weiboname//type==1 src email
    private String thattext;
}
