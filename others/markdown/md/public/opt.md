| 页面             | server                       | cookie                       | css        | js   | 图片 |
| ---------------- | ---------------------------- | ---------------------------- | ---------- | ---- | ---- |
| 减少http请求     | 使用CDN                      | 减少cookie大小               | 样式表置顶 |      |      |
| 减少DNS查询次数  | 添加Expires或者cache-control | 页面静态文件使用无cookie域名 | 避免       |      |      |
| 避免页面跳转     | Gzip压缩文件                 |                              |            |      |      |
| ajax缓存         | 配置Midfied Etag             |                              |            |      |      |
| 延迟加载         | 尽早flush输出                |                              |            |      |      |
| 提前加载         | 使用get ajax请求             |                              |            |      |      |
| 减少DOM数量      | 避免空src请求                |                              |            |      |      |
| 根据域名划分内容 |                              |                              |            |      |      |
| 减少iframe数量   |                              |                              |            |      |      |
