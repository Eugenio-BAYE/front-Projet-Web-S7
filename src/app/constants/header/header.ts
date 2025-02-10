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
        label: 'About',
        route: 'about',
        forAdmin: false
    },
];

export const HEADER_ITEMS = [
    {
        title: 'MonoPolytech',
        icon: 'https://cdn.icon-icons.com/icons2/41/PNG/128/monopolygame_monopolio_6962.png',
    }
]
