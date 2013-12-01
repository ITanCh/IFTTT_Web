/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.manager;

/**
 * 数据库配置
 * @author oubeichen
 */
public class Config {
	public static final String DBINFO = "jdbc:mysql://localhost:3306/ifttt";
	public static final String DBUSERNAME = "ifttt";
	public static final String DBPASSWD = "ifttt";
        public static final int MAXTHISTYPE = 2;//时间、邮件、微博
        public static final int MAXTHATTYPE = 1;//邮件、微博
}
