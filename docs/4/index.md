## 0x00 安装Ubuntu18.04.4服务器

在[Ubuntu官方网站](https://cn.ubuntu.com)下载[Ubuntu18.04.0 live-server amd64安装镜像](http://releases.ubuntu.com/bionic/ubuntu-18.04.4-live-server-amd64.iso)，或者在[阿里云的Ubuntu镜像站](https://mirrors.aliyun.com/ubuntu-releases/HEADER.html)上[下载](https://mirrors.aliyun.com/ubuntu-releases/18.04.4/ubuntu-18.04.4-desktop-amd64.iso)。

21世纪不会真有人用光盘装系统吧。用[rufus](https://rufus.ie/)+一个U盘制作一个安装介质（rufus官网给了傻瓜式教程）。

插U盘，打开服务器电脑后进入BIOS设置，将这个安装介质U盘设置为启动盘。

进入安装界面后选择安装系统，在安装时有一些值得注意的地方：

* 如果选择安装系统时黑屏（显示器无输入），这可能是显卡驱动问题导致的。尝试选择`nomodeset`模式，对于部分N卡，加入`nomodeset`语句；A卡则加入`radeon.modeset=0`。

* 硬盘可以选择LVM模式，但是挂载`/`的卷需要选大一些；另外默认未挂载的卷需要格式化-挂载，其中挂载这一步是每次系统启动之后都需要进行的（可以写入启动脚本中）。

  ```bash
  $ lvcreate -L 36G -n test ubuntu-vg
  # 在卷组ubuntu-vg中创建一个名为test的逻辑卷
  
  $ mkfs.ext4 /dev/mapper/ubuntu--vg-test
  # 或者
  $ mkfs.ext4 /dev/ubuntu-vg/test
  # 将整个test逻辑卷格式化为ext4文件系统
  
  $ mkdir /test
  $ mount /dev/mapper/ubuntu--vg-test /test
  # 或
  $ mount /dev/ubuntu-vg/test
  # 将test挂载于/test文件夹
  ```

* 最好一开始就连接上网络，并选择软件源[https://mirror.tuna.tsinghua.edu.cn/ubuntu/](https://mirror.tuna.tsinghua.edu.cn/ubuntu/)，考虑使用github账号的ssh配置。

## 0x01 配置远程开发环境

对于本例中需要用到的开发，只需要比较简单的环境。对于Windows 10，可以使用WSL+VS Code Remote：

* 在功能中打开“适用于Linux的Windows子系统”，在应用商店中下载Ubuntu，打开Ubuntu并配置账号信息。
* 假设在LAN中服务器的IP为`192.168.xxx.xxx`，在WSL的shell中`ssh connect username@192.168.xxx.xxx`可直接连接服务器上的username用户。
* 安装VS Code的一系列Remote插件，包括Remote-SSH，Remote-WSL等，可通过VS Code来编辑文件。

## 0x02 安装CSGO游戏服务器

### 安装steamcmd

详细步骤教程在[这里](https://developer.valvesoftware.com/wiki/SteamCMD)

```shell
$ sudo dpkg --add-architecture i386
$ sudp apt-get update
$ sudo apt install lib32gcc1 steamcmd 

$ steamcmd
# 或
$ cd /usr/games
$ ./steamcmd
# 打开steam控制台
```

### 安装并启动CS: GO Dedicated Server

详细步骤在[这里](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Dedicated_Servers)

```shell
# 在steamcmd中
$ login anonynous
$ force_install_dir /files/steam/csgo
$ app_update 740 validate
$ exit

# 回到shell
$ cd /files/steam/csgo
$ ./srcds_run -tickrate 128 +map de_dust2 +game_type 0 +game_mode 1
# 启动一个128tick的地图为沙2的经典竞技模式服务器
```

### 安装SourceMod和MetaMod

[SourceMod](https://www.sourcemod.net/)和[MetaMod](https://sourcemm.net/)可用于CSGO服务器的插件开发。

```shell
$ cd /files/steam/csgo/csgo
$ wget https://mms.alliedmods.net/mmsdrop/1.10/mmsource-1.10.7-git971-linux.tar.gz
# 截至2020.02.16的最新build
$ tar -xzf mmsource-1.10.7-git971-linux.tar.gz
$ wget https://sm.alliedmods.net/smdrop/1.10/sourcemod-1.10.0-git6462-linux.tar.gz
# 截至2020.02.16的最新build
$ tar -xzf sourcemod-1.10.0-git6462-linux.tar.gz
# 安装完成后打开csgo，在csgo console中
$ meta list
```

此时应该至少显示

```
Listing 1 plugin:
    [01] SourceMod (1.1.0.2489) by AlliedModders LLC
```

输入`quit`（著名的quit）退出。完成后文件目录应该为：

```
- /files/steam/csgo
	- ... 	// 其他文件
	- csgo
		- addons
			- metamod.vdf
			- metamod
				- bin
				- metaplugins.ini
				- sourcemod.vdf
				- README.txt
			- sourcemod
				- bin
				- custom
				- extensions
				- GPLv2.txt
				- LICENSE.txt
				- plugins
				- translations
				- configs
				- data
				- gamedata
				- GPLv3.txt
				- logs
				- scripting
```

## 0x03 开发HELLO WORLD插件

```shell
$ cd /files/steam/csgo/csgo/addons/sourcemod
```

在`./scripting`文件下的新建helloworld.sp。sp是SourcePawn语言的简写，它是一门基于Pawn的SourceMod专用脚本语言。helloworld.sp如下（没有高亮'-'）

```
#include <sourcemod>
#include <sdktools>

public Plugin myinfo = {
  name = "HelloWorld",
  author = "CyrilKz",
  description = "Test Plugin",
  version = "0.0.1",
  url = "https://CyrilKz.github.io"
}

public void OnPluginStart() {
	HookEvent("player_death", Event_PlayerDeath)
}

Event_PlayerDeath(Event e, const char [] name, bool dontBroadcast) {
	ShowActivity2(0, "[Info]", "Hello World")
} 
```

对脚本进行编译，然后将编译得到的文件移动到`./plugin`文件夹下

```shell
$ ./scripting/compile.sh ./scripting/helloworld.sp
$ mv ./scripting/compiled/helloworld.smx ./plugins
```

完成后启动游戏，在每次有玩家阵亡时，服务器都会在聊天栏对所有玩家发送`Hello World`（u1s1这个确实脑瘫）。

## 0x04 技术栈选取与接下来的基本思路

采用`django` 服务器+`sqlite3`数据库，流程如下：

* 客户端发送点击创建房间请求
* 服务器使用`subprocess.Popen`启动CSGO服务端，为其分配一个房间号，这个房间号以某种方式告知CSGO服务端（作为一个cVar）并记录下进程PID
* 告知客户端房间号和CSGO服务端端口，客户端启动游戏并connect该端口
* 其他玩家可以通过房间号查询CSGO端口并加入
* 游戏结束后，CSGO服务端发送一个HTTP请求到服务器，包括自己的房间号和一些比赛数据（也许包括生成的demo文件路径）
* 服务器运行一个脚本，在一段时间后反复尝试kill掉CSGO服务端；同时在服务器中更新比赛信息，此时服务器不再处理CSGO进程（等待一段时间是为了让网络请求完成，TCP连接SOCKET正确关闭）

剩下的工作主要是：

* 完成`django`服务端搭建，网页制作
* 编写sourcemod的http插件
* 编写其他插件，丰富对战平台功能
* 处理demo问题
* 多人游戏测试