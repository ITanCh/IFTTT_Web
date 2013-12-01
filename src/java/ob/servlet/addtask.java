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
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.dao.TaskDao;
import ob.dao.UserDao;
import ob.config.LogText;

/**
 *
 * @author oubeichen
 */
public class addtask extends HttpServlet {

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
        if (loginedUserName != null && !loginedUserName.equals("")) {
            List list = userdao.queryInfo("username", loginedUserName);
            if (list != null) {//数据库是否出错
                Iterator it = list.iterator();
                while (it.hasNext()) {
                    po = (UserInfoPO) it.next();
                    if (po.getUsername().equals(loginedUserName)) {//找到了对应用户
                        if (getdata(request) && validate())//获取数据并且验证输入合法
                        {
                            if (taskdao.savetask(task()).equals("success")) {//新建Task
                                outinfo = "success";
                            } else {
                                outinfo = LogText.ADDTASKERROR;
                            }
                        }
                    }
                }
            } else {
                outinfo = "Database Error";
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
        uid = po.getUid();
        tid = request.getParameter("tid");
        taskname = request.getParameter("taskname");
        try {
            thistype = Integer.parseInt(request.getParameter("thistype"));
            thattype = Integer.parseInt(request.getParameter("thattype"));
        } catch (NumberFormatException e) {
            outinfo = "ThisType or ThatType Error";
            return false;
        }
        thisstr1 = request.getParameter("thisstr1");
        thisstr2 = request.getParameter("thisstr2");
        thatusername = request.getParameter("thatusername");
        thatpassword = request.getParameter("thatpassword");
        String temp = request.getParameter("usethis");
        usethis = temp != null && temp.equals("true");
        thatdstemail = request.getParameter("thatdstemail");
        thatemailtitle = request.getParameter("thatemailtitle");
        thatemailtext = request.getParameter("thatemailtext");
        return true;
    }

    /**
     * 验证输入合法
     *
     * @return
     */
    public boolean validate() {
        return true;
    }

     public TaskPO task() {
        TaskPO taskpo = new TaskPO();
        taskpo.setUid(uid);
        taskpo.setTaskname(taskname);
        taskpo.setThistype(thistype);
        taskpo.setThattype(thattype);
        taskpo.setThisstr1(thisstr1);
        taskpo.setThisstr2(thisstr2);
        taskpo.setThatusername(thatusername);
        taskpo.setThatpassword(thatpassword);
        taskpo.setUsethis(usethis);
        taskpo.setThatdstemail(thatdstemail);
        taskpo.setThatemailtitle(thatemailtitle);
        taskpo.setThatemailtext(thatemailtext);
        return taskpo;
    }
    
    private String outinfo;
    private final UserDao userdao = new UserDao();
    private final TaskDao taskdao = new TaskDao();
    private String loginedUserName;
    private UserInfoPO po;

    //用于处理Task的临时变量
    private String del;//如果是删除任务，则需要用到tid
    private String tid;//如果是编辑、删除任务，则需要用到tid
    private int uid;//代表所属的用户
    private String taskname;
    //getter和setter设置的东西太多，所以干脆用public，请原谅
    private int thistype;
    //新浪API限制了不能访问其他用户的微博，所以只能登陆后访问自己的微博了
    private String thisstr1;//type == 0 date//type == 1 email//type == 2 weiboid
    private String thisstr2;//type == 0 time//type == 1 emailpass//type ==2 weibopass

    private int thattype;

    private String thatusername;//type==0 weiboname//type==1 src email
    private String thatpassword;//type==0 weiboname//type==1 src email
    private boolean usethis;//type ==0是否使用在This中配置的weibo //type ==1是否使用在This中配置的Email
    private String thatdstemail;//以下均为Type == 1
    private String thatemailtitle;
    private String thatemailtext;
}
