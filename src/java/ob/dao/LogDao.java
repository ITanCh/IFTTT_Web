/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.dao;

import PO.LogPO;
import addHibernateFile.HibernateSessionFactory;
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

    public List getAllLog() {
        try {
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            String stmt = "from LogPO";
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
