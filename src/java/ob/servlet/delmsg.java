/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.servlet;

import ob.PO.SMSPO;
import ob.PO.UserInfoPO;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.dao.SMSDao;
import ob.dao.UserDao;

/**
 *
 * @author oubeichen
 */
public class delmsg extends HttpServlet {

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
        loginedUserName = (String) request.getSession().getAttribute("username");
        if (loginedUserName != null && !loginedUserName.equals("")) {//到这里才是登录成功
            int loginedUserid = (Integer) request.getSession().getAttribute("userid");
            String SID_Str = request.getParameter("msgid");
            int sid = -1;
            try {
                sid = Integer.parseInt(SID_Str);
            } catch (Exception e) {
                outinfo = "Msg id error!";
            }
            SMSPO spo = smsdao.getSMSbyID(sid);
            if (spo.getUid() == loginedUserid) {//判断一下是否是该用户的消息
                if (sid != -1) {
                    if (smsdao.delSMS(spo)) {
                        outinfo = "success";
                    } else {
                        outinfo = "Delete msg error!";
                    }
                }
            } else {
                outinfo = "This is not your message!";
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
    private String loginedUserName;
    private String outinfo;//输出
    private UserInfoPO po;
    private final SMSDao smsdao = new SMSDao();
    private final UserDao dao = new UserDao();
}
