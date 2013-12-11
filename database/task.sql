/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : ifttt

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2013-12-11 22:24:14
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `tid` char(50) NOT NULL,
  `uid` int(11) NOT NULL,
  `ctime` char(20) NOT NULL,
  `taskname` char(50) NOT NULL,
  `thistype` tinyint(4) NOT NULL,
  `thattype` tinyint(4) NOT NULL,
  `thisstr1` char(50) NOT NULL,
  `thisstr2` char(50) NOT NULL,
  `thistext` text,
  `thatusername` char(50) NOT NULL,
  `thatpassword` char(50) NOT NULL,
  `usethis` char(1) DEFAULT NULL,
  `thatdstemail` char(50) DEFAULT NULL,
  `thatemailtitle` char(50) DEFAULT NULL,
  `thattext` text,
  PRIMARY KEY (`tid`),
  KEY `task_ibfk_1` (`uid`),
  CONSTRAINT `task_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES ('232fsafgwrwersdf', '2', '2013-12-11 08:50:59', 'haha', '0', '0', '2013-12-11', '11:11', null, 'hahahaha', 'Gp2dGpS0hyNVmTKVodbuGg==', null, null, null, 'hahaha');
INSERT INTO `task` VALUES ('234fsafgwrwersdf', '1', '2013-12-03 21:35:11', 'haha', '0', '0', 'thisstr1', 'thisstr2', null, 'thatusername', 'eU//+uEuc1RBTHebCQJ1cw==', null, null, null, null);
