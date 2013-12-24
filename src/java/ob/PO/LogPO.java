/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.PO;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 *
 * @author oubeichen
 */
@JsonFilter("logFilter")
public class LogPO {
    private int lid;
    private int uid;
    private String uname;
    private String tname;
    private int type;//0新建，1修改，2删除，3开始，4停止
    private String time;
            
    /**
     * @return the lid
     */
    public int getLid() {
        return lid;
    }

    /**
     * @param lid the lid to set
     */
    public void setLid(int lid) {
        this.lid = lid;
    }

    /**
     * @return the type
     */
    public int getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(int type) {
        this.type = type;
    }

    /**
     * @return the uname
     */
    public String getUname() {
        return uname;
    }

    /**
     * @param uname the uname to set
     */
    public void setUname(String uname) {
        this.uname = uname;
    }

    /**
     * @return the tname
     */
    public String getTname() {
        return tname;
    }

    /**
     * @param tname the tname to set
     */
    public void setTname(String tname) {
        this.tname = tname;
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
     * @return the time
     */
    public String getTime() {
        return time;
    }

    /**
     * @param time the time to set
     */
    public void setTime(String time) {
        this.time = time;
    }
    
}
