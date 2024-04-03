import { AxiosRequestConfig } from "axios";
import { Service } from ".";
import { BuildUrl } from "./utils";

export class ChatService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    getMessages({ roomId }: { roomId: string }) {
        this.url = new BuildUrl().communication(`/rooms/${roomId}/messages`);
        this.axiosGet();
        return this;
    }
    addMessage({ roomId, content }: { roomId: string; content: string }) {
        this.url = new BuildUrl().communication(`/rooms/${roomId}/messages`);
        this.axiosPost({ content });
        return this;
    }
}
