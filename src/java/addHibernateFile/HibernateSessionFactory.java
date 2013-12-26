/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package addHibernateFile;

import ob.config.Config;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 *
 * @author oubeichen
 */
public class HibernateSessionFactory {

    private static SessionFactory sessionFactory;
    private static final Configuration cfg = new Configuration();
    private static final ThreadLocal threadLocal = new ThreadLocal();

    public HibernateSessionFactory() {

    }

    static {
        try {
            cfg.configure(Config.HIB_CONFIG_FILE);
            sessionFactory = cfg.buildSessionFactory();
        } catch (HibernateException e) {
            e.printStackTrace();
        }
    }

    public static Session getSession() {
        Session session = (Session) threadLocal.get();
        if (session == null || !session.isOpen()) {
            session = sessionFactory.openSession();
            threadLocal.set(session);
        }
        return session;
    }

    public static void closeSession() {
        Session session = (Session) threadLocal.get();
        threadLocal.set(null);
        if (session != null) {
            session.close();
        }
    }
}
