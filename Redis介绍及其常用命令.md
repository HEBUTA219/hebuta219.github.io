---
title: Redis介绍及其常用命令
tags:
  - 周文豪
createTime: 2025/05/31 15:30:00
---

## 一、Redis介绍

### 1 Redis的简介

Redis是一个开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。

### 2 Redis的特点

- **高性能**：Redis主要基于内存操作，读写速度非常快，适合高并发场景。
- **数据类型丰富**：Redis支持多种数据类型，能够满足不同的业务需求。
- **持久化支持**：Redis支持数据持久化，可以将数据保存到磁盘上，以防止数据丢失。
- **主从复制**：Redis支持主从复制，可以实现数据备份和高可用性。
- **事务支持**：Redis支持事务，可以将多个操作打包成一个原子操作。

### 3 Redis与MySQL

Redis和MySQL在数据模型、存储方式、性能等方面存在显著区别，但它们在实际应用中可以相互补充。Redis主要用于快速读写和缓存，而MySQL用于存储结构化数据和处理复杂查询。通过合理组合使用Redis和MySQL，可以充分发挥它们的优势，提高系统的性能和可扩展性。

#### 3.1 Redis与MySQL的区别

- **数据模型**：
   - **MySQL**：是一种关系型数据库管理系统（RDBMS），基于关系模型存储数据。
   - **Redis**：是一种键值存储（Key-Value Store）数据库，数据以键值对的形式存储。
- **存储方式**：
   - **MySQL**：数据持久化存储在磁盘上，适合存储大量结构化数据，数据的读写速度相对较慢，尤其是对于大规模数据的复杂查询。
   - **Redis**：数据主要存储在内存中，读写速度极快，适合需要快速响应的应用场景，数据量通常受限于服务器的内存大小。
- **事务支持**：
   - **MySQL**：支持ACID（原子性、一致性、隔离性、持久性）事务，能够保证复杂操作的完整性。
   - **Redis**：支持简单的事务机制，可以将多个命令打包执行，但不支持复杂的事务特性（如回滚）。
#### 3.2 Redis与MySQL的组合使用
- Redis通常作为缓存层使用，存储热点数据，以减轻MySQL的读取压力。例如，将用户频繁访问的数据（如用户信息、商品详情）存储在Redis中，当用户请求这些数据时，直接从Redis读取，从而提高系统的响应速度。
- MySQL作为持久层存储所有数据，确保数据的完整性和持久性。当Redis中的数据失效或需要更新时，可以从MySQL中读取最新的数据。
- Redis可以作为MySQL的补充，提供一些MySQL不支持的功能，如排行榜（通过有序集合）、消息队列（通过列表）等。例如，一个游戏平台可以使用Redis的有序集合存储玩家的排行榜，实时更新玩家的排名。

### 4 Redis的数据类型

Redis支持五种基本数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。

![](https://raw.githubusercontent.com/HEBUTA219/TyporaPic/main/20250527165154.png)

| 类型 | 简介 | 特性 | 使用场景 |
|---------|--------|---------|---------|
| String(字符串) | 二进制安全 | 可以包含任何数据,比如jpg图片或者序列化的对象,一个键最大能存储512M | -|
| Hash(字典) | 键值对集合,即编程语言中的Map类型 | 适合存储对象,并且可以像数据库中update一个属性一样只修改某一项属性值 | 存储、读取、修改用户属性 |
| List(列表) | 链表(双向链表) | 增删快,提供了操作某一段元素的API| 1. 最新消息排行等功能(比如朋友圈的时间线); 2. 消息队列 |
| Set(集合) | 哈希表实现,元素不重复 | 1. 添加、删除、查找的复杂度都是O(1) 2. 为集合提供了求交集、并集、差集等操作 | 1. 共同好友 2. 利用唯一性,统计访问网站的所有独立ip 3. 好友推荐时,根据tag求交集,大于某个阈值就可以推荐 |
| Sorted Set(有序集) | 将Set中的元素增加一个权重参数score,元素按score有序排列 | 数据插入集合时,已经进行天然排序  | 1. 排行榜 2. 带权重的消息队列 |

>**其他高级数据类型**
>- 超日志（HyperLogLogs）：这是一种概率数据结构，用于估计集合的基数。
>- 位图（Bitmaps）：位数组，可以对字符串进行位操作
>- 地理空间索引（Geospatial）：处理地理空间数据，支持地理空间索引和半径查询。
>- 流（Streams）：只追加的集合，它由类map提供抽象日志数据类型的元素组成。

## 二、Redis的常用命令

### 1 字符串操作命令
#### **Redis字符串类型常用命令**

```
SET key value               设置指定key的值
GET key                     获取指定key的值
SETNX key value             只有在key不存在时设置key的值
SETEX key senconds value    设置指定key的值,并将key的过期时间设为seconds秒
```
### 2 哈希操作命令
#### **Redis哈希类型常用命令**

```
HSET key field value        将哈希表key中的字段field的值设为value
HGET key field              获取存储在哈希表中指定字段的值
HDEL key field              删除存储在哈希表中的指定字段
HKEYS key                   获取哈希表中的所有字段
HVALS key                   获取哈希表中的所有值
```
![](https://raw.githubusercontent.com/HEBUTA219/TyporaPic/main/20250525212405.png)

### 3 列表操作命令
#### **Redis列表类型常用命令**

```
LPUSH key value1 [value2]   将一个或者多个值插入列表头部
LRANGE key start stop       获取列表指定范围内的元素
RPOP key                    移除并获取列表最后一个元素
LLEN key                    获取列表长度
```
![](https://raw.githubusercontent.com/HEBUTA219/TyporaPic/main/20250527160045.png)

创建上图所示列表的命令为 LPUSH key d b c a

### 4 集合操作命令
Redis set 是string类型的无序集合。集合成员是唯一的，集合中不能出现重复的数据。
#### **Redis集合类型常用命令**

```
SADD key member1 [member2]  向集合添加一个或多个成员
SMEMBERS key                返回集合中的所有成员
SCARD key                   获取集合的成员数
SINTER key1 [key2]          返回给定所有集合的交集
SUNION key1 [key2]          返回所有给定集合的并集
SREM key member1 [member2]  删除集合中一个或多个成员
```
![](https://raw.githubusercontent.com/HEBUTA219/TyporaPic/main/20250527161457.png)

### 5 有序集合操作命令
Redis有序集合是string类型元素的集合，且不允许有重复成员。每个元素都会关联一个double类型的分数。
#### **Redis有序集合类型常用命令**

```
ZADD key score1 member1 [score2 member2]  向有序集合添加一个或多个成员
ZRANGE key start stop [WITHSCORES]        通过索引区间返回有序集合中指定区间内的成员
ZINCRBY key increment member              有序集合中对指定成员的分数加上增量increment
ZREM key member [member ..]               移除有序集合中的一个或多个成员
```
![](https://raw.githubusercontent.com/HEBUTA219/TyporaPic/main/20250527163225.png)

### 6 通用操作命令
Redis的通用命令是不分数据类型的，都可以使用的命令。
#### **Redis有序集合类型常用命令**

```
KEYS pattern                              查找所有符合给定模式(pattern)的key
EXISTS key                                检查给定key是否存在
TYPE key                                  返回key所储存的值的类型
DEL key                                   若key存在，删除key
```
