import {matchPath} from "react-router";

const doesUrlMatchMenuItem = (pathName: string, windowPathname: string = window.location.pathname) =>
    matchPath(windowPathname, pathName) !== null;

export default doesUrlMatchMenuItem;