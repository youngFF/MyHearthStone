# MyBatis参数绑定方式

目录：

1. [简介][1]
2. [XML参数绑定方式][2]
3. [注解参数绑定方式][3]
4. [总结][4]
5. [参考][5]



### 1.简介

本文主要记录MyBatis使用XML文件和注解进行参数绑定的两种方式，以及在开发过程中遇到的一些MyBatis语法上面遇见的问题



### 2.XML参数绑定方式

XML参数绑定方式

```java
public interface UserMapperDAO{
	//单参数绑定
  User selectOne(@Param("id")Long id);
  //多参数绑定
  User selectTne(@Parm("id")Long id,@Param("name")String name);
  //传入对象
  User selectThree(@Param("vo")UserQueryVo vo)
  
}
```



参数名称传递

```xml
<mapper namespace="....UserMapperDAO">
  <!-- 数据库查询结果和实体类字段映射关系 -->
  <resultMap id="resultMap" type="...UserVO">
  	<result column="id" jdbcType="BIGINT" property="pk"/>
    ....
  </resultMap>
  
  <select id="selectOne" resultType="...User">
  	select * from User where auto_pk = #{id}
  </select>
  
  <select id="selectTwo" resultType="...User">
  	select * from User where auto_pk = #{id} and name=#{name}
  </select>
  
  <select id="selectThree" resultType="...User">
  	select * from User where auto_pk = #{vo.id} and name= #{vo.name}
  </select>
	
</mapper>
```

索引值传递

Mapper接口方法参数从左到右从0开始

```xml
<mapper namespace="....UserMapperDAO">
  <!-- 数据库查询结果和实体类字段映射关系 -->
  <resultMap id="resultMap" type="...UserVO">
  	<result column="id" jdbcType="BIGINT" property="pk"/>
    ....
  </resultMap>
  
  <!--也可以使用resultMap将结果集映射为别的实体。单参数时可以使用parameterType==java.lang.Long
	多参数时可以省略-->
  <select id="selectOne" resultType="...User">
  	select * from User where auto_pk = #{0}
  </select>
  
  <select id="selectTwo" resultType="...User">
  	select * from User where auto_pk = #{0} and name=#{1}
  </select>
  
  <!--当传入的参数是对象时，最好不要用索引值传递的方式-->
  <select id="selectThree" resultType="...User">
  	select * from User where auto_pk = #{vo.id} and name= #{vo.name}
  </select>
	
</mapper>

```



### 3.注解参数绑定方式

```java
public interface UserMapperDAO{
	//单参数绑定
  @Select("select * from User where id=#{id}")
  User selectOne(@Param("id")Long id);
  //多参数绑定
  @Select("select * from User where id=#{id} and name=#{name}")
  User selectTne(@Parm("id")Long id,@Param("name")String name);
  //传入对象
  @Select("select * from User where id=#{vo.id} and name=#{vo.name}")
  //或者 @SelectProvider(type=UserMapperDAOProvider.calss , method="selectThree")
  User selectThree(@Param("vo")UserQueryVo vo)
  
    
    
    // 要继承SqlBuilder
    public static UserMapperDAOProvider extends SqlBuilder{
    
    	/**
    	* 返回值：string 即生成的sql语句
    	*	参数：mybatis会把接口中的注解-对应的值变成map的形式
    	*/
    	public String selectThree(Map<String,Object> params){
        UserQueryVo vo = (UserQueryVo) params.get("vo");
        BEGIN();
        SELECT("*");
        FROM("User");
        //注意：使用vo对象里面的属性时必须用下面的方式
        WHERE("id=#{vo.id}");
        //WHERE("id=" + vo.getId()) ❌错误写法，实际工程实验中会出错
        return SQL();
      }
  }
}
```



### 4.总结

1. 了解MyBatis配置的两种方式XML，注解

2. 了解MyBatis参数绑定的方式：索引值，对象，注解

3. 在Provider中的动态sql中，如果引用对象的值，不要使用WHERE("id=" + vo.getId())，而是使用WHERE("id=#{vo.id}")的方式。而使用vo.getId()是用来进行java逻辑的判断。

4. **MyBatis动态sql的string类型判空:  <  if test="x !=null and x !='' ">**

   

### 5.参考

1. https://www.cnblogs.com/suhaha/p/11794450.html
2. https://blog.csdn.net/u010159380/article/details/82255461
3. https://blog.csdn.net/qq_21046965/article/details/84993996



[1]: #1简介
[2]: #2xml参数绑定方式
[3]: 3注解参数绑定方式
[4]: #4总结
[5]: #5参考



