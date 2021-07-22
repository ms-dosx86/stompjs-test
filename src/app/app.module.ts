import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RxStompService } from '@stomp/ng2-stompjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    RxStompService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
