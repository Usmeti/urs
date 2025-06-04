// 这些值将由 generate-config.js 根据环境变量生成的 config.js 提供
const { tianApiKey, siliconApiKey } = window.config || {};

async function fetchTrending() {
    if (!tianApiKey) throw new Error('缺少 TIAN_API_KEY');
    const url = `https://apis.tianapi.com/dytrending/index?key=${tianApiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('无法获取抖音热搜');
    const data = await res.json();
    return data.newslist.map(item => item.hotword || item.title || item.keyword);
}

async function analyzeTopics(topics) {
    if (!siliconApiKey) throw new Error('缺少 SILICON_API_KEY');
    const messages = [
        {
            role: 'system',
            content: '你是一名专业的金融 AI agent，能够根据抖音热搜内容找出与金融或科技相关的新闻，并给出相关股票的看涨看跌、关联度、置信度和一句犀利分析，回答使用简体中文。返回 JSON 数组。'
        },
        { role: 'user', content: JSON.stringify(topics) }
    ];

    const res = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${siliconApiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages
        })
    });

    if (!res.ok) throw new Error('分析接口调用失败');
    const data = await res.json();
    return data.choices[0].message.content.trim();
}

document.getElementById('load-btn').addEventListener('click', async () => {
    const resultEl = document.getElementById('result');
    resultEl.textContent = '加载中...';
    try {
        const topics = await fetchTrending();
        const analysis = await analyzeTopics(topics);
        resultEl.textContent = analysis;
    } catch (err) {
        resultEl.textContent = err.message;
    }
});
