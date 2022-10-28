export default  [
    {
        name:'首页',
       route:'/home'
    },
    {
        route:'/utils',
        name:'工具'
    },
    {
        route:'/file',
        name:'文件',
        children:[
            {
                route:'/file/1',
                name:'文件1'
            },
            {
                route:'/file/2',
                name:'文件2'
            },
            {
                route:'/file/3',
                name:'文件3'
            },
        ]
    }
]