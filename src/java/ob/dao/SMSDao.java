/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ob.dao;

import PO.SMSPO;
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
public class SMSDao {
    
    private Session session;
    private Transaction transaction;
    private Query query;

    public int saveSMS(SMSPO sms) {
        session = HibernateSessionFactory.getSession();
        try {
            sms.setTime(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
            transaction = session.beginTransaction();
            session.save(sms);
            transaction.commit();
            return sms.getSid();
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        } finally {
            HibernateSessionFactory.closeSession();
        }
        return -1;
    }
    /**
     * 根据用户id给出短消息
     * @param uid 用户id
     * @return 用户id 的短消息
     */
    public List getSMS(int uid) {
        try {
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            String stmt = "from SMSPO as s where s.uid = ? order by sid desc";
            query = session.createQuery(stmt);
            query.setParameter(0, uid);
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
    /*
    @Deprecated
    public boolean sendAdminSMS(String content) {
        session = HibernateSessionFactory.getSession();
        try {
            transaction = session.beginTransaction();
            session.save(sms);
            transaction.commit();
            return sms.getSid();
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        } finally {
            HibernateSessionFactory.closeSession();
        }
        return -1;
    }
    */
}
