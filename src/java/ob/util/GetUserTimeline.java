/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.util;

/**
 *
 * @author oubeichen
 */
import weibo4j.Timeline;
import weibo4j.model.Status;
import weibo4j.model.StatusWapper;
import weibo4j.model.WeiboException;

public class GetUserTimeline {

	public static String getTimeline(String access_token) {
		Timeline tm = new Timeline();
		tm.client.setToken(access_token);
		try {
			StatusWapper status = tm.getUserTimeline();
			return status.getStatuses().get(0).getText();

		} catch (WeiboException e) {
			e.printStackTrace();
                        return null;
		}
	}

}

