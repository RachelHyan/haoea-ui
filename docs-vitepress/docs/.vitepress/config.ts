export default {
    title: 'Haoea',
    lastUpdated: true,
    themeConfig: {
        lastUpdatedText: '最后更新时间',
        nav: [
            { text: '指南', link: '/guide/installation' },
            { text: '组件', link: '/components/button' },
        ],
        socialLinks:[{
            icon: 'github',
            link: 'https://github.com/RachelHyan/haoea-ui'
        }],
        sidebar: [
            {
                text: '指南',
                items: [
                    { text: '安装', link: '/guide/installation' },
                ]
            },
            {
                text: '组件',
                items: [
                    { text: 'Button 按钮', link: '/components/button' },
                    { text: 'Icon 图标', link: '/components/icon' },
                ]
            }
        ]
    },
}