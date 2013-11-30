/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package oubeichen;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
        try {
            //初始化数据库
            Class.forName("com.mysql.jdbc.Driver");	
            Connection conn = DriverManager.getConnection(Dbconfig.DBINFO,Dbconfig.DBUSERNAME,Dbconfig.DBUSERNAME);
            PreparedStatement pstmt;
            ResultSet rs;
            //判断用户名
            if ((reqstr = request.getParameter("registername")) != null) {
                pstmt = conn.prepareStatement("SELECT * FROM user WHERE username = ?");
                pstmt.setString(1, reqstr);
                rs = pstmt.executeQuery();
                if(rs.next()){        //如果数据库执行没有问题则设置输出
                    outinfo = "false";
                }
                else{
                    outinfo = "true";
                }
            } //判断邮箱
            else if ((reqstr = request.getParameter("registermail")) != null) {
                pstmt = conn.prepareStatement("SELECT * FROM user WHERE mail = ?");
                pstmt.setString(1, reqstr);
                rs = pstmt.executeQuery();
                if(rs.next()){        //如果数据库执行没有问题则设置输出
                    outinfo = "false";
                }
                else{
                    outinfo = "true";
                }
            }
        } catch (SQLException ex) {
            outinfo = "Database Error";
            Logger.getLogger(getreg.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            outinfo = "Database Error";
            Logger.getLogger(getreg.class.getName()).log(Level.SEVERE, null, ex);
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
