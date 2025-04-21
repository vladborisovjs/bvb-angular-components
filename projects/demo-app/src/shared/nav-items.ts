export interface NavItem {
  path: string;
  label: string;
  description?: string;
}

export const NavItems: NavItem[] = [
  {
    path: '/components/tooltip',
    label: 'Tooltip',
    description: 'Displays floating content when an object is hovered.',
  },
];
