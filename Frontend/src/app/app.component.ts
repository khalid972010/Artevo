import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private iconSetService: IconSetService) {
    this.iconSetService.icons = { ...iconSubset };
  }

  title = 'front-end';
}
