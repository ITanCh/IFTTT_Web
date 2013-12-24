/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.dao;

import ob.PO.LogPO;
import addHibernateFile.HibernateSessionFactory;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author oubeichen
 */
public class LogDao {

    private Session session;
    private Transaction transaction;
    private Query query;

    public int saveLog(LogPO Log) {
        session = HibernateSessionFactory.getSession();
        try {
            Log.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
            transaction = session.beginTransaction();
            session.save(Log);
            transaction.commit();
            return Log.getLid();
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        } finally {
            HibernateSessionFactory.closeSession();
        }
        return -1;
    }
    /**
     * 根据索引给出不同位置的日志
     * @param index 索引
     * @return index乘以十到index+1乘以十的日志
     */
    public List getLog(int index) {
        try {
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            String stmt = "from LogPO order by Lid desc";
            query = session.createQuery(stmt);
            query.setMaxResults(10);
            query.setFirstResult(index * 10);
            List list = query.list();
            transaction.commit();
            return list;
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
            return null;
        } finally {
            HibernateSessionFactory.closeSession();
        }
    }
    public List getAllLog() {
        try {
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            String stmt = "from LogPO order by Lid desc";
            query = session.createQuery(stmt);
            List list = query.list();
            transaction.commit();
            return list;
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
            return null;
        } finally {
            HibernateSessionFactory.closeSession();
        }
    }
}
