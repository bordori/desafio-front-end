import { Component } from '@angular/core';
import {PoPageModule} from "@po-ui/ng-components";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    PoPageModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
