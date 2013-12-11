/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package PO;

import com.fasterxml.jackson.annotation.JsonFilter;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * 存储任务基本数据
 * @author oubeichen
 */
@JsonFilter("taskFilter")
public class TaskPO extends Thread implements Cloneable{
    private String tid;//唯一的标识符，用于识别
    private int uid;//代表所属的用户
    private String taskname;
    private String ctime;
    private String status = "停止中";
    private boolean isrunning = false;

    private int thistype;
    //新浪API限制了不能访问其他用户的微博，所以只能登陆后访问自己的微博了
    private String thisstr1;//type == 0 date//type == 1 email//type == 2 weiboid
    private String thisstr2;//type == 0 time//type == 1 emailpass//type ==2 weibopass
    private String thistext;//微博所监听的内容
            
    private int thattype;
    
    private String thatusername;//type==0 weiboname//type==1 src email
    private String thatpassword;//type==0 weiboname//type==1 src email
    private String thattext;
    
    public TaskPO(){
        
    }
    @Override
    public Object clone() throws CloneNotSupportedException {
        Object obj = super.clone();
        //((TaskPO)obj).email = email.clone();//若扩充Email类，则需要加上这几句话
        return obj;//因为都是string或者基本数据类型，只需要super.clone就足够。
    }

    /**
     * @return the tid
     */
    public String getTid() {
        return tid;
    }

    /**
     * @param tid the tid to set
     */
    public void setTid(String tid) {
        this.tid = tid;
    }

    /**
     * @return the uid
     */
    public int getUid() {
        return uid;
    }

    /**
     * @param uid the uid to set
     */
    public void setUid(int uid) {
        this.uid = uid;
    }

    /**
     * @return the taskname
     */
    public String getTaskname() {
        return taskname;
    }

    /**
     * @param taskname the taskname to set
     */
    public void setTaskname(String taskname) {
        this.taskname = taskname;
    }

    /**
     * @return the thistype
     */
    public int getThistype() {
        return thistype;
    }

    /**
     * @param thistype the thistype to set
     */
    public void setThistype(int thistype) {
        this.thistype = thistype;
    }

    /**
     * @return the thisstr1
     */
    public String getThisstr1() {
        return thisstr1;
    }

    /**
     * @param thisstr1 the thisstr1 to set
     */
    public void setThisstr1(String thisstr1) {
        this.thisstr1 = thisstr1;
    }

    /**
     * @return the thisstr2
     */
    public String getThisstr2() {
        return thisstr2;
    }

    /**
     * @param thisstr2 the thisstr2 to set
     */
    public void setThisstr2(String thisstr2) {
        this.thisstr2 = thisstr2;
    }

    /**
     * @return the thistext
     */
    public String getThistext() {
        return thistext;
    }

    /**
     * @param thistext the thistext to set
     */
    public void setThistext(String thistext) {
        this.thistext = thistext;
    }

    /**
     * @return the thattype
     */
    public int getThattype() {
        return thattype;
    }

    /**
     * @param thattype the thattype to set
     */
    public void setThattype(int thattype) {
        this.thattype = thattype;
    }

    /**
     * @return the thatusername
     */
    public String getThatusername() {
        return thatusername;
    }

    /**
     * @param thatusername the thatusername to set
     */
    public void setThatusername(String thatusername) {
        this.thatusername = thatusername;
    }

    /**
     * @return the thatpassword
     */
    public String getThatpassword() {
        return thatpassword;
    }

    /**
     * @param thatpassword the thatpassword to set
     */
    public void setThatpassword(String thatpassword) {
        this.thatpassword = thatpassword;
    }

    /**
     * @return the thattext
     */
    public String getThattext() {
        return thattext;
    }

    /**
     * @param thattext the thattext to set
     */
    public void setThattext(String thattext) {
        this.thattext = thattext;
    }

    /**
     * @return the ctime
     */
    public String getCtime() {
        return ctime;
    }

    /**
     * @param ctime the ctime to set
     */
    public void setCtime(String ctime) {
        this.ctime = ctime;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the isrunning
     */
    public boolean isIsrunning() {
        return isrunning;
    }

    /**
     * @param isrunning the isrunning to set
     */
    public void setIsrunning(boolean isrunning) {
        this.isrunning = isrunning;
    }
    
    @Override
    public void run(){
        int a = 0;
        while(isrunning){
            try {
                Thread.sleep(2000);
                status = a++ + "";
            } catch (InterruptedException ex) {
                Logger.getLogger(TaskPO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
