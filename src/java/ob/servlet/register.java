/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.servlet;

import ob.config.LogText;
import ob.PO.UserInfoPO;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.dao.UserDao;
import ob.util.MD5Util;

/**
 *
 * @author oubeichen
 */
public class register extends HttpServlet {

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
        outinfo = "error";
        username = request.getParameter("name");
        password = request.getParameter("pw");
        mail = request.getParameter("mail");
        if (validate()) {
            int uid;
            if ((uid = dao.saveinfo(userinfo()) ) != -1) {
                outinfo = "success";
                request.getSession().setAttribute("username", username);
                request.getSession().setAttribute("userid", uid);
            } else {
                outinfo = LogText.REGERROR;
            }
        }
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
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
     * 判断输入是否正确
     *
     * @return
     */
    private boolean validate() {
        List list;
        Iterator it;
        if (username != null) {
            if (username.length() > 30 || !username.matches("^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$")) {
                outinfo = "Please change the name";
                return false;
            }
            //判断数据库是否有该username
            list = dao.queryInfo("username", username);
            if (list == null) {
                outinfo = LogText.DBERROR;
                return false;
            }
            it = list.iterator();
            while (it.hasNext()) {
                if (((UserInfoPO) it.next()).getUsername().equals(username)) {
                    outinfo = "Already have a same username";
                    return false;
                }
            }
        } else {
            outinfo = "Please change the name";
            return false;
        }
        if (password == null || password.length() > 30 || !password.matches("^[a-zA-Z0-9]{6,30}$")) {
            outinfo = "Please change the password";
            return false;
        }
        if (mail != null) {
            if (mail.length() > 50 || !mail.matches("^[a-z0-9][a-z0-9\\._-]*@[a-z0-9][a-z0-9-]*\\.([a-z0-9][a-z0-9-]*\\.)*[a-z]+$")) {
                outinfo = "Please change the email";
                return false;
            }
            //判断数据库是否有该email
            list = dao.queryInfo("mail", mail);
            if (list == null) {
                outinfo = LogText.DBERROR;
                return false;
            }
            it = list.iterator();
            while (it.hasNext()) {
                if (((UserInfoPO) it.next()).getMail().equals(mail)) {
                    outinfo = "Already has a same email";
                    return false;
                }
            }
        } else {
            outinfo = "Please change the email";
            return false;
        }
        return true;
    }
    private String username;
    private String password;
    private String mail;
    private String outinfo;
    private final UserDao dao = new UserDao();

    public UserInfoPO userinfo() {
        UserInfoPO info = new UserInfoPO();
        info.setUsername(username);
        info.setPassword(MD5Util.MD5(password));
        info.setMail(mail);
        return info;
    }
}
