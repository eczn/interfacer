> Interfacer ( ifer )

# How2Interfacer 
如何使用 Interfacer 

一些特点：

features:

1. 只支持 Markdown 
2. 目录结构即是文档结构
3. 命令行 
4. 热重载 Livereload 



1. Only Markdown For Writing 
2. doc directory structrue `map to` doc struture 
3. CLI
4. LiverReload 

# Tips 


1. the depth of directory is depth of your doc title level
2. There is ONLY file in each doc directory, His Name is `index.md` 
3. BWY，each index.md in directory will be transformed to `index.html` as the entry of the doc 



1. 目录深度即是标题级数 
2. 每一个 doc 文件夹有且仅有一个文件 叫做 `index.md`
3. 额。。每一个 `index.md` 最后会被转化成 `index.html` 作为文档入口

# Installation

``` bash 
$ npm install -g interfacer 
```


# Write The Config

ifer 的启动需要配置文件的驱动：

Run ifer with config file:

``` js
module.exports = {
    BASE: __dirname, 
    // Absolute Location 
    docRoot: 'PATH/TO/YOUR/DOCROOT',
    // Absolute Location 
    output: 'PATH/TO/OUTPUT',
    PORT: 3322, 
    // 主页的显示文字 
    welcome: '欢迎来到',
    // 主页的title标签
    mainTitle: 'Interfacer 使用手册'
}
```

# The End  

just run this: 

``` bash 
$ ifer -c <YourConfig_File>
```

and then ifer will listen `3322` ( PORT in your config.js ) 

--- 

跑了上面的代码，然后就可以启动了 (3322)。 