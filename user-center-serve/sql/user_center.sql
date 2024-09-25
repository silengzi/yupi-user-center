/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50723 (5.7.23-log)
 Source Host           : localhost:3306
 Source Schema         : user_center

 Target Server Type    : MySQL
 Target Server Version : 50723 (5.7.23-log)
 File Encoding         : 65001

 Date: 22/09/2024 23:48:31
*/

# 数据库初始化

-- 创建库
create database if not exists user_center;

-- 切换库
use user_center;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userAccount` varchar(256) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '账号',
  `userPassword` varchar(512) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '密码',
  `username` varchar(256) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `avatarUrl` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '用户头像',
  `gender` tinyint(4) NOT NULL DEFAULT 0 COMMENT '性别\r\n0 女\r\n1 男',
  `phone` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '电话',
  `email` varchar(512) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '邮箱',
  `userStatus` int(11) NOT NULL DEFAULT 0 COMMENT '状态 0 - 正常',
  `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDelete` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否删除',
  `userRole` int(11) NOT NULL DEFAULT 0 COMMENT '用户角色 0 - 普通用户 1 - 管理员',
  `planetCode` varchar(512) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '星球编号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci COMMENT = '用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'silengzi', '353b1e8b0dff1e0977548f56dda259c0', 'silengzi', NULL, 0, '13233333333', '458165874@qq.com', 0, '2024-09-05 23:33:02', '2024-09-16 22:25:16', 0, 0, NULL);
INSERT INTO `user` VALUES (2, 'silengzi1', 'eaf9740f14516166dbfa1ad024d2ad98', 'zhangsan', NULL, 0, '13233333333', '458165874@qq.com', 0, '2024-09-05 23:41:48', '2024-09-16 22:25:17', 0, 0, NULL);
INSERT INTO `user` VALUES (3, 'silengzi2', 'eaf9740f14516166dbfa1ad024d2ad98', 'testupdate', NULL, 0, '13233333333', '458165874@qq.com', 0, '2024-09-05 23:47:28', '2024-09-16 22:25:18', 0, 0, NULL);
INSERT INTO `user` VALUES (4, '11111111', 'b4c1a1ae190721e080f008f965f950ad', 'testupdate', NULL, 0, '13233333333', '458165874@qq.com', 0, '2024-09-06 00:02:56', '2024-09-14 22:28:38', 0, 0, NULL);
INSERT INTO `user` VALUES (5, '22222222', 'fd6d9184573cbb2ec115e44a2a1568b1', 'silengzi3', NULL, 0, '13233333333', '458165874@qq.com', 0, '2024-09-06 00:07:14', '2024-09-14 22:28:38', 0, 0, NULL);
INSERT INTO `user` VALUES (6, '33333333', '083cff51e24c4e02dd9aeb2e6dcd78cd', 'silengzi4', NULL, 1, '13233333333', '458165874@qq.com', 0, '2024-09-06 00:12:06', '2024-09-14 22:28:38', 0, 0, NULL);
INSERT INTO `user` VALUES (7, '44444444', 'bf638bd5bff4fd811964491f219b58ba', 'test123123', 'https://gd-hbimg.huaban.com/d4abf46d88d710011e102007f6c0bb3af19bc3fa6ac07-Lt3Y48_fw240webp', 1, '12323233232', '458254125@qq.com', 0, '2024-09-06 22:14:01', '2024-09-14 22:28:38', 0, 1, NULL);
INSERT INTO `user` VALUES (8, 'zhangsan', '4a6b198fa1570903e1d1c70fe6c98090', NULL, NULL, 0, NULL, NULL, 0, '2024-09-14 21:50:13', '2024-09-16 22:25:19', 0, 0, NULL);
INSERT INTO `user` VALUES (9, 'lisi', '4a6b198fa1570903e1d1c70fe6c98090', NULL, NULL, 0, NULL, NULL, 0, '2024-09-14 21:50:23', '2024-09-20 23:12:54', 1, 0, NULL);
INSERT INTO `user` VALUES (10, 'wangwu', '4a6b198fa1570903e1d1c70fe6c98090', NULL, NULL, 0, NULL, NULL, 0, '2024-09-14 21:50:29', '2024-09-16 22:25:20', 0, 0, NULL);
INSERT INTO `user` VALUES (11, 'zhaoliu', '4a6b198fa1570903e1d1c70fe6c98090', NULL, NULL, 0, NULL, NULL, 0, '2024-09-14 21:50:37', '2024-09-16 22:25:21', 0, 0, NULL);
INSERT INTO `user` VALUES (12, 'tangsan', '4a6b198fa1570903e1d1c70fe6c98090', NULL, NULL, 0, NULL, NULL, 0, '2024-09-14 21:50:42', '2024-09-14 22:28:38', 0, 0, NULL);
INSERT INTO `user` VALUES (13, 'taigeer', '4a6b198fa1570903e1d1c70fe6c98090', NULL, NULL, 0, NULL, NULL, 0, '2024-09-14 21:50:51', '2024-09-16 22:25:22', 0, 0, NULL);
INSERT INTO `user` VALUES (14, 'taigeer222', '4a6b198fa1570903e1d1c70fe6c98090', NULL, NULL, 0, NULL, NULL, 0, '2024-09-14 21:50:54', '2024-09-16 22:25:23', 0, 0, NULL);
INSERT INTO `user` VALUES (15, '11112222', '3ba6d0995ad508ffc94c5b944cb0bb48', NULL, NULL, 0, NULL, NULL, 0, '2024-09-17 01:16:04', '2024-09-17 01:16:04', 0, 0, NULL);
INSERT INTO `user` VALUES (16, '00000000', 'c31d5720d5ce79649243175db504198b', NULL, NULL, 0, NULL, NULL, 0, '2024-09-17 23:48:56', '2024-09-17 23:48:56', 0, 0, NULL);
INSERT INTO `user` VALUES (17, '123123123', '4a6b198fa1570903e1d1c70fe6c98090', NULL, NULL, 0, NULL, NULL, 0, '2024-09-17 23:49:40', '2024-09-17 23:49:40', 0, 0, NULL);
INSERT INTO `user` VALUES (18, '12121212', 'a794a35b146e8f2db3543f4887837e28', NULL, NULL, 0, NULL, NULL, 0, '2024-09-17 23:52:37', '2024-09-20 23:28:13', 1, 0, NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) NOT NULL COMMENT '主键ID',
  `name` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '姓名',
  `age` int(11) NULL DEFAULT NULL COMMENT '年龄',
  `email` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Jone', 18, 'test1@baomidou.com');
INSERT INTO `users` VALUES (2, 'Jack', 20, 'test2@baomidou.com');
INSERT INTO `users` VALUES (3, 'Tom', 28, 'test3@baomidou.com');
INSERT INTO `users` VALUES (4, 'Sandy', 21, 'test4@baomidou.com');
INSERT INTO `users` VALUES (5, 'Billie', 24, 'test5@baomidou.com');

SET FOREIGN_KEY_CHECKS = 1;
