import { Component } from '@angular/core';
import { LeftNavComponent } from "./left-nav/left-nav.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [LeftNavComponent, FooterComponent, HeaderComponent, AppComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
