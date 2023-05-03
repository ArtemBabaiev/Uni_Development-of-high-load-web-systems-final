import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {NotificationService} from "../../../services/notification.service";
import {first} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Router} from "@angular/router";

const PASSWORD_REGEX = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$")


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService,
              private notificator: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  userName: string;
  password: string;
  loginGroup: FormGroup;
  sighUpGroup: FormGroup;

  ngOnInit() {
    this.loginGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, /*Validators.pattern(PASSWORD_REGEX)*/]],
    })

    this.sighUpGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, /*Validators.pattern(PASSWORD_REGEX)*/]],
      confirmPassword: ['', [Validators.required, /*Validators.pattern(PASSWORD_REGEX)*/]],
    },
      {validators: this.checkPassword("password", "confirmPassword")})
  }

  onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    console.log("Login page: " + this.userName);
    console.log("Login page: " + this.password);

    this.authService.login(this.userName, this.password)
      .subscribe(data => {
          console.log("Is Login Success: " + data);

          if (data) this.router.navigate(['/profile']);
        },
        error => {
          this.notificator.error(error.message)
        }
      );
  }


  onSignUp(data: any) {
    this.authService.signup(data.username, data.password).pipe(first())
      .subscribe(data => {
          if (data) this.router.navigate(['/profile/info']);
        },
        error => {
          this.notificator.error(error.message)
        }
      );
  }

  onLogin(data: any) {

    this.authService.login(data.username, data.password).pipe(first())
      .subscribe(data => {
          console.log("Is Login Success: " + data);
          if (data) this.router.navigate(['/profile/info']);
        },
        error => {
          this.notificator.error(error.message)
        }
      );
  }

  checkPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (passwordControl.value !== confirmPasswordControl.value) {

        return {valid: false}
      }
      return null;
    }
  }
}
