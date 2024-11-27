import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: any = [];
  isLoading: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit() {
    this.isLoading = true;
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.isLoading = false;
    });
  }

  resetUser(userId: string): void {
    this.userService.resetPassword(userId);
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId);
  }

}
