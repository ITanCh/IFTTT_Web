/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : ifttt

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2013-12-11 22:24:19
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(30) NOT NULL,
  `password` char(32) NOT NULL,
  `mail` char(50) DEFAULT NULL,
  `coins` bigint(20) NOT NULL DEFAULT '1000',
  `admin` char(1) DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'oubeichen', 'K6I1F7HBSD6K86DO77DKK8H6628Y768P', 'admin@oubeichen.com', '1000', '0');
INSERT INTO `user` VALUES ('2', 'johnsmith', 'YOYB6I7FPFK8881DPOBHHP2OH18D2ISH', 'test1@gmail.com', '1000', '0');
