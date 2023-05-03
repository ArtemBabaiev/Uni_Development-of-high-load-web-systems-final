import {Component, EventEmitter, Input, Output} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {StorageKeys} from "../../../keys/storage-keys";
import {ThemeKeys} from "../../../keys/theme-keys";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>()

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService) {}

  onDarkModeSwitch({checked}: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked)
  }

  get modeStatus(){
    let savedMode: string = JSON.parse(localStorage.getItem(StorageKeys.MODE_KEY))
    return savedMode == 'theme-dark';
  }
}
