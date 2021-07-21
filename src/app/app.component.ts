import { Component } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from 'stompjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stompjs-test';

  receivedMessages: string[] = [];

  constructor(private rxStompService: RxStompService) { }

  ngOnInit() {
    this.rxStompService.watch('/topic/demo').subscribe((message: Message) => {
      this.receivedMessages.push(message.body);
    });
  }

  onSendMessage() {
    const message = `Message generated at ${new Date}`;
    this.rxStompService.publish({destination: '/topic/demo', body: message});
  }
}
