/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.servlet;

import ob.util.Log;
import PO.UserInfoPO;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.dao.LoginRegisterDao;
import ob.util.MD5Util;

/**
 *
 * @author oubeichen
 */
public class login extends HttpServlet {

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
        username = request.getParameter("name");
        password = request.getParameter("pw");
        if(validate()){
            LoginRegisterDao dao = new LoginRegisterDao();
            List list = dao.queryInfo("username", username);
            if(list != null){//数据库查询没有出错
                Iterator it = list.iterator();
                while(it.hasNext()){
                    UserInfoPO po = (UserInfoPO)it.next();
                    if(username.equals(po.getUsername())){
                        if(MD5Util.MD5(password).equals(po.getPassword())){
                            outinfo = "success";
                            request.getSession().setAttribute("username", username);
                            request.getSession().setAttribute("userid",po.getUid());
                        }
                    }
                }
                if(outinfo == null){//没有数据库错误，也没有查到对应用户
                    outinfo = "Wrong username or password";
                }
            }else{
                outinfo = Log.DBERROR;
            }
        }
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
    private boolean validate() {
        if (username == null || !username.matches("^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$")) {
            outinfo = "Please change the name";
            return false;
        }
        if (password == null || !password.matches("^[a-zA-Z0-9]{6,}$")) {
            outinfo = "Please change the password";
            return false;
        }
        return true;
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
    private String outinfo = null;
    private String username;
    private String password;
}
