import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {MatSelectChange} from "@angular/material/select";
import {first} from "rxjs";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-control',
  templateUrl: './user-control.component.html',
  styleUrls: ['./user-control.component.scss']
})
export class UserControlComponent implements OnInit, OnDestroy{

  users: User[];
  subscription: any
  roles: string[] = ['admin', 'moderator', 'user']
  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.getAllUsers().subscribe(
      next=>{
        this.users = next.filter(u => u.username != this.authService.getAuthData().username);
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  updateUser(event: MatSelectChange, user: User) {
    user.role = event.value;
    this.userService.updateUser(user).pipe(first())
  }
}
