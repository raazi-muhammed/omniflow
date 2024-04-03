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
    addMessage({ roomId, data }: { roomId: string; data: FormData }) {
        this.url = new BuildUrl().communication(`/rooms/${roomId}/messages`);
        this.axiosPost(data);
        return this;
    }
}
