/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.manager;

import ob.PO.LogPO;
import java.util.List;
import ob.dao.LogDao;

/**
 *
 * @author oubeichen
 */
public class TaskLog {
    public static int AddLog(int uid,String uname,String tname,int type){
        po = new LogPO();
        po.setUname(uname);
        po.setTname(tname);
        po.setType(type);
        return dao.saveLog(po);
    }
    public static List getAllLog(){
        return dao.getAllLog();
    }
    private static final LogDao dao = new LogDao();
    private static LogPO po;
}
