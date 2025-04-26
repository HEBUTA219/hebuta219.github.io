---
title: Flyway数据库迁移工具
tags:
  - 佘甲帅
---



## 一、Flyway概述

### 1 是什么工具

​	Flyway 是一款开源的数据库版本管理工具，它专注于数据库的变更管理，实现一套可靠的**数据库持续部署方案**。通过 Flyway，开发者能够以版本控制的方式对数据库的变更进行跟踪和应用，就像使用 Git 等工具管理代码版本一样。它支持多种数据库，如 MySQL、PostgreSQL、Oracle 等，能够确保数据库在不同环境（开发、测试、生产）中的一致性。



### 2 要解决什么问题

[转载]: (https://www.bilibili.com/video/BV12t42147Cp/?spm_id_from=333.337.search-card.all.click&amp;vd_source=a51416fdc1c05fee728077538bb353b8)



#### 2.1 数据库部署与应用部署的区别

总的来说，应用部署是无状态的，而数据库部署是有状态的。下面将详细解释这两者的区别：

1. **应用部署是无状态的**
   - **什么是应用部署**：应用部署是指将代码（无论是前端、后端，还是其他类型的代码）打包并部署到目标环境中的过程。
   - **为什么无状态的**：应用部署通常不涉及历史数据等信息，因此每次部署时只需要将最新的代码**覆盖**掉旧的代码即可。也就是说，应用更新时不需要关心之前的代码状态，因此应用部署可以看作是无状态的。
2. **数据库部署是有状态的**
   - **什么是数据库部署**：数据库部署是将数据库系统、表结构、数据迁移等进行配置和管理的过程，通常包括数据库的安装、配置、更新、备份和恢复等操作。
   - **为什么是有状态的**：数据库存储着持久化的数据，这些数据会随着时间不断变化。因此，在数据库部署过程中，必须考虑和维护数据的历史状态，例如数据迁移、表结构变更以及数据的完整性等。每次部署不仅涉及代码的更新，还必然需要处理数据的版本控制和历史数据的迁移，确保数据库的状态一致性。因此，数据库部署是有状态的，。



> [!tip]
>
> 针对数据库部署的举例：假设我们部署了V1.0.0版本，其中包含一个名为`student`的数据库表。然而，在V1.0.1版本中，需要将`student`表中的`stu_number`字段（学号）更改为`stu_code`。在这种情况下，对于已经部署到生产环境的系统进行更新将变得非常棘手。可以明确的是，直接在生产环境中执行最新版本的数据库结构更新脚本是不可行的，因为这样会导致不可挽回的数据丢失或错误。



#### 2.2 数据库持续部署流程

​	那如何解决上述问题呢，能想到的方案有两种：**持续维护最新版的全量信息且存在逻辑判断的sql文件**、**持续维护变动日志且通过版本号状态自动更新**

1. **方案一（持续维护最新版的全量信息且存在逻辑判断的sql文件）**

   - 记录形式：这个sql文件全量的记录了最新版本的数据库信息（注意不是操作日志），且这个文件必须能够可重复执行，也就是说对于任意版本的系统都能够成功执行这个文件，要做到这一点sql文件里面必然存在大量的逻辑判断操作
   - 使用方式：直接运行这个sql文件
   - 维护方式：手动维护
   - 维护难度：极其复杂
   - 可靠性：不可靠，因为文件存在大量的逻辑判断，需要对以前的数据库表极其清晰才能维护好最新版本的sql文件

2. **方案二（持续维护变动日志且通过版本号状态自动更新）**

   - 记录形式：将每次的数据库变更记录在本次的版本sql文件中，同时生产环境的数据库自动记录当前的版本号
   - 使用方式：生产环境根据当前的版本号查找需要更新的版本sql文件并自动执行

   - 维护方式：手动维护
   - 维护难度：中等（从使用navicat的可视化操作转换为手写sql并将其记录在本次版本变动的sql文件中）
   - 可靠性：可靠



### 3 同类型工具对比（Flyway与Liquibase）

个人认为还是Flyway上手容易一点

1. **功能特性**

   - **Flyway**：功能相对简洁，专注于数据库变更的版本控制，以 SQL 脚本为核心，更适合对 SQL 有深入了解的开发者。

   - **Liquibase**：功能更为丰富，支持多种格式（如 XML、YAML、JSON）来描述数据库变更，不仅可以处理 SQL 脚本，还能通过高级抽象来管理数据库，对非技术人员更友好。

   - 学习成本
     - **Flyway**：由于其简洁的设计，学习成本较低，开发者可以快速上手。
     - **Liquibase**：由于支持多种格式和丰富的功能，学习曲线相对较陡。

2. **社区支持**

   - **Flyway**：社区活跃度较高，有大量的文档和教程可供参考。

   - **Liquibase**：同样拥有庞大的社区，但在某些特定场景下的资料可能相对较少。





## 二、springboot集成

### 1 依赖

```xml
        <!--Flyway依赖-->
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>
        <!--由于Flyway8.2.1版本之后不支持mysql8.0数据库，所以这里需要手动引入mysql的相关依赖-->
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-mysql</artifactId>
        </dependency>
        <!--mysql驱动程序依赖，通过mysql驱动连接mysql数据库-->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
        </dependency>
        <!--如果不增加jdbc依赖的话需要手动配置mysql驱动的自动装配-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
        </dependency>
```





### 2 配置

```yml

spring:
  application:
    name: flyway
# 数据源配置，createDatabaseIfNotExist=true数据库不存在则自动创建
  datasource:
    url: jdbc:mysql://ip:port/database?createDatabaseIfNotExist=true&serverTimezone=Hongkong&useUnicode=true&characterEncoding=utf-8&useSSL=false&nullCatalogMeansCurrent=true&allowPublicKeyRetrieval=true
    username: root
    password: root
    driver-class-name: com.mysql.cj.jdbc.Driver
# flyway 配置
  flyway:
    # 启用或禁用 flyway
    enabled: true
    # 务必设置为true：flyway 的 clean 命令会删除指定 schema 下的所有 table, 生产务必禁掉。这个默认值是 false 理论上作为默认配置是不科学的。
    clean-disabled: true
    # SQL 脚本的目录,多个路径使用逗号分隔 默认值 classpath:db/migration
    locations: classpath:db/migration
    #  metadata 版本控制信息表 默认 flyway_schema_history
    table: flyway_schema_history
    # 如果没有 flyway_schema_history 这个 metadata 表， 在执行 flyway migrate 命令之前, 必须先执行 flyway baseline 命令
    # 设置为 true 后 flyway 将在需要 baseline 的时候, 自动执行一次 baseline。
    baseline-on-migrate: true
    # 指定 baseline 的版本号,默认值为 1, 低于该版本号的 SQL 文件, migrate 时会被忽略
    baseline-version: 2.0.0
    # 字符编码 默认 UTF-8
    encoding: UTF-8
    # 是否允许不按顺序迁移 开发建议 true  生产建议 false
    out-of-order: false
    # 需要 flyway 管控的 schema list,这里我们配置为flyway  缺省的话, 使用spring.datasource.url 配置的那个 schema,
    # 可以指定多个schema, 但仅会在第一个schema下建立 metadata 表, 也仅在第一个schema应用migration sql 脚本.
    # 但flyway Clean 命令会依次在这些schema下都执行一遍. 所以 确保生产 spring.flyway.clean-disabled 为 true
    schemas: database
    # 执行迁移时是否自动调用验证   当你的 版本不符合逻辑 比如 你先执行了 DML 而没有 对应的DDL 会抛出异常
    validate-on-migrate: true
```





### 3 使用



1. **sql文件名约定**

![在这里插入图片描述](https://raw.githubusercontent.com/she1110/typora-/master/aed08df531886c236977a8f5998fb1a6.png)

![image-20250426235041625](https://raw.githubusercontent.com/she1110/typora-/master/image-20250426235041625.png)



2. **更新规则**

​	每次启动springboot服务会自动按照版本号自动更新数据库，数据库版本更新记录默认存储在数据库的flyway_schema_history表中



3. **维护方式**

​	由于每次Flyway更新数据库版本会自动扫描资源目录**db.migration**下的所有sql文件，所以当有数据库变更的时候开发人员需要把操作sql存储在此目录下













