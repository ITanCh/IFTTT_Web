/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.servlet;

import PO.TaskPO;
import PO.UserInfoPO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.dao.UserDao;
import ob.manager.RunningTask;

/**
 *
 * @author oubeichen
 */
public class getuserinfo extends HttpServlet {

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
        outinfo = null;
        String loginedUserName = (String) request.getSession().getAttribute("username");
        if (loginedUserName != null && !loginedUserName.equals("")) {
            int loginedUserid = (Integer) request.getSession().getAttribute("userid");
            po = dao.getinfo(loginedUserid);
            if (po != null) {
                if (po.getUsername().equals(loginedUserName)) {
                    Iterator it = po.getTask().iterator();
                    while(it.hasNext()){
                        TaskPO taskpo = (TaskPO)it.next();
                        if(RunningTask.isHere(taskpo.getTid())){
                            taskpo.setIsrunning(true);
                            taskpo.setStatus(RunningTask.getStatus(taskpo.getTid()));
                        }
                    }
                    FilterProvider filters = new SimpleFilterProvider().addFilter("userFilter",
                            SimpleBeanPropertyFilter.serializeAllExcept("password","log"))
                            .addFilter("taskFilter",
                                    SimpleBeanPropertyFilter.filterOutAllExcept("tid", "taskname", "ctime", "status", "isrunning"));//不显示password和其他
                    outinfo = mapper.writer(filters).writeValueAsString(po);//输出JSON
                }
            }
        } else {
            outinfo = "false";//未登录
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
    private final ObjectMapper mapper = new ObjectMapper(); // can reuse, share globally
    private String outinfo;
    private final UserDao dao = new UserDao();
    private UserInfoPO po;
}
