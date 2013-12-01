/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.dao;

import PO.TaskPO;
import addHibernateFile.HibernateSessionFactory;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author oubeichen
 */
public class TaskDao {
    private Session session;
    private Transaction transaction;
    private Query query;

    public TaskDao() {

    }

    public String savetask(TaskPO task) {
        String log = "error";
        session = HibernateSessionFactory.getSession();
        try {
            transaction = session.beginTransaction();
            session.save(task);
            transaction.commit();
            log = "success";
            return log;
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return log;
    }

    public List queryTask(String type, Object value) {
        session = HibernateSessionFactory.getSession();
        try {
            String stmt = "";
            if (type.equals("uid")) {
                stmt = "from TaskPO as t where t.uid = ?";
            } else if (type.equals("tid")) {
                stmt = "from TaskPO as t where t.tid = ?";
            }
            query = session.createQuery(stmt);
            query.setParameter(0, value);
            List list = query.list();
            transaction = session.beginTransaction();
            transaction.commit();
            return list;
        } catch (HibernateException e) {
            e.printStackTrace();
            return null;
        }
    }
    public boolean deleteTask(String id){
        try{
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            TaskPO task = (TaskPO)session.get(TaskPO.class, id);
            session.delete(task);
            transaction.commit();
            session.close();
            return true;
        }catch(HibernateException e){
            e.printStackTrace();
            return false;
        }
    }
    public boolean updateTask(TaskPO task){
        try{
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            session.update(task);
            transaction.commit();
            session.close();
            return true;
        }catch(HibernateException e){
            e.printStackTrace();
            return false;
        }
    }
}