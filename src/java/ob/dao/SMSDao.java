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

    public boolean saveSMS(SMSPO sms) {
        session = HibernateSessionFactory.getSession();
        try {
            sms.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
            transaction = session.beginTransaction();
            session.save(sms);
            transaction.commit();
            return true;
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        } finally {
            HibernateSessionFactory.closeSession();
        }
        return false;
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
        public SMSPO getSMSbyID(int sid) {
        try {
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            SMSPO spo = (SMSPO)session.get(SMSPO.class, sid);
            transaction.commit();
            return spo;
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
            return null;
        } finally {
            HibernateSessionFactory.closeSession();
        }
    }
    public boolean delSMS(SMSPO spo){
        try {
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            if(spo != null){
            session.delete(spo);
            }
            transaction.commit();
            return true;
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
            return false;
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
