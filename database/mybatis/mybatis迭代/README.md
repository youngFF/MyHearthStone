# MyBatis迭代器

目录：

1. [简介][1]
2. [MyBatis迭代的几种方式][2]
3. [总结][3]
4. [参考资料][4]





### 1.简介

MyBatis迭代器用于设置`SQL`中in的条件。即: `select * from User where pk in (...)`中in的条件。MyBatis中的迭代器格式如下：

```xml
<foreach  item="item" collection="<collectionName>" index="index"  open="(" separator="," close=")">
#{item}
</foreach>
```

collection : 用于迭代的集合名字

index：集合中的元素

index：迭代时的当前元素位置

open：开始符号

separator : 分隔符

close : 结束符号



### 2.MyBatis迭代的几种方式

参数：`java.util.Collection`   **集合类型**

```java
public List<User> getUserByIds(List<String> id);

<select id="getUserByIds" resultType="...User">
  select * from User where pk in 
  <foreach  item="item" collection="list" index="index"  open="(" separator="," close=")">
#{item}
</foreach>
</select>
```



参数：	**数组类型**

```java
public List<User> getUserByIds(String[] id);

<select id="getUserByIds" resultType="...User">
  select * from User where pk in 
  <foreach  item="item" collection="array" index="index"  open="(" separator="," close=")">
#{item}
</foreach>
</select>
```



参数：**多个**

这种情况下使用`Map`,将集合以key-value的格式放到Map中，然后在xml中获取名字即可。实际上MyBatis就是将接口中的参数以名字(@Param(""))和其对应的值放到Map中的，所以可以在xml/SelectProvider从Map中获取参数值从而达到动态SQL。 

```java
Map<String,Object> map = Maps.newHashMap("ids",Lists.newArrayList());

public void addUser(Map<String,Object) map);
  
<select id="getUserByIds" resultType="...User">
  select * from User where pk in 
  <foreach  item="item" collection="ids" index="index"  open="(" separator="," close=")">
#{item}
</foreach>
</select>
```



### 3.总结

**MyBatis对参数的包装使用Map<String,Object> ，其中key为Mybatis的参数名称，value为参数具体值。**

**这个思想很重要。**

例如：

```java
@SelectProvider(type=MyProvider.class,method="insertUser")
public void addUser(@Param("ids") List<String> ids, @Param("name")String name, @Param("age") int age);
```

其中`addUser`的方法参数会被包装为Map：{"ids":[] , "name的值": "" , "age": "age的值"}。



在SelectProvider中可以获得参数

```java
public class MyProvider extends SQLBuilder{
  
  public String insertUser(Map<String,Object> params){
    BEGIN();
    String name =(String) params.get("name");
    int age = (int)params.get("age");
    
    // 根据业务逻辑拼装SQL
    
    return SQL();
  }
}
```









### 3.参考资料

1. https://blog.csdn.net/zuihongyan518/article/details/86478222

2. https://www.cnblogs.com/yy3b2007com/p/10417242.html#autoid-0-0-0
3. https://www.bbsmax.com/A/QV5ZGEa7dy/