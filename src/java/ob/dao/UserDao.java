/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.dao;

import PO.UserInfoPO;
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
public class UserDao {

    private Session session;
    private Transaction transaction;
    private Query query;

    public UserDao() {

    }

    public String saveinfo(UserInfoPO info) {
        String log = "error";
        session = HibernateSessionFactory.getSession();
        try {
            transaction = session.beginTransaction();
            session.save(info);
            transaction.commit();
            log = "success";
            return log;
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return log;
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
        } catch (HibernateException e) {
            e.printStackTrace();
            return null;
        }
    }
    
    public boolean updateInfo(UserInfoPO info){
        try{
            session = HibernateSessionFactory.getSession();
            transaction = session.beginTransaction();
            session.update(info);
            transaction.commit();
            session.close();
            return true;
        }catch(HibernateException e){
            e.printStackTrace();
            return false;
        }
    }
}
