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
    private static SessionFactory sessionFactory;
    private static Configuration configuration = new Configuration();
    public HibernateSessionFactory(){
        
    }
    static{
        try{
            Configuration configure = configuration.configure("hibernate.cfg.xml");
            sessionFactory = configure.buildSessionFactory();
        }catch(HibernateException e){
            e.getMessage();
        }
    }
    
    public static Session getSession(){
        return sessionFactory.openSession();
    }
}
