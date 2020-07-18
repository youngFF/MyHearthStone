# Maven反应堆



### 1.简介

在一个多模块的Maven项目中，反应堆（Reactor）是指所有模块组成的一个构建结构，对于单个模块的项目，反应堆就是该模块本身，但对于多模块项目来说，反应堆就包含了各模块之间继承与依赖的关系**，从而能够自动计算出合理的模块构建顺序**，但有些时候，用户想要仅仅构建完整反应堆中的某些个模块，Maven 提供很多的命令行选项支持裁剪反应堆，裁剪参数列表如下：

- -am，--also-make：同时构建所列模块的依赖模块
- -amd，-also-make-dependents：同时构建依赖于所列模块的模块
- -pl，--projects<arg>：构建指定的模块，模块间用逗号分隔
- -rf，-resume-from<arg>：在完整的反应堆构建顺序基础上指定从哪个模块开始构建



### 2.例子

某个项目的完整反应堆如下：

whole-project

​	A-module

​	B-module

​	C-module



制定构建某些模块：



mvn clean -pl B-module  // 构建B-module

mvn clean -pl B-Module  -am. //构建B-module及其依赖的模块

mvn clean -pl B-module -amd. // 构建B-module及其依赖B的模块

mvn clean -rf B-module //从反应堆B-module位置开始构建



### 3.参考资料

1. https://blog.csdn.net/casablancaagnes_3sdf/article/details/73865382