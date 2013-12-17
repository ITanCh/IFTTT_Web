/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.dao;

import PO.UserInfoPO;
import addHibernateFile.HibernateSessionFactory;
import java.util.List;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author oubeichen
 */
public class UserDao {

    private Session session;
    private Transaction transaction;
    private Query query;

    public UserDao() {

    }

    public int saveinfo(UserInfoPO info) {
        session = HibernateSessionFactory.getSession();
        try {
            transaction = session.beginTransaction();
            session.save(info);
            transaction.commit();
            return info.getUid();
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        } finally {
            HibernateSessionFactory.closeSession();
        }
        return -1;
    }

    public UserInfoPO getinfo(int uid) {
        String log = "error";
        session = HibernateSessionFactory.getSession();
        try {
            transaction = session.beginTransaction();
            UserInfoPO po = (UserInfoPO) session.get(UserInfoPO.class, uid);
            transaction.commit();
            log = "success";
            return po;
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
            return null;
        } finally {
            HibernateSessionFactory.closeSession();
        }
    }

    public List queryInfo(String type, Object value) {
        session = HibernateSessionFactory.getSession();
        try {
            String stmt = "";
            if (type.equals("username")) {
                stmt = "from UserInfoPO as u where u.username = ?";
            } else if (type.equals("mail")) {
                stmt = "from UserInfoPO as u where u.mail = ?";
            }
            query = session.createQuery(stmt);
            query.setParameter(0, value);
            List list = query.list();
            transaction = session.beginTransaction();
            transaction.commit();
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
            return null;
        } finally {
            HibernateSessionFactory.closeSession();
        }
    }

    public List getAllUser() {
        session = HibernateSessionFactory.getSession();
        try {
            String stmt = "from UserInfoPO";
            query = session.createQuery(stmt);
            List list = query.list();
            transaction = session.beginTransaction();
            transaction.commit();
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            transaction.rollback();
            return null;
        } finally {
            HibernateSessionFactory.closeSession();
        }
    }

    public boolean updateInfo(UserInfoPO info) {
        try {
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            session.update(info);
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

    public boolean deleteInfo(UserInfoPO info) {
        try {
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            session.delete(info);
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
}
