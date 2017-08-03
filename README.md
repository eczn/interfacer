> Interfacer ( ifer )

# How2Interfacer 
如何使用 Interfacer 

一些特点：

1. 只支持 Markdown 
2. 目录结构即是文档结构
3. 命令行 
4. 热重载 Livereload 

# 快速教程

1. 每一级文件就是一层标题递进
2. 文档根目录只能有一个文件： index.md 
3. 特别地，每一个文件夹的 index.md 就是入口 index.html 的源文件 

# 安装 

``` bash 
$ npm install -g interfacer 
```


# 编写配置文件 

interfacer 的启动需要配置文件的驱动：

``` js
module.exports = {
    BASE: __dirname, 
    // Absolute Location 
    docRoot: 'PATH/TO/YOUR/DOCROOT',
    // Absolute Location 
    output: 'PATH/TO/OUTPUT,
    PORT: 3322, 
    // 主页的显示文字 
    welcome: '欢迎来到',
    // 主页的title标签
    mainTitle: 'Interfacer 使用手册'
}
```



# 使用 

``` bash 
$ ifer -c <YourConfig_File>
```

然后就可以启动了。 