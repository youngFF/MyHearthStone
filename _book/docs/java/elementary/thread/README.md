# Java线程

目录：

1. [什么是线程][1]
2. [阻塞非阻塞][2]
3. [线程状态图][3]
4. [ContextClassLoader][4]
5. [参考资料][5]





### 1.什么是线程

​	我个人给出的定义：**Thread is A sequence of sorted instructions** ，即线程是一个有序指令的序列。例如：

```
																				s1<s2<s3.....<sn
```



CPU必须先执行s1指令(在代码中就是函数)，然后执行s2指令，然后一次执行。假如在执行s2指令时，例如读文件，由于目前文件不可读，所以

线程会阻塞到s2指令，因此引出阻塞和非阻塞的定义。



### 2.阻塞非阻塞

```
																				s1<s2<s3.....<sn
```

​	当CPU执行到s2的时候，由于s2指令时间过长，s2后面的指令s3-sn都不会执行，CPU会把当前线程放到等待队列中，此时s2就是阻塞的。

​	当然还有一种方法，就是将s2设置为非阻塞，执行到s2指令的时候设置s2返回结果的地址，然后执行后面s3,sn指令，然后采用轮询的方式来询问s2的结果是否ready。



### 3.线程状态图

![](1.jpg)

<center>图1 线程状态图</center>

当线程执行IO阻塞或者sleep的时候，CPU会把线程放到等待队列中，直到IO执行完成或者sleep结束。而当线程获取对象锁时，如果没有获取都对象得锁，那么线程会到对象的等待队列中，等待被notify进一步获取锁。



### 4.ContextClassLoader

Returns the context ClassLoader for this Thread. The context ClassLoader is provided by the creator of the thread for use by code running in this thread when loading classes and resources.

 If not {@linkplain #setContextClassLoader set}, the default is the  ClassLoader context of the parent Thread. The context ClassLoader of the primordial thread is typically set to the class loader used to load the application.

返回当前线程的contextClassLoader。contextClassLoader由线程创建者提供，供在此线程中运行的代码使用（加载类和资源）。如果没有调用getContextClassLoader，则默认为父线程的contextClassLoader。原始线程的contextClassLoader通常设置为用于加载应用程序的类加载器，也即AppClassLoader。



使用场景：SPI

ContextClassLoader是一种与线程相关的类加载器,类似ThreadLocal,每个线程对应一个上下文类加载器.在实际使用时一般都用下面的经典结构:

```java
ClassLoader targetClassLoader = null;// 外部参数

ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();
try {
    Thread.currentThread().setContextClassLoader(targetClassLoader);
    // TODO
} catch (Exception e) {
    e.printStackTrace();
} finally {
    Thread.currentThread().setContextClassLoader(contextClassLoader);
}
```

1. 首先获取当前线程的线程上下文类加载器并保存到方法栈,然后将外部传递的类加载器设置为当前线程上下文类加载器
2. doSomething则可以利用新设置的类加载器做一些事情
3. 最后在设置当前线程上下文类加载器为老的类加载器



解决的问题：类加载器委托模式下父加载器不能使用子加载器加载的类，如下：

```java
AppClassLoader  <---------- ExtensionClassLoader <---------------- BootStrap
```

其中AppClassLoader能使用Bootstrap加载的类，而反过来就不行。而在SPI情境下，服务实现提供商的类都是由AppClassLoader加载进来的，而SPI服务发现类是有Bootstrap类加载的，服务发现类需要使用服务提供商的类，由于Boostrap无法加载有AppClassLoader加载的类，所以就得使用ContextClassLoader来加载。






### 5.参考资料

1. https://blog.csdn.net/u013412772/article/details/80851700
2. https://www.jianshu.com/p/5d7a72427679
3. https://www.jianshu.com/p/d6ceeaafe9c5





[1]: #1什么是线程
[2]: #2阻塞非阻塞
[3]: #3线程状态图
[4]: #4contextclassloader

