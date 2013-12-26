/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.config;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * 数据库配置
 *
 * @author oubeichen
 */
public class Config {

    public static final String DBINFO = "jdbc:mysql://localhost:3306/ifttt";
    public static final String DBUSERNAME = "ifttt";
    public static final String DBPASSWD = "ifttt";
    public static final String HIB_CONFIG_FILE = "/hibernate.cfg.xml";
    public static final int MAXTHISTYPE = 2;//时间、邮件、微博
    public static final int MAXTHATTYPE = 1;//邮件、微博
    public static final int MAXLEVEL = 8;//用户最高等级
    public static final int LEVELCOST[] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};//各等级操作所需消费
    //AES所用的key，通过SecretKey的getEncoded()，再进行Base64加密产生
    public static final String KEY_IN_AES = "OOg3orHXUR8sAmM1g9ZT5A==";//不同网站实例用不同key
    public static final char md5String[] = {'O', 'Y', '2', 'K', 'H', '1', '6', 'E', '8', 'F',
        'B', 'S', '7', 'D', 'I', 'P'};//不同网站用不同乱序改字版MD5，提高破解难度
    private static final boolean DisableThis[] = new boolean[MAXTHISTYPE + 1];//禁用This
    private static final boolean DisableThat[] = new boolean[MAXTHATTYPE + 1];//禁用That
    private static final Properties props = new Properties();
    private static final String path = "enable_disable.properties";
    /**
     * @return the DisableThis
     */
    public static boolean getDisableThis(int id) {
        return DisableThis[id];
    }

    /**
     * @param aDisableThis the DisableThis to set
     */
    public static void setDisableThis(int id, boolean edit) {
        DisableThis[id] = edit;
        writeprops();
    }

    /**
     * @return the DisableThat
     */
    public static boolean getDisableThat(int id) {
        return DisableThat[id];
    }

    /**
     * @param aDisableThat the DisableThat to set
     */
    public static void setDisableThat(int id, boolean edit) {
        DisableThat[id] = edit;
        writeprops();
    }

    public Config() {
        //TODO 从配置文件读取配置

    }static{
       try {
            props.load(new FileInputStream(path));
            for (int i = 0; i <= MAXTHISTYPE; i++) {
                DisableThis[i] = Boolean.parseBoolean(props.getProperty("DisableThis" + i, "false"));
            }
            for (int i = 0; i <= MAXTHATTYPE; i++) {
                DisableThat[i] = Boolean.parseBoolean(props.getProperty("DisableThat" + i, "false"));
            }
        } catch (Exception e) {

        }
    }

    /**
     * 写入配置文件
     */
    private static void writeprops() {
        for (int i = 0; i <= MAXTHISTYPE; i++) {
            props.setProperty("DisableThis" + i, String.valueOf(DisableThis[i]));
        }
        for (int i = 0; i <= MAXTHATTYPE; i++) {
            props.setProperty("DisableThat" + i, String.valueOf(DisableThat[i]));
        }
        try {
            props.store(new FileOutputStream(path), "禁止、启用THIS、THAT的配置文件");
        } catch (IOException ex) {
            Logger.getLogger(Config.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    //private static final String path = Thread.currentThread().getContextClassLoader().getResource("enable_disable.properties").toString().substring(6);
}
