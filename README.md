# 基于MUI开发的一套模板

## 项目介绍
公司准备用MUI框架，开发一套模板，方便于未来进行二次、三次开发。本人本着绝对服从领导指示的原则，参与了模板的开发，这里把项目开源一下。<br />
该项目目前功能不是很完善(至少提交App Store被批为`无用的爱啪啪`)，后续会添加更多的功能。<br />
[戳这里](https://github.com/Jessom/MUI)查看项目源码。

## 目录结构
```
|-default                 页面资源
  |-css                   样式表
    |-css                 sass编译后的css
    |-sass                sass源码
  |-iconfont              字体图标
  |-images                图片资源
  |-js                    页面js文件
|-Public                  公共资源
  |-css                   公共css
  |-images                公共图片资源
  |-js                    公共js文件
  |-plugins               插件
|-.project                HBuilder编辑器生成文件
|-manifest.json           app配置文件
|-abotut.html             关于我们
|-detail.html             详情
|-editor.html             编辑
|-forget_password.html    找回密码
|-home.html               主页
|-index.html              入口
|-login.html              登录
|-personal.html           个人
|-preview.html            预览
|-publish.html            发布选项
|-reg.html                注册
|-release.html            发布
|-setting.html            设置
|-userinfo.html           个人信息
```

## 技术栈
1. 主要用到的就是MUI
2. 数据渲染的部分使用了vue1.0.28

## 功能
[x] 注册
[x] 登录
[x] 发布文章
[x] 浏览文章
