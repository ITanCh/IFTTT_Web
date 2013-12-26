/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ob.util;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.Security;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import ob.config.Config;
import org.apache.tomcat.util.codec.binary.Base64;

/**
 * AES双向加密修改版，用于加密任务信息中的密码 from http://www.iteye.com/topic/1122076
 *
 * @author highill
 * @modifier oubeichen
 */
public class AESUtil {

    //SecretKey 负责保存对称密钥  
    private static SecretKey deskey;
    //Cipher负责完成加密或解密工作  
    private static Cipher c;

    public AESUtil() {
    }

    static {
        Security.addProvider(new com.sun.crypto.provider.SunJCE());
        //生成密钥  
        byte[] buff = Base64.decodeBase64(Config.KEY_IN_AES);//使用配置中的key
        deskey = new SecretKeySpec(buff, "AES");
        try {
            //生成Cipher对象,指定其支持的DES算法
            c = Cipher.getInstance("AES");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 对字符串加密
     *
     * @param str
     * @return
     * @throws InvalidKeyException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     */
    public static String Encrytor(String str) {
        try {
            // 根据密钥，对Cipher对象进行初始化，ENCRYPT_MODE表示加密模式  
            byte[] cipherByte;
            c.init(Cipher.ENCRYPT_MODE, deskey);
            byte[] src = str.getBytes();
            // 加密，结果保存进cipherByte  
            cipherByte = c.doFinal(src);
            return Base64.encodeBase64String(cipherByte);  //为了保证输出是String所以应该base64加密一下
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 对字符串解密
     *
     * @param buff
     * @return
     * @throws InvalidKeyException
     * @throws IllegalBlockSizeException
     * @throws BadPaddingException
     */
    public static String Decryptor(String str) {
        byte[] cipherByte;
        byte[] buff = Base64.decodeBase64(str);
        try {
            // 根据密钥，对Cipher对象进行初始化，DECRYPT_MODE表示加密模式
            c.init(Cipher.DECRYPT_MODE, deskey);
            cipherByte = c.doFinal(buff);
            return new String(cipherByte);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * @param args
     * @throws NoSuchPaddingException
     * @throws NoSuchAlgorithmException
     * @throws BadPaddingException
     * @throws IllegalBlockSizeException
     * @throws InvalidKeyException
     */
    public static void main(String[] args) throws Exception {
        String msg = ";',.$#^*&sfd2341234sdfgwrewsdff";  //转换成char则不能正常使用
        String encontent = Encrytor(msg);
        String decontent = Decryptor(encontent);
        System.out.println("明文是:" + msg);
        System.out.println("加密后:" + encontent + encontent.length());
        System.out.println("解密后:" + decontent);
    }
}
