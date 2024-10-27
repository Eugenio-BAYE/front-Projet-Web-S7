export interface NavItem {
    label: string;
    route: string;
    forAdmin: boolean;
}

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
    }
];

export const HEADER_ITEMS = [
    {
        title: 'Nom',
        icon: 'favicon' // Assuming 'favicon' is the icon name for the logo
    }
];
