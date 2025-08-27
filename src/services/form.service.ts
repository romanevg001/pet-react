import type { ControllerFieldState } from "react-hook-form";

export function errorHandler({error}: ControllerFieldState) {
    return error?.type === 'required' && {invalid:true,tooltip: "This field required"}
}