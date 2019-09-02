import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/User.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() userCard: User;
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(
      data => {
        this.alertifyService.success('You have liked: '+this.userCard.knownAs);
      }, error => {
        this.alertifyService.error(error);
      }
    )
  }

}
