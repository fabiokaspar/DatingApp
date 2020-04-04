import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { UserService } from 'src/app/_services/User.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
  ) { }

  ngOnInit() {
    this.loadMessagesThread();
  }

  loadMessagesThread() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(messages => {
          for (let i = 0; i < messages.length; i++) {
            if (!messages[i].isRead && messages[i].recipientId === currentUserId) {
              this.userService.markAsRead(currentUserId, messages[i].id).subscribe(
                res => {
                  console.log('marking messages as read');
                }, 
                error => console.log(error)
              );
            }
          }
        })
      )
      .subscribe(
        messages => {
        this.messages = messages;
        }, error => {
          this.alertifyService.error(error);
        }
      );
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe(
    (message: Message) => {
      // debugger;
      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
      this.alertifyService.error(error);
    });
  }

}