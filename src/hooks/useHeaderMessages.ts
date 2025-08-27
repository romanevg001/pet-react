import type { MessagesMessage } from "primereact/messages";

export interface IMessagesMessage {
   severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined;
   summary?: React.ReactNode;
   detail: React.ReactNode;
}

export interface IUseHeaderMessages {
    addMessage: (m: IMessagesMessage) => void;
    clearMessages: () => void;
}

export const useHeaderMessages = (): IUseHeaderMessages =>{
    const mes: MessagesMessage[] = [];

    const addMessage = (m: IMessagesMessage) => {
        if(!useHeaderMessages['msgs'].current) return;
        mes.push({ ...m,  summary: (m.summary ? m.summary : m.severity?.toUpperCase()), sticky: true, closable: false });
        setTimeout(()=>{mes.splice(mes.length - 1,1)},15000);
        useHeaderMessages['msgs'].current?.show(m);
    };

    const clearMessages = () => {
        if(!useHeaderMessages['msgs'].current) return;
        useHeaderMessages['msgs'].current?.clear();
    };

    return {
        addMessage,
        clearMessages,
        
    }
};