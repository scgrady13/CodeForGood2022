// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Live Session',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Students',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Past Sessions',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'FAQ and Blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Page404',
  //   path: '/page404',
  //   icon: icon('ic_cart'),
  // }
  
];

export default navConfig;
