export interface ManageItem {
    label: string;
    route: string;
    isImportant: boolean;
}

// TODO: Remove forAdmin property from NavItem interface
export const MANAGE_ITEMS: ManageItem[] = [
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
        label: 'Create Buyer',
        route: 'buyer/create',
        isImportant: false,
    },
    {
        label: 'Create Manager',
        route: 'manager/create',
        isImportant: true,
    },
    {
        label: 'Create Session',
        route: 'session/create',
        isImportant: true,
    },
    {
        label: 'Create License',
        route: 'license/create',
        isImportant: true,
    },
    {
        label: 'Put games for sale',
        route: 'game/stockToSale',
        isImportant: true,
    },
    {
        label: 'Create Sales Code',
        route: 'code-promo',
        isImportant: true,
    },
    {
        label : 'Show Current Session Stats',
        route : 'bilan',
        isImportant : true
    }

]