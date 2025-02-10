export interface ManageItem {
    label: string;
    route: string;
    isImportant: boolean;
}

// TODO: Remove forAdmin property from NavItem interface
export const MANAGE_ITEMS: ManageItem[] = [
    {
        label: 'Create Seller',
        route: 'seller/create',
        isImportant: false,
    },
    {
        label: 'Manage Seller',
        route: 'seller',
        isImportant: true,
    },
    {
        label: 'Game Deposit',
        route: 'game/deposit',
        isImportant: true,
    },
    {
        label: 'Game Sale',
        route: 'game/sale',
        isImportant: true,
    },
    {
        label: 'Manage Game',
        route: 'game/manage',
        isImportant: true,
    },
    {
        label: 'Create Buyer',
        route: 'buyer/create',
        isImportant: false,
    },
    {
        label: 'Manage Buyer',
        route: 'buyer/view',
        isImportant: true,
    },
    {
        label: 'Create Manager',
        route: 'manager/create',
        isImportant: true,
    },
    {
        label: 'Manage Manager',
        route: 'manager/manage',
        isImportant: true,
    },
    {
        label: 'Manage Users',
        route: 'users',
        isImportant: true,
    },
    {
        label: 'Create Session',
        route: 'session/create',
        isImportant: true,
    },
    {
        label: 'Manage Licenses',
        route: 'license/create',
        isImportant: true,
    },
    {
        label: 'Manage Editors',
        route: 'editor',
        isImportant: true,
    },
    {
        label: 'Manage Promotion',
        route: 'promo',
        isImportant: true,
    },
    {
        label: 'Manage Sessions',
        route: 'session',
        isImportant: true,
    },
    {
        label: 'Put for sale',
        route: 'game/stockToSale',
        isImportant: true,
    },
    {
        label: 'Manage Sales Code',
        route: 'code-promo',
        isImportant: true,
    },
    {
        label : 'Show Bilan',
        route : 'bilan',
        isImportant : true
    }

]