import { Component } from '@angular/core';
import { over } from 'stompjs';
import * as SockJs from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stompjs-test';

  ngOnInit() {
    const sockJs = new SockJs("http://localhost:8080/ws");
    const stompClient = over(sockJs);
    
    const onConnected = () => {
      console.log("connected");
      stompClient.subscribe(
        "/user/" + 1 + "/queue/messages",
        message => console.log(message),
      );
    };
  
    const onError = (err: any) => {
      console.log(err);
    };
    
    stompClient.connect({}, onConnected, onError);
  }
}
