interface PropsMessage {
    style?: string[];
    className?: string[];
    timeout?: number;
    icon?: string;
    content: string;
    /**
     *
     * @param status 0: close by user cancel, 1: close by user confirm, -1: close by timeout, -2 or undefined : close unexpectedly
     * @returns
     */
    onClosed: (status: number) => void;
    beforeClose: (status: number) => boolean | Promise<boolean>;
}
interface PropsNotice extends PropsMessage {
    bottom?: boolean;
    background?: string;
    color?: string;
}
interface PropsAlert extends PropsMessage {
    text?: string;
    html?: string | HTMLElement;
    confirmLabel?: string;
    cancelLabel?: string;
}
type MsgPropsFull = Partial<PropsMessage & PropsAlert & PropsNotice>;

interface MsgType {
    open: () => void;
    close: (status: number) => Promise<void>;
    $el: HTMLElement;
}
declare const message: {
    (): void;
    config: () => void;
} | {
    (...args: (string | Partial<MsgPropsFull> | number)[]): OneMsg;
    config: (config: Partial<Config>) => void;
};

interface OneMsg extends MsgType {
    progress?: {
        pause: () => void;
        resume: () => void;
    };
    open: () => void;
}
type Config = {
    timeout: number;
} & MsgPropsFull;

declare const alert: {
    (): void;
    config: () => void;
} | {
    (...args: (string | Partial<MsgPropsFull> | number)[]): OneMsg;
    config: (config: Partial<Config>) => void;
};

declare const notice: {
    (): void;
    config: () => void;
} | {
    (...args: (string | Partial<MsgPropsFull> | number)[]): OneMsg;
    config: (config: Partial<Config>) => void;
};

export { alert, message, notice };
