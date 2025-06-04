# 抖音热搜金融分析 WebApp

本项目是一个纯前端实现的示例应用，通过调用两种外部 API 完成以下功能：

1. **抖音热搜** - 通过 [天行数据](https://www.tianapi.com/) 的接口获取抖音热搜榜单；
2. **AI 分析** - 将热搜内容提交到 [SiliconFlow](https://docs.siliconflow.cn/) 的 Chat Completions 接口，由 AI 寻找其中的金融或科技相关新闻，给出相关股票、走势预测、关联度和置信度，以及一句精炼的分析。

页面仅包含一个按钮，点击后会显示 AI 返回的分析结果。项目通过环境变量提供 API Key：

* `TIAN_API_KEY` - 天行数据的 Key
* `SILICON_API_KEY` - SiliconFlow 的 Key

首先在命令行设置上述环境变量，然后执行：

```bash
npm run build
```

该命令会生成 `config.js` 文件，随后即可在浏览器中打开 `index.html` 进行使用，或将全部文件部署到静态服务器。
