export interface NavItem {
    label: string;
    route: string;
    forAdmin: boolean;
}

// TODO: Remove forAdmin property from NavItem interface
export const NAV_ITEMS: NavItem[] = [ 
    {
        label: 'Catalog',
        route: 'catalog',
        forAdmin: false
    },
    {
        label: 'Sales',
        route: 'sales',
        forAdmin: false
    },
    {
        label: 'About',
        route: 'About',
        forAdmin: false
    },
];

export const HEADER_ITEMS = [
    {
        title: 'MonoPolytech',
        icon: 'https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600',
    }
]
