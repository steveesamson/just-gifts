import { useCallback } from "react"

const useScroller = () => {
    return useCallback(() => {
        const scroller = document.querySelector("#scroller");
        scroller.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);
};
export default useScroller;