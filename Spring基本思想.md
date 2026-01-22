---
title: Spring基本思想
tags:
  - 李新月
  - Spring
createTime: 2025/06/25 15:47:30
---
## Spring基本思想

### 控制反转（IoC）

#### 问题提出

**问题：实现方法需要调用操作对象，导致层与层之间耦合度高，如果后续需要更改操作对象，需要修改大量代码**

```
//UserDao接口
public interface UserDao {
   public void getUser();
}

//UserDao实现类1
public class UserDaoImpl implements UserDao {
   @Override
   public void getUser() {
       System.out.println("获取用户数据");
  }
}

//UserDao实现类2
public class UserDaoMySqlImpl implements UserDao {
   @Override
   public void getUser() {
       System.out.println("MySql获取用户数据");
  }
}
```

UserService调用UserDao实现类1

```
//UserService接口
public interface UserService {
   public void getUser();
}

//UserService实现类
public class UserServiceImpl implements UserService {
   private UserDao userDao = new UserDaoImpl();

   @Override
   public void getUser() {
       userDao.getUser();
  }
}
```

此时，如果UserService需要调用实现类2，则需要修改UserServiceImpl代码

```
public class UserServiceImpl implements UserService {
   private UserDao userDao = new UserDaoMySqlImpl();

   @Override
   public void getUser() {
       userDao.getUser();
  }
}
```

如果后续还需要更改实现类，则需要大量的修改代码

#### 解决思路

**UserService不直接new UserDao的实现类，改为使用set方法，之后在调用UserService时指明要使用的UserDao的实现类（IoC原型）**

```
public class UserServiceImpl implements UserService {
   private UserDao userDao;
   // 利用set实现
   public void setUserDao(UserDao userDao) {
       this.userDao = userDao;
  }

   @Override
   public void getUser() {
       userDao.getUser();
  }
}
```

```
@Test
public void test(){
   UserServiceImpl service = new UserServiceImpl();
   service.setUserDao( new UserDaoImpl() );
   service.getUser();
   //换成实现类2
   service.setUserDao( new UserDaoMySqlImpl() );
   service.getUser();
}
```

**IoC(Inversion of Control)：控制反转，将bean创建权交给第三方，代码内部不自己new bean而是找第三方，IoC是一种设计思想，DI(依赖注入)是实现IoC的一种方法**

### 依赖注入（DI）

**DI（Dependency Injection）：依赖注入，强调bean之间的依赖关系**

假设bean1内部需要bean2

原始方法：程序找第三方要bean1，再找第三方要bean2，再将bean1设置给bean1

DI思想：第三方在创建bean1的时候就创建bean2，并把bean2设置给bean1，此时程序在获取bean1的时候，bean1的内部已经包含了bean2

#### DI实现

![image-20250622110214815](https://raw.githubusercontent.com/li1013/A219/main/image-20250622110214815.png)

beans.xml：

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

   <bean id="UserDaoImpl" class="com.kuang.dao.impl.UserDaoImpl"/>
   <bean id="MysqlImpl" class="com.kuang.dao.impl.UserDaoMySqlImpl"/>
   
   <bean id="ServiceImpl" class="com.kuang.service.impl.UserServiceImpl">
   
       <!--引用另外一个bean-->
       <!--name是ServiceImpl中的set方法后面的那部分,首字母小写-->
       <!--ref是被引用bean的id-->
       <property name="userDao" ref="MysqlImpl"/>
   </bean>

</beans>
```

使用BeanFactory解析bean配置清单

```
@Test
public void test(){
   //创建工厂对象
   DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
   //创建xml文件阅读器
   XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(beanFactory);
   //读取配置文件
   reader.loadBeanDefinitions("beans.xml");
   //根据id获取bean实例对象
   UserServiceImpl serviceImpl = (UserServiceImpl) beanFactory.getBean("ServiceImpl");
   serviceImpl.getUser();
}
```

使用ApplicationContext解析bean配置清单

```
@Test
public void test(){
   ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
   UserServiceImpl serviceImpl = (UserServiceImpl) applicationContext.getBean("ServiceImpl");
   serviceImpl.getUser();
}
```

#### BeanFactory与ApplicationContex

BeanFactory是Spring的早期接口，称为Spring的Bean工厂

ApplicationContex称为Spring容器，内部封装了BeanFactory，比BeanFactory功能更强大，开发中常用ApplicationContex

ApplicationContext在BeanFactory基础上对功能进行了扩展，例如：监听功能、国际化功能等。BeanFactory的API更偏向底层，ApplicationContext的API大多数是对这些底层API的封装
Bean创建的主要逻辑和功能都被封装在BeanFactory中，ApplicationContext不仅继承了BeanFactory，而且ApplicationContext内部还维护着BeanFactory的引用，所以，ApplicationContext与BeanFactory既有继承关系，又有融合关系。
Bean的初始化时机不同，原始BeanFactory是在首次调用getBean时才进行Bean的创建，而ApplicationContext则是配置文件加载，容器一创建就将Bean都实例化并初始化好。

```
//BeanFactory初始化Bean
UserServiceImpl serviceImpl = (UserServiceImpl) beanFactory.getBean("ServiceImpl");

//ApplicationContex初始化Bean
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
```



### 面向切面编程（AOP）

问题提出：业务代码中会包含一些事务、日志等重复代码，一般被称为 横切逻辑代码

```
public interface UserService {

   public void add();

   public void delete();

   public void update();

   public void search();

}
public class UserServiceImpl implements UserService{

   @Override
   public void add() {
       LogService.addVLog();//添加日志
       System.out.println("增加用户");
  }

   @Override
   public void delete() {
       LogService.addVLog();//添加日志
       System.out.println("删除用户");
  }

   @Override
   public void update() {
       LogService.addVLog();//添加日志
       System.out.println("更新用户");
  }

   @Override
   public void search() {
       LogService.addVLog();//添加日志
       System.out.println("查询用户");
  }
}

```

思想：将横切逻辑代码与业务代码分离

业务接口和实现类

```
public interface UserService {

   public void add();

   public void delete();

   public void update();

   public void search();

}
public class UserServiceImpl implements UserService{

   @Override
   public void add() {
       System.out.println("增加用户");
  }

   @Override
   public void delete() {
       System.out.println("删除用户");
  }

   @Override
   public void update() {
       System.out.println("更新用户");
  }

   @Override
   public void search() {
       System.out.println("查询用户");
  }
}

```

增强类

```
public class DiyPointcut {

   public void before(){
       LogService.addVLog();//添加日志
  }  
}
```

xml配置

```
<!--注册bean-->
<bean id="diy" class="com.kuang.config.DiyPointcut"/>

<!--aop的配置-->
<aop:config>
   <!--使用AOP的标签实现-->
   <aop:aspect ref="diy">
       <aop:pointcut id="diyPonitcut" expression="execution(* com.kuang.service.UserServiceImpl.*(..))"/>
       <aop:before pointcut-ref="diyPonitcut" method="before"/>
   </aop:aspect>
</aop:config>

```

## 补充

#### bean

bean本质上是指代任何被 Spring 加载生成出来的对象

Spring官方文档定义：在 Spring 中，构成应用程序主干并由Spring IoC容器管理的对象称为bean。bean是一个由Spring IoC容器实例化、组装和管理的对象。即：

- bean是对象，一个或者多个不限定
- bean由Spring中一个叫IoC的东西管理
- 我们的应用程序由一个个bean构成

bean规范如下：

- 所有属性为private
- 提供默认构造方法
- 提供getter和setter
- 实现serializable接口

```
import java.io.Serializable;

public class User implements Serializable { // 实现序列化接口[1,7](@ref)
    // 1. 所有属性为 private
    private String name;
    private String email;
    private int age;

    // 2. 提供默认构造方法（无参数）[3,6,7](@ref)
    public User() {
        // 可选：初始化默认值
        this.name = "Unknown";
        this.age = 0;
    }

    // 3. 带参构造方法（非必需，但增强灵活性）[5,8](@ref)
    public User(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    // 4. 提供 getter 和 setter 方法（命名规范：getXxx/setXxx）[1,4,7](@ref)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age >= 0) { // 可选：添加业务逻辑校验
            this.age = age;
        }
    }

    // 可选：重写 toString() 方便调试[7](@ref)
    @Override
    public String toString() {
        return "User{name='" + name + "', email='" + email + "', age=" + age + "}";
    }
}
```

#### 参考

https://cloud.tencent.com/developer/article/1921912

https://zhuanlan.zhihu.com/p/141204279

https://blog.csdn.net/weixin_44207403/article/details/106736102?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522a467ce3120ee5a36ac1b3794bcb51409%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=a467ce3120ee5a36ac1b3794bcb51409&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-106736102-null-null.142^v102^pc_search_result_base2&utm_term=spring&spm=1018.2226.3001.4187