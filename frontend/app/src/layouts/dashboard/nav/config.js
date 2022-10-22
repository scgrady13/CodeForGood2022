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
  }
];

export default navConfig;
