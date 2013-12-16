/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : ifttt

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2013-12-16 19:49:39
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `log`
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `lid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `uname` char(50) NOT NULL,
  `tname` char(50) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1是新建 2是修改 3是删除 4是运行 5是停止',
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of log
-- ----------------------------
INSERT INTO `log` VALUES ('1', '0', 'johnsmith4', 'hhaha', '4');
INSERT INTO `log` VALUES ('2', '0', 'johnsmith4', 'hhaha', '5');
INSERT INTO `log` VALUES ('3', '0', 'johnsmith4', 'sasa', '4');
INSERT INTO `log` VALUES ('4', '0', 'johnsmith4', 'sasa', '5');
INSERT INTO `log` VALUES ('5', '0', 'johnsmith4', 'tcc', '4');
INSERT INTO `log` VALUES ('6', '0', 'johnsmith4', 'tcc', '5');
INSERT INTO `log` VALUES ('7', '0', 'johnsmith4', 'sasa', '4');
INSERT INTO `log` VALUES ('8', '0', 'johnsmith4', 'sasa', '5');

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
  `thatpassword` char(50) DEFAULT NULL,
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
INSERT INTO `task` VALUES ('297ee40342eadae20142eae57a0c0003', '2', '2013-12-13 03:28:03', 'tcc1', '1', '0', 'tcc@tc.com', 'KoYhqhbZSzoHz+TTGpO4ig==', null, 'weibo', 'wOpZ4bSGfwf3FjS8AMQQTA==', null, null, null, 'weib');
INSERT INTO `task` VALUES ('297ee40342eadae20142eae7171e0004', '2', '2013-12-13 03:28:03', 'tcc', '1', '0', 'tcc@tcc.ff', 'qGoc9aFIUgE12l96AO3uJA==', null, 'tcccc', 't2CPN0tB9+LLPEg4CG/kbg==', null, null, null, 'ttttt');
INSERT INTO `task` VALUES ('297ee40342eadae20142eae94df50005', '2', '2013-12-13 03:28:03', 'tcc', '2', '0', 'haha', '+FNFl+d6pYPfFS3H3ZIv9w==', null, 'www', 'RfM92I3PYqhKwmiNCTDuOw==', null, null, null, 'www');
INSERT INTO `task` VALUES ('297ee40342eaea2f0142eaeb055f0000', '2', '2013-12-13 03:44:59', 'ttttt', '1', '0', 'ttt@ttt.c', '5X63+brPfh7wVJur6yc4WQ==', null, 'ttt', 'MlL/2g5QcFKQMQWKKwOPFw==', null, null, null, 'ttt');
INSERT INTO `task` VALUES ('297ee40342eaea2f0142eaec12f10001', '2', '2013-12-13 03:44:59', 'hahaha', '2', '0', 'haha', 'pykN489v5PkgmVfLz5X7Sg==', null, 'haha', 'pykN489v5PkgmVfLz5X7Sg==', null, null, null, 'haha');
INSERT INTO `task` VALUES ('297ee40342eaea2f0142eaec7de00002', '2', '2013-12-13 03:44:59', 'haha', '2', '0', 'hhh', 'gSqKDbwrrDX3vK9rYfEprg==', null, 'hh', 'gSqKDbwrrDX3vK9rYfEprg==', null, null, null, 'hh');
INSERT INTO `task` VALUES ('297ee40342eaed920142eaee14d60000', '2', '2013-12-13 03:49:00', 'ttt', '2', '0', 'ttt', '5X63+brPfh7wVJur6yc4WQ==', null, 'ttt', 'MlL/2g5QcFKQMQWKKwOPFw==', null, null, null, 'ttt');
INSERT INTO `task` VALUES ('297ee40342eaed920142eaef54c20001', '2', '2013-12-13 03:49:00', 'tttt', '2', '0', 'ttt', 'MlL/2g5QcFKQMQWKKwOPFw==', null, 'ttt', 'MlL/2g5QcFKQMQWKKwOPFw==', null, null, null, 'ttt');
INSERT INTO `task` VALUES ('297ee40342eaf0f90142eaf1282c0000', '2', '2013-12-13 03:52:22', 'sasa', '2', '0', 'hhh', 'gSqKDbwrrDX3vK9rYfEprg==', null, 'hh', 'gSqKDbwrrDX3vK9rYfEprg==', null, null, null, 'hh');
INSERT INTO `task` VALUES ('297ee40342eaf0f90142eaf16a4d0001', '2', '2013-12-13 03:52:39', 'hhaha', '2', '0', 'hhahaha', 'pykN489v5PkgmVfLz5X7Sg==', null, 'haha', 'pykN489v5PkgmVfLz5X7Sg==', null, null, null, 'haha');

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
  `level` int(11) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'oubeichen', 'K6I1F7HBSD6K86DO77DKK8H6628Y768P', 'admin@oubeichen.com', '1000', '0', '0');
INSERT INTO `user` VALUES ('2', 'johnsmith4', 'YOYB6I7FPFK8881DPOBHHP2OH18D2ISH', 'oubeichen@gmail.com', '1000', '1', '0');
