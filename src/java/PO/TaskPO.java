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
    private String TID;//唯一的标识符，用于识别
    private String TaskName;
    //getter和setter设置的东西太多，所以干脆用public，请原谅
    private int ThisType;
    //新浪API限制了不能访问其他用户的微博，所以只能登陆后访问自己的微博了
    private String ThisStr1;//type == 0 date//type == 1 email//type == 2 weiboid
    private String ThisStr2;//type == 0 time//type == 1 emailpass//type ==2 weibopass
    
    private int ThatType;
    
    private String ThatUsername;//type==0 weiboname//type==1 src email
    private String ThatPassword;//type==0 weiboname//type==1 src email
    private boolean UseThis;//type ==0是否使用在This中配置的weibo //type ==1是否使用在This中配置的Email
    private String ThatDstEmail;//以下均为Type == 1
    private String ThatEmailTitle;
    private String ThatEmailText;
    
    public TaskPO(){
        
    }
    @Override
    public Object clone() throws CloneNotSupportedException {
        Object obj = super.clone();
        //((TaskPO)obj).email = email.clone();//若扩充Email类，则需要加上这几句话
        return super.clone();//因为都是string或者基本数据类型，只需要super.clone就足够。
    }

    /**
     * @return the TID
     */
    public String getTID() {
        return TID;
    }

    /**
     * @param TID the TID to set
     */
    public void setTID(String TID) {
        this.TID = TID;
    }

    /**
     * @return the TaskName
     */
    public String getTaskName() {
        return TaskName;
    }

    /**
     * @param TaskName the TaskName to set
     */
    public void setTaskName(String TaskName) {
        this.TaskName = TaskName;
    }

    /**
     * @return the ThisType
     */
    public int getThisType() {
        return ThisType;
    }

    /**
     * @param ThisType the ThisType to set
     */
    public void setThisType(int ThisType) {
        this.ThisType = ThisType;
    }

    /**
     * @return the ThisStr1
     */
    public String getThisStr1() {
        return ThisStr1;
    }

    /**
     * @param ThisStr1 the ThisStr1 to set
     */
    public void setThisStr1(String ThisStr1) {
        this.ThisStr1 = ThisStr1;
    }

    /**
     * @return the ThisStr2
     */
    public String getThisStr2() {
        return ThisStr2;
    }

    /**
     * @param ThisStr2 the ThisStr2 to set
     */
    public void setThisStr2(String ThisStr2) {
        this.ThisStr2 = ThisStr2;
    }

    /**
     * @return the ThatType
     */
    public int getThatType() {
        return ThatType;
    }

    /**
     * @param ThatType the ThatType to set
     */
    public void setThatType(int ThatType) {
        this.ThatType = ThatType;
    }

    /**
     * @return the ThatUsername
     */
    public String getThatUsername() {
        return ThatUsername;
    }

    /**
     * @param ThatUsername the ThatUsername to set
     */
    public void setThatUsername(String ThatUsername) {
        this.ThatUsername = ThatUsername;
    }

    /**
     * @return the ThatPassword
     */
    public String getThatPassword() {
        return ThatPassword;
    }

    /**
     * @param ThatPassword the ThatPassword to set
     */
    public void setThatPassword(String ThatPassword) {
        this.ThatPassword = ThatPassword;
    }

    /**
     * @return the UseThisEmail
     */
    public boolean isUseThis() {
        return UseThis;
    }

    /**
     * @param UseThisEmail the UseThisEmail to set
     */
    public void setUseThis(boolean UseThisEmail) {
        this.UseThis = UseThisEmail;
    }

    /**
     * @return the ThatDstEmail
     */
    public String getThatDstEmail() {
        return ThatDstEmail;
    }

    /**
     * @param ThatDstEmail the ThatDstEmail to set
     */
    public void setThatDstEmail(String ThatDstEmail) {
        this.ThatDstEmail = ThatDstEmail;
    }

    /**
     * @return the ThatEmailTitle
     */
    public String getThatEmailTitle() {
        return ThatEmailTitle;
    }

    /**
     * @param ThatEmailTitle the ThatEmailTitle to set
     */
    public void setThatEmailTitle(String ThatEmailTitle) {
        this.ThatEmailTitle = ThatEmailTitle;
    }

    /**
     * @return the ThatEmailText
     */
    public String getThatEmailText() {
        return ThatEmailText;
    }

    /**
     * @param ThatEmailText the ThatEmailText to set
     */
    public void setThatEmailText(String ThatEmailText) {
        this.ThatEmailText = ThatEmailText;
    }
}
