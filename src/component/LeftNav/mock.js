export default [
    {
        name: '首页',
        route: '/home'
    },
    {
        route: '/constanter',
        name: '个人中心'
    },
    {
        route: '/joinin',
        name: '报名参赛'
    },
    {
        route: '/examine',
        name: '审核',
        children: [
            {
                route: '/examine/account',
                name: '账号审核'
            },
            {
                route: '/examine/work',
                name: '作品审核'
            },
        ]
    },
    {
        route: '/trackMsg',
        name: '赛道管理'
    }
]