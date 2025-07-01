---
title: JS核心语法
tags:
  - 李思影
  - JavaScript
createTime: 2025/07/01
---
## JS核心语法

### JS引用方式

- 内部JS：用标签直接引用,一般用于与页面强相关的代码。在 HTML 文件中通过```<script></script>```标签编写代码。

- 外部JS：项目常用方式。通过```<script src="路径.js"></script>```引入 JS 文件。

- 行内JS：使用触发属性。

    ```<input name="btn" type="button" value="弹出消息框" onclick="alert('欢迎你');"/>```


### 变量与数据类型

- 变量是数据存储的容器

  - **声明方式**：```const 变量名```

    | 关键字 | 作用域 | 初始化特性 | 重声明限制 |
    |---------|--------|---------|---------|
    |var|函数作用域|可省略初始化|允许重复声明|
    |let|块级作用域|必须初始化|不允许重复声明|
    |const（常用）|块级作用域|必须初始化且不可修改|不允许重复声明

  - **变量命名规则（严格区分大小写）**

    1、首字母必须是(a-zA-Z)或者下划线_或者$（首字母尽量不要大写）

    2、其他字符可以是字母或者下划线或者数字或者$

    3、不可以用系统的关键字、保留字作为变量名

    4、多个单词—驼峰命名 stuName

- 数据类型

    | 变量声明语句 | 变量值 | 数据类型 | 说明 |
    |---------|--------|---------|---------|
    |const myNum = 10|10|number|数值类型，包括整数和浮点数|
    |const myStr = "文本"|文本|string|字符串类型，可通过 "" 或 '' 定义|
    |const myBool = true|true|boolean|布尔类型（false 同理，""，0，undefined，null都表示false）|
    |const myNull = null|null|null|用于清空变量，表示空|
    |const myUndefined|undefined|undefined|变量声明了但未赋值|

<!-- - 类型转换：

   - **隐式转换**：JS 自动转换类型（如数字 + 字符串 = 字符串拼接）

   - **显式转换**：parseInt("123")（转数字）、String(123)（转字符串）、Boolean(0)（转布尔，0/false/ 空值为 false，其余为 true） -->

### 运算符

- 运算符优先级由高到低排序：
    ![](https://raw.githubusercontent.com/Roma-code165/lisiying/main/20250701145110273.png)

    | 运算符 | 名称 | 描述 |
    |---------|--------|---------|
    |==|相等运算符|比较不同类型时，先把数据进行转换然后比较|
    |===| 全等运算符|比较过程比较严格，没有任何数据类型的相互转换|
    |!=| 不相等| 强制转换|
    |!==| 全不等| 要求严格相等运算得到的结果，然后取反|


- 隐式类型转换规则

   - **算术运算**：非数字类型转数字（如 "123"+1=124，"a"+1=NaN）

   - **比较运算**：==会触发类型转换（如 0=="0" 为 true），推荐始终使用===

   - **逻辑运算**：&&和||返回 “决定值”（如 0&&"abc" 返回 0，1||"" 返回 1）

- 自增运算符执行顺序

            js
            let a = 5;
            let b = a++; // 先赋值b=5，再a=6
            let c = ++a; // 先a=7，再赋值c=7

### 语句

- 条件语句

   - **if** 

    - **if ... else** 

    - **if ... else if ... else** 

    ```
        if(false){
            console.log('1')
        }
        else if(true){
            console.log('2')
        }
        else{
            console.log('3')
        }
    ```

    控制台输出为3

    - **switch ... case** ：用于多条件判断，比多个if更简洁

        ```
        <script>  
                comst num = 3;
                switch(num){
                    case 1:
                        console.log("aaa");
                    break;
                    case 2:
                        console.log("bbb");
                    break;
                    default:
                        console.log("ccc");
                    break;
                }
        </script>
        ```

- 循环语句

   - **for循环**：
   
        ```
             /*
             * for(初始化变量;判断条件;更新变量){
             *  ...循环体/代码块...
             * }
             * 执行顺序：
             *      1.初始化变量
             *      2.判断条件  -- 结果必须为boolean类型
             *          true  - 执行代码块，更新变量，重复第二个步骤
             *          false - 跳出整个循环
             */

            const sum;
            for （const i=1; i<=100; i++）{
                if(1%2 ！== 0){
                sum+=i;       //sum=sum+i  
                }
            }
            console log(sum);
        ```
    控制台输出为2500（1到100的奇数和）

   - **while循环**：

        ```
             /* 
             * while(表达式){
             *      ...代码块...
             * }
             * 
             */

            const i = 0;
                while (i < 10) { i++; }
        ```

   - **do...while**：

        ```
             /*
             *      do{
             *          ...代码块...
             *      }while(表达式);
             * 理解：先执行一遍代码块，再判断条件
             * 
             */
        ```

### 函数

- 常用系统函数：

    | 函数 | 描述 | 使用示例 |
    |---------|--------|---------|
    | parseInt("str")| 将字符串转换为整型数字| `parseInt("86"); // 86`|
    | parseFloat("str")| 将字符串转换为浮点型数字| `parseFloat("34.45"); // 34.45;`|
    |isNaN()| 判断值是否为NaN（非数值）| `isNaN("abc"); // true`|
    | isFinite()| 判断值是否为有限数字| `isFinite(123); // true` `isFinite(Infinity); // false`|
    | Number()| 将值转换为数字| `Number("123.45"); // 123.45`|
    |String()| 将值转换为字符串| `String(123); // "123"`|

- 自定义函数定义方式：

    - **函数声明**：

        ```
            function sum(a, b) { return a + b; }
        ```

    - **函数表达式**：

        ```
            const sum = function(a, b) {
                return a + b;
                }
        ```
        
    - **箭头函数（ES6）**：

        ```
            const sum = (a, b) => a + b;
            //参数少可省略括号，单语句可省略 return 和花括号
        ```

- 参数与返回值：

    - **形参和实参**：函数定义时的参数为形参，调用时传入的为实参。

    - **return语句**：结束函数并返回值，无 return 默认返回undefined。
    
        ```
            function getSumWithCondition(start, end, fn){
                const sun = 0
                for(const i = start; i<= end; i++>){
                    if(fn(i)){
                        sum += i
                    }
                }
                return sum;
            }

            const result = getSumWithCondition(50, 100, function (n){
                if (n % 2 !== 0){
                    return true
                }
                return false
            })

            console.log(result)
        ```

### 数组

- 数组array是一种有序的列表

    - **声明方式**：`const 数组名 = [元素1, 元素2, ...];`

- 数组的常用方法

    - **添加和删除元素**

        push()：向数组末尾添加一个或多个元素，并返回新数组的长度。

        pop()：删除数组末尾的元素，并返回被删除的元素。

        shift()：删除数组开头的元素，并返回被删除的元素。

        unshift()：向数组开头添加一个或多个元素，并返回新数组的长度。

    - **查找元素**

        indexOf()：返回指定元素在数组中的第一个索引，如果不存在则返回 -1。

        lastIndexOf()：返回指定元素在数组中的最后一个索引，如果不存在则返回 -1。

        find()（ES6 新增）：返回数组中满足条件的第一个元素。

        findIndex()（ES6 新增）：返回数组中满足条件的第一个元素的索引。

    - **遍历数组**

        forEach()：对数组中的每个元素执行一次提供的函数。

        for...of 循环：使用 for...of 语法遍历数组中的元素。

    - **数组的转换**

        toString()：将数组转换为字符串，元素之间用逗号分隔。

        join()：将数组中的所有元素连接成一个字符串，可以指定分隔符。

        slice()：返回数组的一个浅拷贝，不改变原数组。可以指定开始和结束索引。

        splice()：用于添加、删除或替换数组中的元素，会改变原数组。

        concat()：用于合并两个或多个数组，返回一个新数组，不改变原数组。

    - **数组的排序**

        sort()：对数组元素进行排序，默认按字符串的 Unicode 码位值进行排序，可以传入一个比较函数来指定排序规则。

    - **数组的归并**

        reduce()：对数组中的元素进行归并操作，返回一个单一的值。可以指定一个初始值。

        reduceRight()：与 reduce() 类似，但归并的方向是从右到左。   