/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package PO;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * 存储任务基本数据
 * @author oubeichen
 */
@JsonFilter("taskFilter")
public class TaskPO extends Thread implements Cloneable{
    private String tid;//唯一的标识符，用于识别
    private int uid;//代表所属的用户
    private String taskname;
    
    private int thistype;
    //新浪API限制了不能访问其他用户的微博，所以只能登陆后访问自己的微博了
    private String thisstr1;//type == 0 date//type == 1 email//type == 2 weiboid
    private String thisstr2;//type == 0 time//type == 1 emailpass//type ==2 weibopass
    
    private int thattype;
    
    private String thatusername;//type==0 weiboname//type==1 src email
    private String thatpassword;//type==0 weiboname//type==1 src email
    private boolean usethis;//type ==0是否使用在This中配置的weibo //type ==1是否使用在This中配置的Email
    private String thatdstemail;//以下均为Type == 1时需要填写
    private String thatemailtitle;
    private String thattext;
    
    public TaskPO(){
        
    }
    @Override
    public Object clone() throws CloneNotSupportedException {
        Object obj = super.clone();
        //((TaskPO)obj).email = email.clone();//若扩充Email类，则需要加上这几句话
        return super.clone();//因为都是string或者基本数据类型，只需要super.clone就足够。
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
     * @return the usethis
     */
    public boolean isUsethis() {
        return usethis;
    }

    /**
     * @param usethis the usethis to set
     */
    public void setUsethis(boolean usethis) {
        this.usethis = usethis;
    }

    /**
     * @return the thatdstemail
     */
    public String getThatdstemail() {
        return thatdstemail;
    }

    /**
     * @param thatdstemail the thatdstemail to set
     */
    public void setThatdstemail(String thatdstemail) {
        this.thatdstemail = thatdstemail;
    }

    /**
     * @return the thatemailtitle
     */
    public String getThatemailtitle() {
        return thatemailtitle;
    }

    /**
     * @param thatemailtitle the thatemailtitle to set
     */
    public void setThatemailtitle(String thatemailtitle) {
        this.thatemailtitle = thatemailtitle;
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

}
