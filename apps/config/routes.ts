/*
 * @Author: your name
 * @Date: 2021-04-01 20:53:06
 * @LastEditTime: 2021-04-08 11:28:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /DynamicModelWebsite/apps/config/routes.ts
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  // basicList
  {
    name: 'list.basic-list',
    icon: 'table',
    path: '/basiclist',
    component: './BasicList',
  },
  // singlepage
  {
    name: 'list.single-page',
    icon: 'table',
    path: '/basic-list/api/admins/*',
    component: './BasicList/components/Page',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
