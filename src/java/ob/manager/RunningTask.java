/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.manager;

import PO.TaskPO;
import java.util.HashMap;

/**
 *
 * @author oubeichen
 */
public class RunningTask {
    private static final HashMap<String,TaskPO> tasks = new HashMap<String,TaskPO>();
    public static boolean addTask(TaskPO task){
        tasks.put(task.getTid(),task);
        task.setIsrunning(true);
        task.start();
        return true;
    }
    public static boolean isHere(String tid){
        return tasks.containsKey(tid);
    }
    public static String getStatus(String tid){
        if(tasks.containsKey(tid)){
            return tasks.get(tid).getStatus();
        }
        return null;
    }
    public static boolean delTask(String tid){
        if(tasks.containsKey(tid)){
            TaskPO po = tasks.get(tid);
            po.setIsrunning(false);
            tasks.remove(tid);
            return true;
        }
        return false;
    }
}