/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package PO;

import com.fasterxml.jackson.annotation.JsonFilter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import ob.util.AESUtil;
import ob.util.GetUserTimeline;
import ob.util.Sina;
import ob.util.UpdateStatus;
import org.apache.commons.mail.SimpleEmail;
import org.apache.commons.net.pop3.POP3MessageInfo;
import org.apache.commons.net.pop3.POP3SClient;

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
    private String status = "Stopped";
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
    public void run() {
        setTaskLog("开始任务");
        if (thistype == 0) {//等时间
            Date tasktime;
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-ddHH:mm:ss");  //将时间拼到一起变成这种格式
            try {
                tasktime = sdf.parse(thisstr1 + thisstr2);
                //if(cl.)
            } catch (ParseException ex) {
                setTaskLog("任务时间出错");
                return;
            }
            Date nowtime = new Date();
            if (nowtime.after(tasktime)) {
                setTaskLog("任务已经超时！");
                return;
            }
            while (nowtime.before(tasktime)) {
                long deltaminute = (tasktime.getTime() - nowtime.getTime()) / (1000 * 60);  //直接先算出分钟数
                long day = deltaminute / (24 * 60);
                long hour = (deltaminute / 60) % 24;
                long minute = deltaminute % 60;
                setTaskLog("正在等待到达指定时间。\n还有：" + day + "天" + hour + "时" + minute + "分");
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException ex) {
                    setTaskLog("定时出错");
                    return;
                }
                nowtime = new Date();
            }
            if (nowtime.getTime() - tasktime.getTime() > 60 * 1000) {//已经过去一分钟
                setTaskLog("任务已经超时");
                return;
            }
            setTaskLog("时间已到，正准备继续");
        } else if (thistype == 1) {//等邮件
            int lastmessage_num = -1;
            POP3SClient pop3 = new POP3SClient(true);
            POP3MessageInfo[] messages;
            pop3.setDefaultTimeout(600000);
            while (true) {
                try {
                    pop3.connect("pop." + thisstr1.split("@")[1]);//pop. + domain
                    if (!pop3.login(thisstr1, AESUtil.Decryptor(thisstr2))) {
                        pop3.disconnect();
                        setTaskLog("邮箱密码错误.");
                        return;
                    }
                    messages = pop3.listMessages();
                    if (lastmessage_num < 0) {//尚未初始化邮件数目
                        lastmessage_num = messages.length;//初始化为第一次收到的邮件数目
                        setTaskLog("等待收到邮件。当前邮件数：" + lastmessage_num);
                    } else if (lastmessage_num < messages.length) {//收到新的邮件
                        break;
                    }
                    setTaskLog("等待收到邮件。当前邮件数：" + messages.length);
                    Thread.sleep(10000);
                } catch (Exception ex) {
                    setTaskLog("收邮件过程中出错");
                    return;
                }
            }
            setTaskLog("收到邮件，正准备继续");
        } else if (thistype == 2) {//监控微博
            setTaskLog("准备监听微博");
            while (true) {
                try {
                    String Access_token;
                    if ((Access_token = Sina.getToken(thisstr1, AESUtil.Decryptor(thisstr2)).getAccessToken()) == null) {
                        setTaskLog("微博授权失败！");
                        return;
                    }
                    String lasttimeline = GetUserTimeline.getTimeline(Access_token);
                    if (lasttimeline == null) {
                    } else {
                        if (lasttimeline.contains(thistext)) {//包含指定内容
                            break;
                        }
                    }
                    setTaskLog("正在监听微博");
                    Thread.sleep(10000);
                } catch (Exception ex) {
                    ex.printStackTrace();
                    setTaskLog("监听微博出错");
                    return;
                }
            }
            setTaskLog("已经收到微博！");
        }
        if (thattype == 1) {//发邮件
            setTaskLog("准备发送邮件");
            SimpleEmail email = new SimpleEmail();
            Properties props = new Properties();
            String user, pass;
            try {
                props.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("adminmail.properties"));
                if ((user = (String) props.get("user")) == null
                        || (pass = (String) props.get("pass")) == null) {
                    setTaskLog("请设置默认邮箱！");
                    return;
                }
                email.setHostName("smtp." + user.split("@")[1]);//邮件服务器 默认 为smtp. + domain
                email.setAuthentication(user, pass);//smtp认证的用户名和密码  
                email.setSSLOnConnect(true);
                email.addTo(thatusername, "JAVA IFTTT RECEIVER");//收信者  
                email.setFrom(user, "JAVA IFTTT SENDER");//发信者  
                email.setSubject("JAVA IFTTT SEND EMAIL");//标题  
                email.setCharset("UTF-8");//编码格式  
                email.setMsg(thattext);//内容  
                email.send();//发送  
            } catch (Exception ex) {
                setTaskLog("发送邮件失败");
                return;
            }
            setTaskLog("邮件发送成功！");
        } else if (thattype == 0) {//发微博
            setTaskLog("准备发送微博");
            try {
                String Access_token;
                if ((Access_token = Sina.getToken(thatusername, AESUtil.Decryptor(thatpassword)).getAccessToken()) == null) {
                    setTaskLog("微博授权失败！");
                    return;
                }
                UpdateStatus.Update(Access_token, thattext);
            } catch (Exception ex) {
                ex.printStackTrace();
                setTaskLog("发送微博失败");
                return;
            }
            setTaskLog("微博发送成功！");
        }
    }

    /**
     * 用于给正在运行任务设置日志
     *
     * @param Info 目标日志
     */
    private void setTaskLog(String Info) {
        status = Info;//重写信息
    }
    /*
    @Deprecated
    class AutoRemoveRunningTaskThread extends Thread {

        TaskPO task_to_remove;
        int code;//用于表示线程不同执行结果 在RunningTask里定义
        int time = 5000;//默认休眠5000

        public AutoRemoveRunningTaskThread(TaskPO task, int cod) {
            task_to_remove = task;
            code = cod;
        }

        public AutoRemoveRunningTaskThread(RunningTask task, int cod, int t) {
            task_to_remove = task;
            code = cod;
            time = t;
        }

        @Override
        public void run() {
            try {
                Thread.sleep(time);//休眠指定时间然后开始删除调用这个线程的的Task线程
            } catch (InterruptedException ex) {
                task_to_remove.setaskLog(ex.getMessage());
            }
            String TaskInfo;
            switch (code) {//根据不同code设置不同的输出信息
                case TaskPO.SUCCESS:
                    TaskInfo = "任务成功完成！";
                    break;
                case TaskPO.TIMEOUT:
                    TaskInfo = "任务已经超时！请检查设置的时间！";
                    break;
                case TaskPO.RUNTIMEERROR:
                    TaskInfo = "任务运行出错！请检查设置！";
                    break;
                default:
                    TaskInfo = "未知情况！";
            }
            RemoveRunningTask(task_to_remove, TaskInfo);
        }
    }
*/
}
