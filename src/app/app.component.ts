import { Component } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from 'stompjs';
import { myRxStompConfig } from './my-rx-stomp.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stompjs-test';

  receivedMessages: string[] = [];
  token = '';

  constructor(private rxStompService: RxStompService) { }

  connect() {
    if (!this.token) {
      alert('No token');
      return;
    }
    const headers = { Authorization: this.token };
    myRxStompConfig.connectHeaders = headers;
    this.rxStompService.configure(myRxStompConfig);
    this.rxStompService.activate();
  }

  subscribeToTopic() {
    this.rxStompService.watch('/topic/demo').subscribe((message: Message) => {
      this.receivedMessages.push(message.body);
    });
  }

  onSendMessage() {
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/topic/demo', body: message});
  }
}
