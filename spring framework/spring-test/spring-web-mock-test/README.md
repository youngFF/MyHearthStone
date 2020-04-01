# Spring-mvc mock Test

**目录:**

1. [**简介**][1]
2. [**maven依赖**][2]
3. [**测试用例**][3]
4. [**QA**][4]



### 1.简介

`Spring Mock`测试框架允许用代码的方式进行http请求，从而测试`Spring mvc`的controller，service，dao的整个代码。与Postman不一样的是，Postman进行http请求时需要启动服务器。

mock测试指的是在测试环境下生成生产环境下的对象，从而进行测试。例如：在Tomcat服务器中，HttpServletRequest对象是服务器生成，需要启动服务器才能获取这个对象；然而在mock环境下可以mock所需要的HttpServletRequest对象



### 2.maven依赖

```xml
<dependency>
	<groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>4.1.13</version>
</dependency>

<dependency>
  <groupId>org.springframework</groupId>
  <artifact>spring-test</artifact>
  <version>4.1.3.RELEASE</version>
</dependency>
```



### 3.测试用例

```java
@Runwith(SpringJunit4ClassRunner.class)
// 只有WebMvc项目使用这个注解
@WebApplicationConfiguration
// 配置事务管理器，默认回滚事务，保证测试数据库数据完整性
@TransactionConfiguration(transanctionManager="txManager",defaultRollBack=true)
@Transactional
// spring配置文件位置
@ContextConfiguration(locations={"classpath:spring.xml","classpath=springmvc.xml"})
public class SpringMvcTest{
  
  protected MockMvc mock;
 
  @Autowired
  private WebApplicationContext wac;
  
  // 设置WebApplicationContext对象
  @Before
  public void setMockMvc(){
    mock = MockMvcBuilder.webAppContextSetup(wac).build();
  }
  
  /**
  *  测试目标：
  *  测试数据：
  *  测试结果：
  *
  *
  */
  @Test
  public void postTest(){
    
    // 构造post请求
    mock.perform(MockMvcRequestBuilders.post("url")
                .contentType("application/json")
                .content("json")).andDo(print(());
  }
}
```



### 4.QA

注意：

1.项目中配置了拦截器，用于拦截某个特定的用户的登录信息。

**这种情况下要在测试代码中首先(@Before)配置好拦截器要拦截的信息，直至请求能够到达Controller层**





[1]: #1简介
[2]: #2maven依赖
[3]: #3测试用例
[4]: #4qa