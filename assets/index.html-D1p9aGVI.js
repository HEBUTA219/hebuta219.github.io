import{_ as n,c as a,b as i,o as l}from"./app-BrZHaSrv.js";const e={};function p(d,s){return l(),a("div",null,s[0]||(s[0]=[i(`<p>制作时环境： jdk1.8 mvn nodejs18.17.0 maven git</p><p>运行时环境：Docker 、Docker Compose version v2.29.7</p><h1 id="一、制作脚本目录结构" tabindex="-1"><a class="header-anchor" href="#一、制作脚本目录结构"><span>一、制作脚本目录结构</span></a></h1><blockquote><p>当前目录用于制作安装包</p></blockquote><h3 id="_1-本地目录结构" tabindex="-1"><a class="header-anchor" href="#_1-本地目录结构"><span>1 本地目录结构</span></a></h3><p>docker # 根目录，用于存放所有与镜像制作相关的文件和子目录</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>├── minio  # 用于构建 MinIO 相关镜像的目录</span></span>
<span class="line"><span>│   ├── init_dat  # 存放 MinIO 初始化所需数据的目录</span></span>
<span class="line"><span>│   ├── Dockerfile  # 用于构建 MinIO 镜像的 Dockerfile 文件</span></span>
<span class="line"><span>│   └── init_script.sh  # MinIO 容器启动时执行的初始化脚本</span></span>
<span class="line"><span>├── mysql  # 用于构建 MySQL 相关镜像的目录</span></span>
<span class="line"><span>│   ├── database_data  # 存放 MySQL 数据库初始化数据的目录</span></span>
<span class="line"><span>│   ├── database_structure  # 存放 MySQL 数据库结构定义文件的目录</span></span>
<span class="line"><span>│   ├── Dockerfile  # 用于构建 MySQL 镜像的 Dockerfile 文件</span></span>
<span class="line"><span>│   └── init_script.sh  # MySQL 容器启动时执行的初始化脚本</span></span>
<span class="line"><span>├── nginx  # 用于构建 Nginx 相关镜像的目录</span></span>
<span class="line"><span>│   ├── conf  # 存放 Nginx 配置文件的目录</span></span>
<span class="line"><span>│   │   └── nginx.conf  # Nginx 的主配置文件</span></span>
<span class="line"><span>│   ├── ms_client  # 存放 Nginx 相关静态资源或客户端文件的目录</span></span>
<span class="line"><span>│   │   ├── atmosphere  # 可能是与 atmosphere 相关的客户端资源目录</span></span>
<span class="line"><span>│   │   ├── award  # 可能是与 award 相关的客户端资源目录</span></span>
<span class="line"><span>│   │   ├── employmentWork  # 可能是与就业工作相关的客户端资源目录</span></span>
<span class="line"><span>│   │   ├── funding  # 可能是与资金相关的客户端资源目录</span></span>
<span class="line"><span>│   │   ├── party  # 可能是与 party 相关的客户端资源目录</span></span>
<span class="line"><span>│   │   ├── portal  # 可能是门户相关的客户端资源目录</span></span>
<span class="line"><span>│   │   ├── psychology  # 可能是与心理相关的客户端资源目录</span></span>
<span class="line"><span>│   │   ├── publicService  # 可能是与公共服务相关的客户端资源目录</span></span>
<span class="line"><span>│   │   ├── security  # 可能是与安全相关的客户端资源目录</span></span>
<span class="line"><span>│   │   └── systemBackgroundManage  # 可能是系统后台管理相关的客户端资源目录</span></span>
<span class="line"><span>│   ├── build.sh  # 用于打包前端dist（也就是构建最新的ms_client文件）</span></span>
<span class="line"><span>│   └── Dockerfile  # 用于构建 Nginx 镜像的 Dockerfile 文件</span></span>
<span class="line"><span>├── server  # 用于构建服务器端应用镜像的目录</span></span>
<span class="line"><span>    ├── bin  # 存放服务器端 Java 应用程序 JAR 包的目录</span></span>
<span class="line"><span>    │   ├── atmosphere.jar  # 可能是 atmosphere 服务的 JAR 包</span></span>
<span class="line"><span>    │   ├── award.jar  # 可能是 award 服务的 JAR 包</span></span>
<span class="line"><span>    │   ├── employment.jar  # 可能是就业相关服务的 JAR 包</span></span>
<span class="line"><span>    │   ├── funding.jar  # 可能是资金相关服务的 JAR 包</span></span>
<span class="line"><span>    │   ├── party.jar  # 可能是 party 服务的 JAR 包</span></span>
<span class="line"><span>    │   ├── psychological.jar  # 可能是心理相关服务的 JAR 包</span></span>
<span class="line"><span>    │   ├── publicservice.jar  # 可能是公共服务相关的 JAR 包</span></span>
<span class="line"><span>    │   ├── security.jar  # 可能是安全相关服务的 JAR 包</span></span>
<span class="line"><span>    │   └── system.jar  # 可能是系统核心服务的 JAR 包</span></span>
<span class="line"><span>    ├── conf  # 存放服务器端 Java 应用程序配置文件的目录</span></span>
<span class="line"><span>    │   ├── application-system.yml  # 系统核心服务的配置文件</span></span>
<span class="line"><span>    │   ├── application-employment.yml  # 就业相关服务的配置文件</span></span>
<span class="line"><span>    │   ├── application-award.yml  # award 服务的配置文件</span></span>
<span class="line"><span>    │   ├── application-party.yml  # party 服务的配置文件</span></span>
<span class="line"><span>    │   ├── application-atmosphere.yml  # atmosphere 服务的配置文件</span></span>
<span class="line"><span>    │   ├── application-publicservice.yml  # 公共服务相关的配置文件</span></span>
<span class="line"><span>    │   ├── application-funding.yml  # 资金相关服务的配置文件</span></span>
<span class="line"><span>    │   ├── application-security.yml  # 安全相关服务的配置文件</span></span>
<span class="line"><span>    │   └── application-psychological.yml  # 心理相关服务的配置文件</span></span>
<span class="line"><span>    ├── build.sh  # 用于打包后端jar包（也就是构建最新的bin文件）</span></span>
<span class="line"><span>    └── Dockerfile  # 用于构建服务器端应用镜像的 Dockerfile 文件</span></span>
<span class="line"><span>├── zhxy_installer # 项目安装包</span></span>
<span class="line"><span>└── docker-compose.yml # 用于实例化所有的镜像</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​</p><h3 id="_2-容器目录结构" tabindex="-1"><a class="header-anchor" href="#_2-容器目录结构"><span>2 容器目录结构</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>/home/zhxy/</span></span>
<span class="line"><span>├── server/</span></span>
<span class="line"><span>│   ├── *.jar （如 system.jar, publicservice.jar 等）</span></span>
<span class="line"><span>│   └── conf/</span></span>
<span class="line"><span>│       ├── application-system.yml</span></span>
<span class="line"><span>│       ├── application-publicservice.yml</span></span>
<span class="line"><span>│       ├── application-award.yml</span></span>
<span class="line"><span>│       ├── application-funding.yml</span></span>
<span class="line"><span>│       ├── application-atmosphere.yml</span></span>
<span class="line"><span>│       ├── application-employment.yml</span></span>
<span class="line"><span>│       ├── application-party.yml</span></span>
<span class="line"><span>│       └── application-psychological.yml</span></span>
<span class="line"><span>├── database_init/</span></span>
<span class="line"><span>│   ├── structure/ （包含数据库结构 SQL 文件）</span></span>
<span class="line"><span>│   ├── data/ （包含数据库数据 SQL 文件）</span></span>
<span class="line"><span>│   └── init_script.sh</span></span>
<span class="line"><span>└── minio/</span></span>
<span class="line"><span>    ├── init_script.sh</span></span>
<span class="line"><span>    └── init_data/ （包含初始数据）</span></span>
<span class="line"><span>/etc/nginx/</span></span>
<span class="line"><span>├── ms_client/ （包含 ms_client 的各模块前端文件）</span></span>
<span class="line"><span>└── nginx.conf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="二、安装包使用说明" tabindex="-1"><a class="header-anchor" href="#二、安装包使用说明"><span>二、安装包使用说明</span></a></h1><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 下载安装包zhxy_installer到任意目录</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 进入zhxy_installer目录的父目录</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">cd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ..</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 给安装目录赋予权限</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">chmod</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -R</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> +x</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> zhxy_installer</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 转换各个sh文件格式以防存在windows格式乱码</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">for</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> file</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> in</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> *.sh</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> do</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> dos2unix</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">$file</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> done</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 一键安装 </span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">./install.sh</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -ip</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> IP地址</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 停止容器删除镜像</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> stop</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> $(</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> ps</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -q</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> &amp;&amp;</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> rmi</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -f</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> $(</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> images</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> -q</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12)]))}const r=n(e,[["render",p]]),t=JSON.parse('{"path":"/docs/is1hsrq4/","title":"项目打包流程与部署说明V2","lang":"zh-CN","frontmatter":{"title":"项目打包流程与部署说明V2","createTime":"2025/05/24 08:20:33","permalink":"/docs/is1hsrq4/"},"readingTime":{"minutes":3.25,"words":974},"git":{"updatedTime":1745460853000,"contributors":[{"name":"Lang","username":"Lang","email":"914551901@qq.com","commits":3,"avatar":"https://avatars.githubusercontent.com/Lang?v=4","url":"https://github.com/Lang"}]},"filePathRelative":"notes/docs/1.安装部署/2.项目打包流程与部署说明V2.md","headers":[]}');export{r as comp,t as data};
