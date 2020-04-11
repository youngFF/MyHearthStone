# SpringMVC拦截器

目录：

1. [简介][1]
2. [HandlerInterceptor和WebRequestHandler接口][2]
3. [拦截器处理逻辑][3]
4. [多个拦截器处理流程][4]
5. [Spring和SpringBoot配置拦截器方式][5]
6. [参考资料][6]



### 1.简介

SpringMVC拦截器(Interceptor)用于实现对每一个请求前后进行相关的业务处理。SpringMVC中的拦截器是通过`HandlerInterceptor`来实现的。在Spring中定义拦截器方式。

1. 实现Spring的`HandlerInterceptor`接口
2. 集成实现



