/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.servlet;

import PO.SMSPO;
import PO.UserInfoPO;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Iterator;
import java.util.List;
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
public class sendmsg extends HttpServlet {

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
        request.setCharacterEncoding("UTF-8");
        outinfo = null;
        failcount = 0;
        loginedUserName = (String) request.getSession().getAttribute("username");
        if (loginedUserName != null && !loginedUserName.equals("")) {
            int loginedUserid = (Integer) request.getSession().getAttribute("userid");
            po = dao.getinfo(loginedUserid);
            if (po != null) {
                if (po.getUsername().equals(loginedUserName)) {
                    uname = request.getParameter("name");
                    content = request.getParameter("msg");
                    if(content != null){
                        content = URLDecoder.decode(content, "UTF-8");
                    }
                    if(uname != null && content != null){
                        //SMSPO smspo = new SMSPO();
                        //smspo.setFromuname(loginedUserName);
                        if(uname.equals("")){//只有管理员才能群发公告消息
                            if(po.isAdmin()){
                                List list = dao.getAllUser();
                                Iterator it = list.iterator();
                                while(it.hasNext()){//对所有用户发消息
                                    UserInfoPO dstpo = (UserInfoPO)it.next();
                                    if(!smsdao.saveSMS(newsms(dstpo.getUid()))){
                                        failcount++;//计算发送失败次数
                                    }else{
                                        outinfo = "success";
                                    }
                                }
                            }else{
                                outinfo = "不是管理员不能发公告消息";
                            }
                        }else{//普通用户可以单独发消息
                            List list = dao.queryInfo("username", uname);//找用户
                            Iterator it = list.iterator();
                            if(list.size() <= 0){
                                outinfo = "找不到用户";
                            }
                            while(it.hasNext()){//单一用户发消息
                                UserInfoPO dstpo = (UserInfoPO)it.next();
                                if(dstpo.getUsername().equals(uname)){//找到了用户
                                    if(smsdao.saveSMS(newsms(dstpo.getUid()))){
                                        outinfo = "success";
                                    }else{
                                        outinfo = "发送消息失败";
                                    }
                                    break;
                                }
                            }
                        }
                    }else{
                        outinfo = "请填写内容";
                    }
                }
            }
        }
        if(failcount != 0){
            outinfo = "管理员群发失败 " + failcount + "次";
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
    private SMSPO newsms(int uid){
        SMSPO sms = new SMSPO();
        sms.setFromuname(loginedUserName);
        sms.setContent(content);
        sms.setUid(uid);
        return sms;
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
    private String uname;
    private String content;
    private int failcount;//记录管理员群发失败次数
    private UserInfoPO po;
    private final SMSDao smsdao = new SMSDao();
    private final UserDao dao = new UserDao();
}
