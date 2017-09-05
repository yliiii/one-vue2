export default {
  path: 'components',
  component: () => import('pages/Components'),
  children: [
    {
      path: 'player',
      component: () => import('containers/Components/Media')
    }
  ]
}