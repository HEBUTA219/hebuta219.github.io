---
title: SSH概述以及git配置ssh方法
tags:
  - 佘甲帅
createTime: 2025/04/24 20:26:30

---



# 一、概述

### ssh是什么

> **SSH 协议本质**：SSH 协议通过加密和身份验证机制，保障数据传输安全、验证通信双方身份，用于远程登录、命令执行、文件传输等操作，是一套抽象的通信规则和格式标准 。



> **不同平台的 SSH 工具**：
>
> - **Windows：**
>   - PuTTY：经典免费开源客户端，有图形化界面，支持 SSH、Telnet 等多种协议。
>   - Git Bash：随 Git 安装，提供类 Linux 终端环境，可使用标准 SSH 命令。
>   - MobaXterm：功能强大，集成多种远程连接协议，兼具图形界面与命令行操作。
>   - 系统自带 OpenSSH：Windows 10 及以上版本自带，可通过 CMD 或 PowerShell 使用`ssh`命令连接。**CentOS：**
>
> - **OpenSSH**：linux内核系统以及windows等系统默认安装，含`sshd`（服务器守护进程）、`ssh`（客户端命令）等组件，可执行`systemctl status/start/enable sshd`管理服务。
>
> - **FileZilla**：主要为 FTP 客户端，也支持 SFTP 协议，方便图形化文件传输。
>
> - **FinalShell**：是独立开发的图形化 SSH 客户端工具，不依赖 OpenSSH，依据 SSH 协议标准开发，可与 CentOS 上的 OpenSSH 服务器通信。



> **协议与工具的关系**：
>
> SSH 协议是抽象规范，规定通信规则；SSH 工具是基于协议开发的具体软件，为用户提供操作界面或命令接口，不同平台的工具只要遵循 SSH 协议标准，就能在各平台间实现会话连接，提升系统互操作性与兼容性 。



### ssh工作流程

 ![SSH工作流程](https://raw.githubusercontent.com/she1110/typora-/master/download)

1. **连接建立**

SSH服务器在指定的端口侦听客户端的连接请求，在客户端向服务器发起连接请求后，双方建立一个TCP连接。

2. **版本协商**

SSH协议目前存在SSH1.X（SSH2.0之前的版本）和SSH2.0版本。SSH2.0协议相比SSH1.X协议来说，在结构上做了扩展，可以支持更多的认证方法和密钥交换方法，同时提高了服务能力。SSH服务器和客户端通过协商确定最终使用的SSH版本号。

3. **算法协商**

SSH支持多种加密算法，双方根据各自支持的算法，协商出最终用于产生会话密钥的密钥交换算法、用于数据信息加密的加密算法、用于进行数字签名和认证的公钥算法以及用于数据完整性保护的HMAC算法。

4. **密钥交换**

服务器和客户端通过密钥交换算法，动态生成共享的会话密钥和会话ID，建立加密通道。会话密钥主要用于后续数据传输的加密，会话ID用于在认证过程中标识该SSH连接。

5. **用户认证**

SSH客户端向服务器端发起认证请求，服务器端对客户端进行认证。SSH支持以下几种认证方式：

- 密码（password）认证：客户端通过用户名和密码的方式进行认证，将加密后的用户名和密码发送给服务器，服务器解密后与本地保存的用户名和密码进行对比，并向客户端返回认证成功或失败的消息。
- 密钥（publickey）认证：客户端通过用户名，公钥以及公钥算法等信息来与服务器进行认证。
- password-publickey认证：指用户需要同时满足密码认证和密钥认证才能登录。
- all认证：只要满足密码认证和密钥认证其中一种即可。

6. **会话请求**

认证通过后，SSH客户端向服务器端发送会话请求，请求服务器提供某种类型的服务，即请求与服务器建立相应的会话。



### ssh其他概念

1. **SSH端口号是什么**

当SSH应用于STelnet，SFTP以及SCP时，使用的默认SSH端口都是22。当SSH应用于NETCONF时，可以指定SSH端口是22或者830。SSH端口支持修改，更改后当前所有的连接都会断开，SSH[服务器](https://cloud.tencent.com/product/cvm/?from_column=20065&from=20065)开始侦听新的端口。

2. **ssh密钥是什么**

![img](https://raw.githubusercontent.com/she1110/typora-/master/249347c95b4191fc9112d2e0ca65ed3b.png)



# 二、git使用ssh密钥对

### 1. 生成密钥对



- **在任意位置打开git bash**

![image-20250424200101798](https://raw.githubusercontent.com/she1110/typora-/master/image-20250424200101798.png)

- **生成密钥对**

```shell
# 使用ssh-keygen密钥生成工具，生成默认的ssh密钥管理目录下
# -t：使用ed25519加密算法
ssh-keygen -t ed25519 -C "your_email@example.com"
```

![image-20250424201226211](https://raw.githubusercontent.com/she1110/typora-/master/image-20250424201226211.png)

![image-20250424201444755](https://raw.githubusercontent.com/she1110/typora-/master/image-20250424201444755.png)

### 2. 远程仓库添加公钥

**.pub文件中的密码是公钥，复制完添加到远程仓库指定位置即可**

![image-20250424204213406](https://raw.githubusercontent.com/she1110/typora-/master/image-20250424204213406.png)



### 3. 使用密钥对

> **当仅有一个密钥对时**，使用 Git 工具进行远程代码的推送和拉取操作时，系统会默认使用该密钥对。
>
> 然而，**当拥有多个密钥对时**，若不配置 `config` 文件，每次进行 Git 远程操作都需要手动指定要使用的密钥，操作较为繁琐。
>
> 但是，你可以手动创建 `config` 文件（该文件默认不存在），在其中为每个密钥设置别名。
>
> 之后，在本地添加远程仓库时，将仓库的别名指定为配置好的别名，这样在后续的 Git 远程操作中，就无需每次都手动指定密钥文件，操作更加便捷高效。

```shell
Host zhxy
    HostName github.com
    IdentityFile C:\Users\Administrator\.ssh\id_ed25519
    User git
    
# 接下来的不要粘贴
Host zhxy：
Host 是 SSH 配置文件中的关键字，用于定义一个主机别名。这里的 zhxy 就是你为要连接的目标主机所取的别名。通过这个别名，你可以在后续使用 ssh 命令连接主机时，直接使用 ssh zhxy，而不需要每次都输入完整的主机地址等信息，方便了操作和管理。

HostName github.com：
HostName 同样是 SSH 配置关键字，它指定了实际要连接的主机的域名或 IP 地址。在这行配置中，HostName 设置为 github.com，表示你要连接的目标主机是 GitHub 的服务器。也就是说，当你使用前面定义的别名 zhxy 进行连接时，SSH 客户端会尝试连接到 github.com 这个地址。

IdentityFile C:\Users\Administrator\.ssh\id_ed25519：
IdentityFile 用于指定 SSH 连接时使用的身份验证密钥文件的路径。这里的路径 C:\Users\Administrator\.ssh\id_ed25519 表示使用位于 Windows 系统中 Administrator 用户的 .ssh 目录下的 id_ed25519 文件作为私钥进行身份验证。id_ed25519 是基于 Ed25519 算法生成的私钥文件，与之对应的公钥文件（通常为 id_ed25519.pub）需要添加到目标主机（这里是 GitHub）的授权列表中，这样 SSH 客户端才能通过私钥验证，成功连接到服务器。

User git：
User 关键字指定了连接到目标主机时使用的用户名。在与 GitHub 服务器进行 SSH 连接时，用户名固定为 git，这是 GitHub 对 SSH 连接的要求。当你通过 SSH 协议克隆仓库、推送或拉取代码等操作时，都会使用这个 git 用户名进行身份标识。
```

- 使用密钥

```shell
# 初始化本地仓库
git init
# 关联远程仓库
git remote add zhxy git@github.com:HEBUTA219/hebuta219.github.io.git
# 使用别名拉取代码
git pull zhxy main
# 推送本地master分支到远程仓库main分支（本地默认创建master分支）
git push zhxy master:main
```

![image-20250424203727885](https://raw.githubusercontent.com/she1110/typora-/master/image-20250424203727885.png)

















