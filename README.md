## Pricking-node


[Pricking-node](https://github.com/Rvn0xsy/Pricking-node) 是一个基于Nodejs开发的自动化部署水坑和网页钓鱼的项目。

想要了解更多可以阅读：

- [红队技巧：基于反向代理的水坑攻击](https://payloads.online/archivers/2021-02-16/1)

:collision: :collision: :collision: 支持HTTPS/HTTP

### 快速开始

```bash
$ npm install -g express
$ npm install -g http-proxy-middleware
$ git clone https://github.com/Rvn0xsy/Pricking-node.git
$ cd Pricking-node
$ node proxy.js
```

访问：http://localhost:3000/ 就可以看到反向代理的网站了。

#### 默认值

默认值：
* 监听端口：3000
* 静态文件目录：pricking-js-suite
* 静态文件URI：/public
* 反向代理目标：https://payloads.online

#### 更改默认值

```bash
$ export HOST=https://www.example.com
$ export PORT=4000
$ export PUBLIC_URI=/public
$ export PUBLIC_DIR=pricking-js-suite
$ node proxy.js
```

访问：http://localhost:4000/ 就可以看到反向代理的网站了。

