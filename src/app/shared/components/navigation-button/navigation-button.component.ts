import {Component, Input} from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.scss']
})
export class NavigationButtonComponent {
  @Input() title = '';
  @Input() target: string | any[] = '';

  constructor() {
    setTheme('bs4');
  }
}
