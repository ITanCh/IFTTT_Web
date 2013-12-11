/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.servlet;

import ob.config.LogText;
import PO.UserInfoPO;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.dao.UserDao;

/**
 *
 * @author oubeichen
 */
public class getreg extends HttpServlet {


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
        String outinfo = null,reqstr;
        UserDao dao = new UserDao();
        List list;
        Iterator it;
        //判断用户名
        if ((reqstr = request.getParameter("name")) != null) {
            list = dao.queryInfo("username", reqstr);
            if (list != null) {//数据库出错会返回空list
                it = list.iterator();
                while (it.hasNext()) {
                    if (((UserInfoPO) it.next()).getUsername().equals(reqstr)) {
                        outinfo = "nameused";
                    }
                }
                if(outinfo == null)//没有数据库故障，也没有查到相同用户名
                    outinfo = "nameavailble";
            } else {
                outinfo = LogText.DBERROR;
            }
        } //判断邮箱
        else if ((reqstr = request.getParameter("mail")) != null) {
            list = dao.queryInfo("mail", reqstr);
            if (list != null) {//数据库出错会返回空list
                it = list.iterator();
                while (it.hasNext()) {
                    if (((UserInfoPO) it.next()).getMail().equals(reqstr)) {
                        outinfo = "mailused";
                    }
                }
                if(outinfo == null)//没有数据库故障，也没有查到相同用户名
                    outinfo = "mailavailble";
            } else {
                outinfo = LogText.DBERROR;
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

}
