package ob.util;

import weibo4j.Timeline;
import weibo4j.model.Status;
import weibo4j.model.WeiboException;
/*
 * 摘自微博API用于发送微博
 */
public class UpdateStatus {

	public static String Update(String access_token,String statuses) throws WeiboException {

		Timeline tm = new Timeline();
		tm.client.setToken(access_token);
		Status status = tm.UpdateStatus(statuses);
		return status.toString();
        }

}
