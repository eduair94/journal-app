import { useState, useEffect, useMemo } from "react";
import { purpleTheme } from "../theme";
const mdBreakpoint = purpleTheme.breakpoints.values.md;
export const useMobile = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    const isMobile = useMemo(() => width <= mdBreakpoint, [width]);
    return isMobile;
}