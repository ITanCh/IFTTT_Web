/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package addHibernateFile;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 *
 * @author oubeichen
 */
public class HibernateSessionFactory {
    private SessionFactory sessionFactory;
    public HibernateSessionFactory(){
        
    }
    public SessionFactory config(){
        try{
            Configuration configuration = new Configuration();
            Configuration configure = configuration.configure("hibernate.cfg.xml");
            return configure.buildSessionFactory();
        }catch(HibernateException e){
            e.getMessage();
            return null;
        }
    }
    public Session getSession(){
        sessionFactory=config();
        return sessionFactory.openSession();
    }
}
