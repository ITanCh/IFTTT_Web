/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.servlet;

import PO.TaskPO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import ob.dao.TaskDao;

/**
 *
 * @author oubeichen
 */
public class gettaskinfo extends HttpServlet {

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
        String loginedUserName = (String)request.getSession().getAttribute("username");
        if(loginedUserName != null && !loginedUserName.equals("") ){
            int loginedUserid = (Integer)request.getSession().getAttribute("userid");
            String tid = request.getParameter("tid");
            if(tid != null){
                po = dao.getTask(tid);
                if(po != null && po.getUid() == loginedUserid){
                        FilterProvider filters = new SimpleFilterProvider()
                                .addFilter("taskFilter",
                                SimpleBeanPropertyFilter.filterOutAllExcept(
                                        "tid","taskname","thistype","thattype","thisstr1","thisstr2",
                                        "thatusername","thattext"));//不显示password和其他
                        outinfo = mapper.writer(filters).writeValueAsString(po);//输出JSON
                }
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
    private final ObjectMapper mapper = new ObjectMapper(); // can reuse, share globally
    private String outinfo;
    private TaskPO po;
    private final TaskDao dao = new TaskDao();
}
