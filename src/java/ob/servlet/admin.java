/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.servlet;

import PO.UserInfoPO;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.config.Config;
import ob.dao.UserDao;
import ob.util.MD5Util;

/**
 *
 * @author oubeichen
 */
public class admin extends HttpServlet {

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
        getdata(request);
        loginedUserName = (String) request.getSession().getAttribute("username");
        if (loginedUserName != null && !loginedUserName.equals("")) {
            if (request.getSession().getAttribute("userid") != null) {
                loginedUserid = (Integer) request.getSession().getAttribute("userid");
                dao = new UserDao();
                po = dao.getinfo(loginedUserid);
                if (po != null && po.getUsername().equals(loginedUserName) && po.isAdmin()) {//判断是否管理员
                    if(edit != -1){//开启关闭this that
                       if (validate()) {
                           if(thisid != -1){
                               Config.DisableThis[thisid] = (edit == 1);
                           }else if(thatid != -1){
                               Config.DisableThat[thatid] = (edit == 1);
                           }
                           outinfo = "success";
                       }
                    }
                    else if (name != null) {//修改用户
                        List list = dao.queryInfo("name", name);
                        if (list != null) {
                            Iterator it = list.iterator();
                            while (it.hasNext()) {
                                po = (UserInfoPO) it.next();
                                if (po.getUsername().equals(name)) {
                                    if (validate()) {
                                        if(delete != null){//删除用户
                                           if(dao.deleteInfo(po)){
                                               outinfo = "success";
                                           }else{
                                               outinfo = "删除用户失败";
                                           }
                                        }else{
                                           if(pw != null){
                                               po.setPassword(MD5Util.MD5(pw));
                                           }else if(level != -1){//用else if 防止一次修改多个项目
                                               po.setLevel(level);
                                           }else if(money != -1){
                                               po.setCoins(po.getCoins() + money);//加钱
                                           }
                                           if(dao.updateInfo(po)){
                                               outinfo = "success";
                                           }else{
                                               outinfo = "修改用户失败";
                                           }
                                        }
                                    }
                                }
                            }
                        } else {
                            outinfo = "找不到对应用户";
                        }
                    }
                } else {
                    outinfo = "尚未登录管理员，请重新登录";
                }
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

    private boolean getdata(HttpServletRequest request) {
        String temp;
        try {
            temp = request.getParameter("thisid");
            if (temp != null) {
                thisid = Integer.parseInt(temp);
            } else {
                thisid = -1;
            }
        } catch (Exception e) {
            outinfo = "This id必须为数字";
            return false;
        }
        try {
            temp = request.getParameter("thatid");
            if (temp != null) {
                thatid = Integer.parseInt(temp);
            } else {
                thatid = -1;
            }
        } catch (Exception e) {
            outinfo = "That id必须为数字";
            return false;
        }
        try {
            temp = request.getParameter("edit");
            if (temp != null) {
                edit = Integer.parseInt(temp);
            } else {
                edit = -1;
            }
        } catch (Exception e) {
            outinfo = "Edit必须为数字";
            return false;
        }
        name = request.getParameter("name");
        pw = request.getParameter("pw");
        delete = request.getParameter("delete");
        try {
            temp = request.getParameter("level");
            if (temp != null) {
                level = Integer.parseInt(temp);
            } else {
                level = -1;
            }
        } catch (Exception e) {
            outinfo = "Level必须为数字";
            return false;
        }
        try {
            temp = request.getParameter("money");
            if (temp != null) {
                money = Integer.parseInt(temp);
            } else {
                money = -1;
            }
        } catch (Exception e) {
            outinfo = "Money必须为数字";
            return false;
        }
        return true;
    }

    private boolean validate() {
        if (edit != -1) {
            if (edit != 0 && edit != 1) {//既非开启又非关闭
                outinfo = "edit不能为0,1以外的值";
                return false;
            } else {
                if (thisid != -1) {
                    if (thisid < -1 || thisid > Config.MAXTHISTYPE) {//非法的thistype
                        outinfo = "thistype 有误";
                        return false;
                    }
                }
                if (thatid != -1) {
                    if (thatid < -1 || thatid > Config.MAXTHATTYPE) {//非法的thattype
                        outinfo = "thattype 有误";
                        return false;
                    }
                }
            }
        }
        else if (name != null) {
            if (pw != null) {
                if (!pw.matches("^[a-zA-Z0-9]{6,30}$")) {//不为空且格式不对
                    outinfo = "密码只能为6~30位的字母和数字";
                    return false;
                }
            }
            if(level != -1){
                if(level < 0 || level > Config.MAXLEVEL){//超过最高等级
                    outinfo = "level 有误";
                    return false;
                }
            }
            if(money != -1){
                if(money < 0){//money不能为负数
                    outinfo = "money 有误";
                    return false;
                }
            }
        }
        //不是enable disable
        return true;
    }
    private String outinfo;
    private String name;
    private String delete;
    private String pw;
    private int level;
    private int money;
    private int thisid;
    private int thatid;
    private int edit;

    private String loginedUserName;
    private int loginedUserid;
    private UserInfoPO po;
    private UserDao dao;
}
