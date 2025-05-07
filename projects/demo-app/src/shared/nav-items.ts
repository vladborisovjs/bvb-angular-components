export interface NavItem {
  path: string;
  label: string;
  img?: string;
  description?: string;
}

export const NavItems: NavItem[] = [
  {
    path: '/components/tooltip',
    label: 'Tooltip',
    img: 'assets/img/tooltip.png',
    description: 'Displays floating content when an object is hovered.',
  },
];
