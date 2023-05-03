import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSnackbarComponent} from "../components/static-components/custom-snackbar/custom-snackbar.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  durationInSeconds = 2;
  constructor(private _snackBar: MatSnackBar) { }

  private showSnackBar(message: string, icon:string, panelClass: string[], duration: number = this.durationInSeconds){
    this._snackBar.openFromComponent(CustomSnackbarComponent, {
      data:{
        message: message,
        icon: icon
      },
      panelClass: panelClass,
      duration: duration * 1000
    })
  }

  success(message: string){
    this.showSnackBar(message, "done", ["green-snackbar"])
  }
  error(message: string){
    this.showSnackBar(message, "error_outline", ["red-snackbar"])
  }

  waring(message: string){
    this.showSnackBar(message, "warning", ["yellow-snackbar"])
  }

  info(message: string){
    this.showSnackBar(message, "info", ["blue-snackbar"])
  }
}
