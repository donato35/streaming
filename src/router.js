import { createRouter, createWebHashHistory } from 'vue-router';
//import Dashboard from './components/Dashboard.vue';

const routes = [

    {
        path: '/',
        name: 'login',
        component: () => import('./AppLogin.vue'),
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('./AppHome.vue'),
        children: [
            {
                path: '/dashboard',
                name:'dashboard',
                component: () => import('./components/Dashboard.vue'),
            },
            {
                path: '/events',
                name:'events',
                component: () => import('./components/Events.vue'),
                children: [
                    {
                        path: '',
                        component: () => import('./components/eventSteps/Languages.vue'),
                    },
                    {
                        path: '/events/csPage',
                        component: () => import('./components/eventSteps/CsPage.vue'),
                    },
                    {
                        path: '/events/streamingPage',
                        component: () => import('./components/eventSteps/StreamingPage.vue'),
                    },
                    {
                        path: '/events/summary',
                        component: () => import('./components/eventSteps/Summary.vue'),
                    },
                ], 
            },
            {
                path: '/monitoring',
                name: 'monitoring',
                component: () => import('./components/Monitoring.vue'),
            },
            {
                path: '/cost',
                name: 'cost',
                component: () => import('./components/Cost.vue'),
            },
        ]
    },
   ];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
