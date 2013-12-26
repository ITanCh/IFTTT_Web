/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.PO;

import com.fasterxml.jackson.annotation.JsonFilter;
import java.util.HashSet;
import java.util.Set;

/**
 * 存储用户信息
 * @author oubeichen
 */
@JsonFilter("userFilter")
public class UserInfoPO {
    private int uid;
    private String username;
    private String password;
    private String mail;
    private boolean admin = false;//默认值
    private long coins = 1000;//默认值
    private int level = 0;//默认值
    private Set task = new HashSet();
    private Set log = new HashSet();
    private Set sms = new HashSet();
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
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return the mail
     */
    public String getMail() {
        return mail;
    }

    /**
     * @param mail the mail to set
     */
    public void setMail(String mail) {
        this.mail = mail;
    }

    /**
     * @return the coins
     */
    public long getCoins() {
        return coins;
    }

    /**
     * @param coins the coins to set
     */
    public void setCoins(long coins) {
        this.coins = coins;
    }

    /**
     * @return the level
     */
    public int getLevel() {
        return level;
    }

    /**
     * @param level the level to set
     */
    public void setLevel(int level) {
        this.level = level;
    }

    /**
     * @return the admin
     */
    public boolean isAdmin() {
        return admin;
    }

    /**
     * @param admin the admin to set
     */
    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    /**
     * @return the tasks
     */
    public Set getTask() {
        return task;
    }

    /**
     * @param tasks the tasks to set
     */
    public void setTask(Set task) {
        this.task = task;
    }

    /**
     * @return the log
     */
    public Set getLog() {
        return log;
    }

    /**
     * @param log the log to set
     */
    public void setLog(Set log) {
        this.log = log;
    }

    /**
     * @return the sms
     */
    public Set getSms() {
        return sms;
    }

    /**
     * @param sms the sms to set
     */
    public void setSms(Set sms) {
        this.sms = sms;
    }
    
}
