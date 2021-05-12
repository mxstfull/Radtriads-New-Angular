export interface NavItem {
    displayName: string;
    // disabled: boolean;
    iconName: string;
    path: string;
    category: string;
    children?: NavItem[];
    selected?: boolean
}
