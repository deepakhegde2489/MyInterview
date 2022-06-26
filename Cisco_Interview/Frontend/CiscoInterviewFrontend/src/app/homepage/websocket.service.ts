import { Injectable } from "@angular/core";
import * as Rx from "rxjs/Rx";
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Observer }  from 'rxjs/Observer';

@Injectable()
export class WebsocketService {
  constructor(private subject: Subject<MessageEvent>) {}



  public connect(url:any): Subject<MessageEvent> {
    if (this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url:any): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({'message':"hello"}));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}