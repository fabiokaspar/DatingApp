import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AdminService } from 'src/app/_services/admin.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;
  
  constructor(
    private adminService: AdminService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      console.log(error)
    })
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };

    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';

    // modal dispara evento para o pai
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {

      const rolesToUpdate = {
        roleNames: [...values.filter(e => e.checked === true).map(e => e.name)]
      };

      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error =>{
          console.log(error);
        });
      }
      console.log(rolesToUpdate);
    });
  }

  private getRolesArray(user: User) {
    const roles = [];
    const userRoles: string[] = user.roles;
    const availableRoles: any[] = [
      {name: 'Admin', value: 'Admin'},
      {name: 'Moderator', value: 'Moderator'},
      {name: 'Member', value: 'Member'},
      {name: 'VIP', value: 'VIP'}
    ];

    availableRoles.forEach(e => {
      let isMatch = false;
      if (userRoles.find(ur => e.name === ur) != undefined) {
        isMatch = true;
        e.checked = true;
        roles.push(e);
      } else {
        e.checked = false;
        roles.push(e);
      }
    });

    return roles;
  }

}
