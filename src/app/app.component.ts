import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import {PoMenuItem, PoMenuModule, PoToolbarModule,} from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    PoToolbarModule,
    PoMenuModule,
    RouterOutlet
  ]
})
export class AppComponent {
  readonly menus: Array<PoMenuItem> = [
    {label: 'Home', link:'/', icon: 'po-icon-home', shortLabel: 'Home'},
    {
      label: 'Cliente',
      link: '/cliente',
      icon: 'po-icon-user',
      shortLabel: 'Cliente',
    },
  ];

  constructor(private router: Router) {
  }
}
