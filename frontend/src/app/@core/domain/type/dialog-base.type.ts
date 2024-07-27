import { ComponentType } from "@angular/cdk/portal";

export type DialogBase<T> = {
    title: string,
    content: DialogContent<T>,
    actions: DialogAction[]
}

export type DialogContent<T> = {
    component: ComponentType<T>
    data?: any;
}

export type DialogAction = {
    label: string,
    action: () => void,
    class?: string,
    isClose?: boolean;
}
