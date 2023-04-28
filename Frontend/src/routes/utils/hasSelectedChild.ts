import {IAppMenuItem} from "src/routes/types";

/**
 * Recursively checks if a menu item has an active (selected) child item
 */
const hasSelectedChild = (menuItem: IAppMenuItem) => {
    if (!menuItem.items) return false;

    for (const child of menuItem.items) {
        if (child.link === window.location.pathname) return true;
        if (child.items && hasSelectedChild(child)) return true;
    }

    return false;
}

export default hasSelectedChild;