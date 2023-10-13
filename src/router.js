import { createRouter, createWebHistory } from 'vue-router';
import TeamsList from './components/teams/TeamsList';
import TeamsFooter from './components/teams/TeamsFooter';
import TeamMembers from './components/teams/TeamMembers';
import UsersList from './components/users/UsersList';
import UsersFooter from './components/users/UsersFooter';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/teams'},
    {name: 'teams', path: '/teams', components: {
        default: TeamsList, footer: TeamsFooter
      }, children: [{name: 'team-members', path: ':teamId', component: TeamMembers, props: true},]},
    {path: '/users', components: {
        default: UsersList, footer: UsersFooter
      },
      beforeEnter(to, from, next) {
        console.log(to, from)
        next()
      }},
    {path: '/:notFound(.*)', redirect: '/teams'},
  ],
  scrollBehavior(_, _2, savedPosition) {
    if(savedPosition) {
      return savedPosition
    }
    return {left: 0, top: 0}
  }
})

router.beforeEach(function(to, from, next) {
  next()
})

export default router;