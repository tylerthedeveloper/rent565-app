import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessage, ChatThread } from 'app/models/chat';
import { ChatService } from 'app/services/chat/chat.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  private _messages: Observable<ChatMessage[]>;
  private _chatThreads: Observable<ChatThread[]>;
  private _chatThreadIDs: string[];
  private isUserTyping: boolean;
  private activeThread: Observable<ChatThread>;

  constructor(private _chatService: ChatService) {
    this._chatThreadIDs = [];
  }

  ngOnInit() {
    this._chatThreads = this._chatService.getActiveChatThreads()
    .pipe(
      map(chatThreads => {
        // console.log(chatThreads);
        return chatThreads;
      })
    );
    // this._chatService.getActiveChatThreads().subscribe(chatThreads => {
    //   console.log(chatThreads);
    // })

  }




}
