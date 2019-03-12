#### mac tree命令

mac下默认是没有 tree命令的，不过我们可以使用find命令模拟出tree命令的效果，如显示当前目录的 tree 的命令：

```bash
`$ find . -print | sed -e ``'s;[^/]*/;|____;g;s;____|; |;g'`
```

 

当然你也可以写一个别名来快速执行该命令，运行如下命令，将上面这个命令写到~/.bash_profile里，以后直接运行tree命令就更方便了:

```bash
`alias tree=``"find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"`
```

　　

####  也可以使用 homebrew 安装 tree 命令行：

```bash
`$ brew install tree`
```

这样就在你的mac上安装了 tree 命令行了。