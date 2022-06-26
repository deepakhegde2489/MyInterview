import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "./websocket.service";

const CHAT_URL = "ws://localhost:8000/live/";

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class websockservice {
  public messages: Subject<Message>;

  constructor(private wsService:WebsocketService) {

    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.result,
          message: data.result
        };
      }
    );
  }
}
