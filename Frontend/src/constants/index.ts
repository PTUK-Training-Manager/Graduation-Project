export const NAVBAR_HEIGHT = 64;
export const DRAWER_WIDTH = 240;
export const getContentPaddingLeft = (isSidebarOpen: boolean) => 24 + (isSidebarOpen ? DRAWER_WIDTH : 0);