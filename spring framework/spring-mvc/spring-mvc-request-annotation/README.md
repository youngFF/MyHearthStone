### SpringMVC注解-Annotated Controllers



目录：

1. [简介][1]
2. [SpringMVC常用注解][2]
3. [handler method arguments][3]
4. [总结][4]
5. [参考资料][5]





### 1.简介

SpringMVC provides an annotation-based programming model where @Component and @RestContrller components use annotations to express request mappings, request input, exception handling,and more.Annotated controllers have flexible method signatures and do not have to extend

### 2.springmvc常用注解

@RequestParam

@RequestParam annotations to bind servlet request parameters (**query paramters , form data**) to a method argument in a controller.（key-value. form data(表单数据)也是以key-value传输的）

type conversion is automatically applied if the target method parameter type is not `String`.

when an @RequestParam annotation declared as a `Map<String,String> or MultiValueMap<String,String>` argument, the map is populated with all request parameters.

**注意：@RequestParam适用于，请求Content-type:text/plan; 或者application/x-www.form-urlencoded。对于form表单来说，post提交会将key-value放在body体中。而get提交会将key-value放在url后面**



@RequestParam注解用来处理Content-Type: 为  application/x-www-form-urlencoded编码的内容。提交方式为get或post。（Http协议中，form的enctype属性为编码方式，常用有两种：application/x-www-form-urlencoded和multipart/form-data，默认为application/x-www-form-urlencoded）；

@RequestParam注解实质是将Request.getParameter() 中的Key-Value参数Map利用Spring的转化机制ConversionService配置，转化成参数接收对象或字段，
get方式中queryString的值，和post方式中body data的值都会被Servlet接受到并转化到Request.getParameter()参数集中，所以@RequestParam可以获取的到；

该注解有三个属性： value、required、defaultValue； value用来指定要传入值的id名称，required用来指示参数是否必录，defaultValue表示参数不传时候的默认值。



```java
@Controller
@RequestMapping(value="/user",method={HttpRequestMethod.POST,HttpRequestMethod.GET})
public class UserController{
  
 /**
  * 获取单个请求参数
  */
  @RequsetMapping(value="/getInfo")
  @ResponseBody
  public User getUser(@RequestParam("name")String name){
    // service 
    return user;
  }
}


@Controller
@RequestMapping(value="/user",method={HttpRequestMethod.POST,HttpRequestMethod.GET})
public class UserController{
  
 /**
  * 获取全部请求参数
  */
  @RequsetMapping(value="/getInfo")
  @ResponseBody
  public User getUser(@RequestParam Map<String,String> params){
    // service 
    return user;
  }
}

@Controller
@RequestMapping(value="/user",method={HttpRequestMethod.POST,HttpRequestMethod.GET})
public class UserController{
  
 /**
  * POST
  * content-type:application/x-www-urlencoded
  * form表单单数与User字段属性对应
  */
  @RequsetMapping(value="/addUser",method={RequestMethod.POST})
  @ResponseBody
  public User addUser(User user){
    // service 
    return user;
  }
}


```



@RequestBody

you can use the @RequestBody annotation to **have the request body read and deserialized info an Object** through `HttpMessageConverter`.

```java
@Controller
@RequestMapping(value="/user",method={HttpRequestMethod.POST,HttpRequestMethod.GET})
public class UserController{
  
 /**
  * 获取单个请求参数
  */
  @RequsetMapping(value="/add")
  @ResponseBody
  public HttpEntity<Boolean> addUser(@RequestBody User user){
    
    return HttpEntity.success();
  }
}
```

@RequestBody常用来处理Content-type:application/json格式的请求。

需要在pom.xml和springmvc-servlet.xml中配置

pom.xml

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-core</artifactId>
  <version>${jackson.version}</version>
</dependency>

<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>${jackson.version}</version>
</dependency>
```

springmvc-servlet.xml

```xml
<mvc:annotation-driven>
        <!-- @ResponseBody  数据集合的转换-->
        <mvc:message-converters>
            <bean class="org.springframework.http.converter.StringHttpMessageConverter"/>
            <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter"/>
        </mvc:message-converters>
    </mvc:annotation-driven>

```



@RequestHeader

获取Http请求头部信息

if the target method parameter is not `String` , type conversion is automatically applied.

```java
@GetMapping("/demo")
public void handle(@RequestHeader("Accept-Encoding")String encoding,
                  @RequestHeader("keep-Alive")Long keepAlive){
  //...
}
```

when an @RequestHeader annotation is used on a Map<String,String> , MultiValueMap<String,String>,or `HttpHeaders`,the map is populated with all header values.

Built-in support is avaliable for converting a comma-sperated string into an array or collection of strings or other types known to the type conversion system.For example, a method parameter annotated with @RequestHeader("Accept") can be of type `String` but also `String[]` or `List<String>`

```java
@GetMapping("/demo")
public void handle(@RequestHeader("Accept")String[] accpet){
  //...
}
```



@CookieValue

获取cookie值

```java
@GetMapping("/demo")
public void handle(@CookieValue("JSESSIONID")String cookie){
  //...
}
```





### 3.handler method arguments

### 4.总结

### 5.参考资料

1. https://www.cnblogs.com/haha12/p/10336363.html
2. https://blog.csdn.net/summerSunStart/article/details/78676781
3. https://blog.csdn.net/outsanding/article/details/80871769
4. https://blog.csdn.net/lch_2016/article/details/81022646





[1]: #1简介
[2]: #2springmvc常用注解
[3]: #3handler-method-arguments
[4]: #4总结
[5]: #5参考资料