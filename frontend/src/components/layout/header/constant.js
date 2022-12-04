export const routes=[
    {
        name:"Home",
        link:"/"
    },{
        name:"About",
        link:"/about"
    },{
        name:"contact Us",
        link:"/contact"
    },{
        name:"Services",
        link:"/services",
        subroutes:[
            {
                name:"Web Development",
                link:"/services/websites"
            },{
                name:"ux/ui Design",
                link:"/services/ui-design"
            }
        ]
    },{
        name:"Blog",
        link:"/blog"
    },{
        name:"login/signUp",
        link:"/login"
    },{
        name:"Menu",
        link:"/menu",
        subroutes:[
            {
                name:"menu1",
                link:"/menu1"
            },{
                name:"menu2",
                link:"/menu2"
            }

        ]
    }

]