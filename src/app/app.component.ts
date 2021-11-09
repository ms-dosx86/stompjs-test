import {Component} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from 'stompjs';
import {myRxStompConfig} from './my-rx-stomp.config';
import {v4} from "uuid";


const message = {
  type: 'ALL_NOTIFCATIONS',
  body: [{}, {}]
};

const message2 = {
  type: 'NOTIFCATIONS',
  body: {

  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stompjs-test';

  receivedMessages: string[] = [];
  token = '';

  constructor(private rxStompService: RxStompService) {
  }

  connect() {
    if (!this.token) {
      alert('No token');
      return;
    }
    const token1 = 'bearer ' + this.token
    const headers = {Authorization: token1};
    myRxStompConfig.connectHeaders = headers;
    this.rxStompService.configure(myRxStompConfig);
    this.rxStompService.activate();
  }

  onUpload(files: File[]) {
    // var reader = new FileReader();
    // reader.onload = (e) => {
    //   let rawData = e.target!.result as any;
    //   // отправить rawData
    //   rawData = new Uint8Array(rawData);
    //   rawData = Array.from(rawData);
    //   console.log(rawData);
    //   let rawDataStr = JSON.stringify(rawData);
    //   console.log(rawDataStr);
    //   this.rxStompService.publish({
    //     destination: '/send-file', body: rawDataStr,  headers: {'content-type': 'application/octet-stream'}
    //   });
    // }
    // reader.readAsArrayBuffer(file);

    // const encoder = new TextEncoder();
    // const encoded = encoder.encode('Kkek');
    //
    // const data = new FormData();
    // data.set("file", file);
    // this.rxStompService.publish({destination: '/send-file', body: JSON.stringify(data)});
    // this.rxStompService.publish({destination: '/send-file', body: JSON.stringify(data)});

    // const reader = new FileReader();
    // let data = null;
    // reader.onload = () => {
    //   data = reader.result as string;
    //   // console.log(data);
    //   console.log(JSON.stringify(data));
    //   this.rxStompService.publish({destination: '/send-file', body: JSON.stringify({
    //       foo: "bar",
    //       data
    //     })});
    // };
    // reader.readAsDataURL(file);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.set(`file_${i}`, files[i]);
    }
    // Отправить formData через http ручку.
  }

  subscribeToTopic() {

    this.rxStompService.watch('/topic/notifications.new.userId.0').subscribe((message: Message) => {
      this.receivedMessages.push(JSON.parse(message.body));
    });
  }

  subscribeToTopic2() {
    this.rxStompService.watch('/topic/messengers.whatsapp.message.userId.0').subscribe((message: Message) => {
      this.receivedMessages.push(JSON.parse(message.body));
    });
  }

  subscribeToTopic3() {
    this.rxStompService.watch('/topic/messengers.whatsapp.message.partnerId.1').subscribe((message: Message) => {
      this.receivedMessages.push(JSON.parse(message.body));
    });
  }

  subscribeToTopic4() {
    this.rxStompService.watch('/topic/messengers.whatsapp.newChat.userId.0').subscribe((message: Message) => {
      this.receivedMessages.push(JSON.parse(message.body));
    });
  }

  subscribeToTopic5() {
    this.rxStompService.watch('/topic/messengers.whatsapp.status.userId.0').subscribe((message: Message) => {
      this.receivedMessages.push(JSON.parse(message.body));
    });
  }

  subscribeToTopic6() {
    this.rxStompService.watch('/topic/messengers.whatsapp.deleteChat.userId.0').subscribe((message: Message) => {
      this.receivedMessages.push(JSON.parse(message.body));
    });
  }

  onSendMessage() {
    // const message = `Message generated at ${new Date}`;
    const message = {
      "chatId": "79522033496",
      "channelId": "730",
      "channel": "whatsappb",
      "text": "пример ответа"
    }
    const message2 = {
      "chatId": 1,
      "body": ",,mngfghfghh",
      "userId": 0,
      "remoteAddress": "tel:+7952203349676",
      "messengerType": "whatsappb",
    }
    let s = JSON.stringify(message2);
    this.rxStompService.publish({destination: '/send-message', body: s});
  }

  onSendMessage2() {
    // const message = `Message generated at ${new Date}`;
    const message2 = {
      "chatId": 2,
      "messagesIds": [
        1275
      ]
    }
    let s = JSON.stringify(message2);
    this.rxStompService.publish({destination: '/mark-messages-as-read', body: s});
  }
}
