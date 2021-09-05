### Jenkins自动打包部署

### 准备工作

熟悉`linux`[基本操作命令](https://blog.csdn.net/tianzongnihao/article/details/80539264)

常用的命令得熟记，比如拷贝文件夹命令，删除文件命令，获取超级管理员权限命令，给文件夹设置权限命令，vi编辑、修改、保存命令...

### JumpServer部署介绍

在`jenkins`自动部署之前，先介绍一个手动的部署方式，对比`jenkins`配置，可以少很多的配置工作，直接打包拖拽到`JumpServer`对应的服务器上，优点就是快捷，少配置，只要熟悉基本文件的拷贝和删除命令就够用了，非常的灵活。缺点吗就是太灵活了，太灵活的东西如果不加以条条框框的限制，就容易出错。

- `Web终端`

> cp -r dir1 dir2 // dir1: 源目录  dir2: 目标目录

本文我们的目标目录是在`/usr/local/nginx/webServer`，即所有的打包文件都存放在`/webServer`目录文件夹下

除了`conf`文件是存放配置的目录，其它的文件夹都一一对应各个项目的打包配置，这里我们就要把对应的`test文件`拷贝到这个目录文件夹下即可。这里加了`sudo`命令，是为了防止命令行警告无权限的警告提示

```bash
cd /tmp
sudo cp -r test /usr/local/nginx/webServer
```

这样我们就把`test`顺利拷贝到目标文件目录下了。

接下来我们要做好`test`这个项目的配置文件，只是单单的把文件目录存放到`/webServer`是肯定不够的

如上图的`/conf`配置文件目录，进入到这一层级目录中，看到对应的所有的`/webServer`下面的项目的`conf`文件配置。先查看一下其中的文件配置

```bash
cat 项目名.conf
```

![](/zxz/images/projects/jenkins/1621394174390.jpg)

详细的配置介绍如上图，这里我们要新建一个`test.conf`文件，要改动的点就是图中的`端口号`，站点根目录地址`/usr/local/nginx/webServer/test`,`Nginx`服务端转发配置即可

```bash
cp -r 项目名.conf test.conf   // 拷贝项目名.conf到test.conf
vi test.conf // 进入test配置文件的编辑模式，修改配置文件信息
i           // 进入编辑环境
esc         // 修改完后退出编辑环境
:wq         // 保存退出
```
这里我们要改的就是唯一的端口号设置和对应的目录地址，Nginx服务端地址转发配置可以参考图中格式修改即可。这里还有一项服务器地址名，`192.168.14.31`。这里跟之前的开发环境对应的目录名是一一对应的，所以我们不用管这个地方
![](/zxz/images/projects/jenkins/1621394652923.jpg)

到这里所有的配置就配置完成了。可以试着用刚才的域名和端口好在浏览器直接访问下`http://192.168.14.31:9191`,结果当然是...无法访问啦

因为你修改了配置，服务器肯定要重启才行

- 重启服务器

```bash
cd /usr/local/nginx/sbin // Nginx服务器地址
ps -ef | grep nginx // 查找Nginx地址
sudo ./nginx -s reload  // Nginx服务器重启
```
重启命令后，这个时候再去访问刚才的域名就能够正确打开了，自此，手动配置服务器就完成了，是不是`so easy~`

### jenkins命令行配置

```bash
##打包后的项目名 注意=号前后不能有空格
web_name=test
##打包后的项目地址
web_path=/usr/local/nginx/webServer
##目标服务器用户名和地址
web_address=admin@192.168.x.x
##打包后的压缩项目名
web_zip=test

##删除原有包
rm -rf ${web_zip}
##安装相关依赖模块
npm install
##编译包
npm run build
##删除原来位置前端包
ansible ${web_address} -m shell -a 'rm -rf '${web_path}'/'${web_name}
ansible ${web_address} -m shell -a 'rm -rf '${web_path}'/'${web_zip}'.zip'
##推送前端包到指定目录
scp -r ${web_zip} ${web_address}:${web_path}
##修改项目权限
ansible ${web_address} -m command -a 'chmod -R 775 '${web_path}'/'${web_name}
```

好了，然后就可以直接运行构建命令了。构建过程中如果有任何错误都会显示在控制台上，我们可以从项目配置首页栏目的`构建历史模块`进入查看构建进度。只有这一栏是蓝色的小标签就证明构建成功，灰色的代表构建中途取消，红色的代表构建失败。

失败的话可以点进去查看下失败的原因解释，再做出配置里面的对应调整

![](/zxz/images/projects/jenkins/1621408819636.jpg)

![](/zxz/images/projects/jenkins/1621408863530.jpg)

完毕，收工~快拿你的新项目练练手吧。

### 最后

自从学会了自动打包部署，新项目到了提测阶段后再也不用到处求人去部署环境，去修改配置服务端Nginx代理，自己动手，丰衣足食。

最后的最后，所有的git提测分支，都是要先提交之后再构建的。



















