import { useRef } from "react";

export const useDebounce = (delay = 500) => {
    const lastChange = useRef<any>(null);

/*     function handleChange(event) {
        if (lastChange.current) {
        clearTimeout(lastChange.current)
        }

        lastChange.current = setTimeout(() => {
        lastChange.current = null
        setSearchTerm(event.target.value);
        }, 500);
    } */

    return {
        debounce: (f: Function, ...fparams) =>{
            if (lastChange.current) {
                clearTimeout(lastChange.current)
            }

            lastChange.current = setTimeout(() => {
                lastChange.current = null;
                f(...fparams);
            }, delay);
        }
    }
}