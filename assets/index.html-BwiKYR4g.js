import{_ as n,c as a,b as i,o as e}from"./app-CAXNO6dR.js";const l={};function p(d,s){return e(),a("div",null,[...s[0]||(s[0]=[i(`<h2 id="spring基本思想" tabindex="-1"><a class="header-anchor" href="#spring基本思想"><span>Spring基本思想</span></a></h2><h3 id="控制反转-ioc" tabindex="-1"><a class="header-anchor" href="#控制反转-ioc"><span>控制反转（IoC）</span></a></h3><h4 id="问题提出" tabindex="-1"><a class="header-anchor" href="#问题提出"><span>问题提出</span></a></h4><p><strong>问题：实现方法需要调用操作对象，导致层与层之间耦合度高，如果后续需要更改操作对象，需要修改大量代码</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>//UserDao接口</span></span>
<span class="line"><span>public interface UserDao {</span></span>
<span class="line"><span>   public void getUser();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//UserDao实现类1</span></span>
<span class="line"><span>public class UserDaoImpl implements UserDao {</span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void getUser() {</span></span>
<span class="line"><span>       System.out.println(&quot;获取用户数据&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//UserDao实现类2</span></span>
<span class="line"><span>public class UserDaoMySqlImpl implements UserDao {</span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void getUser() {</span></span>
<span class="line"><span>       System.out.println(&quot;MySql获取用户数据&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>UserService调用UserDao实现类1</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>//UserService接口</span></span>
<span class="line"><span>public interface UserService {</span></span>
<span class="line"><span>   public void getUser();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//UserService实现类</span></span>
<span class="line"><span>public class UserServiceImpl implements UserService {</span></span>
<span class="line"><span>   private UserDao userDao = new UserDaoImpl();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void getUser() {</span></span>
<span class="line"><span>       userDao.getUser();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，如果UserService需要调用实现类2，则需要修改UserServiceImpl代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>public class UserServiceImpl implements UserService {</span></span>
<span class="line"><span>   private UserDao userDao = new UserDaoMySqlImpl();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void getUser() {</span></span>
<span class="line"><span>       userDao.getUser();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果后续还需要更改实现类，则需要大量的修改代码</p><h4 id="解决思路" tabindex="-1"><a class="header-anchor" href="#解决思路"><span>解决思路</span></a></h4><p><strong>UserService不直接new UserDao的实现类，改为使用set方法，之后在调用UserService时指明要使用的UserDao的实现类（IoC原型）</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>public class UserServiceImpl implements UserService {</span></span>
<span class="line"><span>   private UserDao userDao;</span></span>
<span class="line"><span>   // 利用set实现</span></span>
<span class="line"><span>   public void setUserDao(UserDao userDao) {</span></span>
<span class="line"><span>       this.userDao = userDao;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void getUser() {</span></span>
<span class="line"><span>       userDao.getUser();</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>public void test(){</span></span>
<span class="line"><span>   UserServiceImpl service = new UserServiceImpl();</span></span>
<span class="line"><span>   service.setUserDao( new UserDaoImpl() );</span></span>
<span class="line"><span>   service.getUser();</span></span>
<span class="line"><span>   //换成实现类2</span></span>
<span class="line"><span>   service.setUserDao( new UserDaoMySqlImpl() );</span></span>
<span class="line"><span>   service.getUser();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>IoC(Inversion of Control)：控制反转，将bean创建权交给第三方，代码内部不自己new bean而是找第三方，IoC是一种设计思想，DI(依赖注入)是实现IoC的一种方法</strong></p><h3 id="依赖注入-di" tabindex="-1"><a class="header-anchor" href="#依赖注入-di"><span>依赖注入（DI）</span></a></h3><p><strong>DI（Dependency Injection）：依赖注入，强调bean之间的依赖关系</strong></p><p>假设bean1内部需要bean2</p><p>原始方法：程序找第三方要bean1，再找第三方要bean2，再将bean1设置给bean1</p><p>DI思想：第三方在创建bean1的时候就创建bean2，并把bean2设置给bean1，此时程序在获取bean1的时候，bean1的内部已经包含了bean2</p><h4 id="di实现" tabindex="-1"><a class="header-anchor" href="#di实现"><span>DI实现</span></a></h4><p><img src="https://raw.githubusercontent.com/li1013/A219/main/image-20250622110214815.png" alt="image-20250622110214815"></p><p>beans.xml：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>      xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>      xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans</span></span>
<span class="line"><span>       http://www.springframework.org/schema/beans/spring-beans.xsd&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   &lt;bean id=&quot;UserDaoImpl&quot; class=&quot;com.kuang.dao.impl.UserDaoImpl&quot;/&gt;</span></span>
<span class="line"><span>   &lt;bean id=&quot;MysqlImpl&quot; class=&quot;com.kuang.dao.impl.UserDaoMySqlImpl&quot;/&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>   &lt;bean id=&quot;ServiceImpl&quot; class=&quot;com.kuang.service.impl.UserServiceImpl&quot;&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>       &lt;!--引用另外一个bean--&gt;</span></span>
<span class="line"><span>       &lt;!--name是ServiceImpl中的set方法后面的那部分,首字母小写--&gt;</span></span>
<span class="line"><span>       &lt;!--ref是被引用bean的id--&gt;</span></span>
<span class="line"><span>       &lt;property name=&quot;userDao&quot; ref=&quot;MysqlImpl&quot;/&gt;</span></span>
<span class="line"><span>   &lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用BeanFactory解析bean配置清单</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>public void test(){</span></span>
<span class="line"><span>   //创建工厂对象</span></span>
<span class="line"><span>   DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();</span></span>
<span class="line"><span>   //创建xml文件阅读器</span></span>
<span class="line"><span>   XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(beanFactory);</span></span>
<span class="line"><span>   //读取配置文件</span></span>
<span class="line"><span>   reader.loadBeanDefinitions(&quot;beans.xml&quot;);</span></span>
<span class="line"><span>   //根据id获取bean实例对象</span></span>
<span class="line"><span>   UserServiceImpl serviceImpl = (UserServiceImpl) beanFactory.getBean(&quot;ServiceImpl&quot;);</span></span>
<span class="line"><span>   serviceImpl.getUser();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用ApplicationContext解析bean配置清单</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>@Test</span></span>
<span class="line"><span>public void test(){</span></span>
<span class="line"><span>   ApplicationContext applicationContext = new ClassPathXmlApplicationContext(&quot;beans.xml&quot;);</span></span>
<span class="line"><span>   UserServiceImpl serviceImpl = (UserServiceImpl) applicationContext.getBean(&quot;ServiceImpl&quot;);</span></span>
<span class="line"><span>   serviceImpl.getUser();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="beanfactory与applicationcontex" tabindex="-1"><a class="header-anchor" href="#beanfactory与applicationcontex"><span>BeanFactory与ApplicationContex</span></a></h4><p>BeanFactory是Spring的早期接口，称为Spring的Bean工厂</p><p>ApplicationContex称为Spring容器，内部封装了BeanFactory，比BeanFactory功能更强大，开发中常用ApplicationContex</p><p>ApplicationContext在BeanFactory基础上对功能进行了扩展，例如：监听功能、国际化功能等。BeanFactory的API更偏向底层，ApplicationContext的API大多数是对这些底层API的封装 Bean创建的主要逻辑和功能都被封装在BeanFactory中，ApplicationContext不仅继承了BeanFactory，而且ApplicationContext内部还维护着BeanFactory的引用，所以，ApplicationContext与BeanFactory既有继承关系，又有融合关系。 Bean的初始化时机不同，原始BeanFactory是在首次调用getBean时才进行Bean的创建，而ApplicationContext则是配置文件加载，容器一创建就将Bean都实例化并初始化好。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>//BeanFactory初始化Bean</span></span>
<span class="line"><span>UserServiceImpl serviceImpl = (UserServiceImpl) beanFactory.getBean(&quot;ServiceImpl&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//ApplicationContex初始化Bean</span></span>
<span class="line"><span>ApplicationContext applicationContext = new ClassPathXmlApplicationContext(&quot;beans.xml&quot;);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="面向切面编程-aop" tabindex="-1"><a class="header-anchor" href="#面向切面编程-aop"><span>面向切面编程（AOP）</span></a></h3><p>问题提出：业务代码中会包含一些事务、日志等重复代码，一般被称为 横切逻辑代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>public interface UserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   public void add();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   public void delete();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   public void update();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   public void search();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>public class UserServiceImpl implements UserService{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void add() {</span></span>
<span class="line"><span>       LogService.addVLog();//添加日志</span></span>
<span class="line"><span>       System.out.println(&quot;增加用户&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void delete() {</span></span>
<span class="line"><span>       LogService.addVLog();//添加日志</span></span>
<span class="line"><span>       System.out.println(&quot;删除用户&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void update() {</span></span>
<span class="line"><span>       LogService.addVLog();//添加日志</span></span>
<span class="line"><span>       System.out.println(&quot;更新用户&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void search() {</span></span>
<span class="line"><span>       LogService.addVLog();//添加日志</span></span>
<span class="line"><span>       System.out.println(&quot;查询用户&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>思想：将横切逻辑代码与业务代码分离</p><p>业务接口和实现类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>public interface UserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   public void add();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   public void delete();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   public void update();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   public void search();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>public class UserServiceImpl implements UserService{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void add() {</span></span>
<span class="line"><span>       System.out.println(&quot;增加用户&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void delete() {</span></span>
<span class="line"><span>       System.out.println(&quot;删除用户&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void update() {</span></span>
<span class="line"><span>       System.out.println(&quot;更新用户&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   @Override</span></span>
<span class="line"><span>   public void search() {</span></span>
<span class="line"><span>       System.out.println(&quot;查询用户&quot;);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增强类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>public class DiyPointcut {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   public void before(){</span></span>
<span class="line"><span>       LogService.addVLog();//添加日志</span></span>
<span class="line"><span>  }  </span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>xml配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>&lt;!--注册bean--&gt;</span></span>
<span class="line"><span>&lt;bean id=&quot;diy&quot; class=&quot;com.kuang.config.DiyPointcut&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!--aop的配置--&gt;</span></span>
<span class="line"><span>&lt;aop:config&gt;</span></span>
<span class="line"><span>   &lt;!--使用AOP的标签实现--&gt;</span></span>
<span class="line"><span>   &lt;aop:aspect ref=&quot;diy&quot;&gt;</span></span>
<span class="line"><span>       &lt;aop:pointcut id=&quot;diyPonitcut&quot; expression=&quot;execution(* com.kuang.service.UserServiceImpl.*(..))&quot;/&gt;</span></span>
<span class="line"><span>       &lt;aop:before pointcut-ref=&quot;diyPonitcut&quot; method=&quot;before&quot;/&gt;</span></span>
<span class="line"><span>   &lt;/aop:aspect&gt;</span></span>
<span class="line"><span>&lt;/aop:config&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="补充" tabindex="-1"><a class="header-anchor" href="#补充"><span>补充</span></a></h2><h4 id="bean" tabindex="-1"><a class="header-anchor" href="#bean"><span>bean</span></a></h4><p>bean本质上是指代任何被 Spring 加载生成出来的对象</p><p>Spring官方文档定义：在 Spring 中，构成应用程序主干并由Spring IoC容器管理的对象称为bean。bean是一个由Spring IoC容器实例化、组装和管理的对象。即：</p><ul><li>bean是对象，一个或者多个不限定</li><li>bean由Spring中一个叫IoC的东西管理</li><li>我们的应用程序由一个个bean构成</li></ul><p>bean规范如下：</p><ul><li>所有属性为private</li><li>提供默认构造方法</li><li>提供getter和setter</li><li>实现serializable接口</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>import java.io.Serializable;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class User implements Serializable { // 实现序列化接口[1,7](@ref)</span></span>
<span class="line"><span>    // 1. 所有属性为 private</span></span>
<span class="line"><span>    private String name;</span></span>
<span class="line"><span>    private String email;</span></span>
<span class="line"><span>    private int age;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 2. 提供默认构造方法（无参数）[3,6,7](@ref)</span></span>
<span class="line"><span>    public User() {</span></span>
<span class="line"><span>        // 可选：初始化默认值</span></span>
<span class="line"><span>        this.name = &quot;Unknown&quot;;</span></span>
<span class="line"><span>        this.age = 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 3. 带参构造方法（非必需，但增强灵活性）[5,8](@ref)</span></span>
<span class="line"><span>    public User(String name, String email, int age) {</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>        this.email = email;</span></span>
<span class="line"><span>        this.age = age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 4. 提供 getter 和 setter 方法（命名规范：getXxx/setXxx）[1,4,7](@ref)</span></span>
<span class="line"><span>    public String getName() {</span></span>
<span class="line"><span>        return name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setName(String name) {</span></span>
<span class="line"><span>        this.name = name;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public String getEmail() {</span></span>
<span class="line"><span>        return email;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setEmail(String email) {</span></span>
<span class="line"><span>        this.email = email;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public int getAge() {</span></span>
<span class="line"><span>        return age;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void setAge(int age) {</span></span>
<span class="line"><span>        if (age &gt;= 0) { // 可选：添加业务逻辑校验</span></span>
<span class="line"><span>            this.age = age;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 可选：重写 toString() 方便调试[7](@ref)</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public String toString() {</span></span>
<span class="line"><span>        return &quot;User{name=&#39;&quot; + name + &quot;&#39;, email=&#39;&quot; + email + &quot;&#39;, age=&quot; + age + &quot;}&quot;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h4><p>https://cloud.tencent.com/developer/article/1921912</p><p>https://zhuanlan.zhihu.com/p/141204279</p><p>https://blog.csdn.net/weixin_44207403/article/details/106736102?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522a467ce3120ee5a36ac1b3794bcb51409%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&amp;request_id=a467ce3120ee5a36ac1b3794bcb51409&amp;biz_id=0&amp;utm_medium=distribute.pc_search_result.none-task-blog-2<sub>all</sub>top_positive~default-1-106736102-null-null.142<sup>v102</sup>pc_search_result_base2&amp;utm_term=spring&amp;spm=1018.2226.3001.4187</p>`,55)])])}const r=n(l,[["render",p]]),v=JSON.parse('{"path":"/article/ssldc2pf/","title":"Spring基本思想","lang":"zh-CN","frontmatter":{"title":"Spring基本思想","tags":["李新月","Spring"],"createTime":"2025/06/25 15:47:30","permalink":"/article/ssldc2pf/"},"readingTime":{"minutes":5.07,"words":1522},"git":{"updatedTime":1750842205000,"contributors":[{"name":"lixinyue","username":"lixinyue","email":"598187275@qq.com","commits":1,"avatar":"https://avatars.githubusercontent.com/lixinyue?v=4","url":"https://github.com/lixinyue"}]},"filePathRelative":"后端/Spring基本思想.md","headers":[],"categoryList":[{"id":"e778d6","sort":10002,"name":"后端"}]}');export{r as comp,v as data};
