/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.config;

/**
 * 数据库配置
 * @author oubeichen
 */
public class Config {
	public static final String DBINFO = "jdbc:mysql://localhost:3306/ifttt";
	public static final String DBUSERNAME = "ifttt";
	public static final String DBPASSWD = "ifttt";
        public static final String HIB_CONFIG_FILE = "/hibernate.cfg.xml";
        public static final int MAXTHISTYPE = 2;//时间、邮件、微博
        public static final int MAXTHATTYPE = 1;//邮件、微博
        //AES所用的key，通过SecretKey的getEncoded()，再进行Base64加密产生
        public static final String KEY_IN_AES = "OOg3orHXUR8sAmM1g9ZT5A==";//不同网站实例用不同key
        public static final char md5String[] = {'O' ,'Y' ,'2', 'K', 'H' ,'1', '6', 'E', '8', 'F',
				'B', 'S', '7', 'D', 'I', 'P' };//不同网站用不同乱序改字版MD5，提高破解难度
}
