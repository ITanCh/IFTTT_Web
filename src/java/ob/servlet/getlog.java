/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.servlet;

import ob.PO.LogPO;
import ob.PO.UserInfoPO;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.dao.LogDao;
import ob.dao.UserDao;

/**
 *
 * @author oubeichen
 */
public class getlog extends HttpServlet {

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
        outinfo = new StringBuilder("fail");
        try{
            index = Integer.parseInt((String)request.getParameter("logindex"));
        }catch(NumberFormatException e){
            index = -1;
        }
        if (index >= 0) {//index没错
            loginedUserName = (String) request.getSession().getAttribute("username");
            if (loginedUserName != null && !loginedUserName.equals("")) {
                if (request.getSession().getAttribute("userid") != null) {
                    loginedUserid = (Integer) request.getSession().getAttribute("userid");
                    UserInfoPO po = dao.getinfo(loginedUserid);
                    if (po != null && po.getUsername().equals(loginedUserName) && po.isAdmin()) {//判断是否管理员
                        List list = logdao.getLog(index);
                        if(list != null && list.size() > 0){
                            outinfo = new StringBuilder();
                            Iterator it = list.iterator();
                            while(it.hasNext()){
                                logpo = (LogPO)it.next();
                                outinfo.append("LogID:").append(logpo.getLid());
                                outinfo.append("\t时间:").append(logpo.getTime());
                                outinfo.append("\t用户:").append(logpo.getUname());
                                outinfo.append("\t任务：").append(logpo.getTname());
                                outinfo.append("\t操作类型：");
                                switch(logpo.getType()){//0新建，1修改，2删除，3开始，4停止
                                    case 1:outinfo.append("新建");break;
                                    case 2:outinfo.append("修改");break;
                                    case 3:outinfo.append("删除");break;
                                    case 4:outinfo.append("开始");break;
                                    case 5:outinfo.append("停止");break;
                                    default:outinfo.append("未知");
                                }
                                outinfo.append("\n");
                            }
                        }else{
                            outinfo = new StringBuilder("fail");
                        }
                    }
                }
            }
        }
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            /* TODO output your page here. You may use following sample code. */
            out.print(outinfo.toString());
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
    private final UserDao dao = new UserDao();
    private final LogDao logdao = new LogDao();
    private StringBuilder outinfo;
    private String loginedUserName;
    private int loginedUserid;
    private int index;
    private LogPO logpo;
}
