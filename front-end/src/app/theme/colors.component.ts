import {
  AfterViewInit,
  Component,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Renderer2,
  forwardRef,
} from '@angular/core';
import { DOCUMENT, NgClass } from '@angular/common';

import { getStyle, rgbToHex } from '@coreui/utils';
import {
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  RowComponent,
  ColComponent,
  TableDirective,
  AvatarComponent,
} from '@coreui/angular';
import { AdminService } from '../services/admin.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  templateUrl: 'colors.component.html',
  styleUrl: 'colors.component.css',
  standalone: true,
  providers: [AdminService],
  imports: [
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    RowComponent,
    TableDirective,
    AvatarComponent,
    ColComponent,
    HttpClientModule,
    forwardRef(() => ThemeColorComponent),
    LoadingComponent,
  ],
})
export class ColorsComponent implements OnInit {
  usersdata: any;
  clientToBeDeleted = '';
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private service: AdminService
  ) {}
  getAllClients() {
    this.service.getAllClients().subscribe({
      next: (users) => {
        this.usersdata = users;
        console.log(users);
      },
    });
  }

  setDeletion(ClientID: string) {
    // Store the ClientID to be deleted
    this.clientToBeDeleted = ClientID;
  }

  confirmDeletion() {
    // This function will be called when the user confirms deletion
    if (this.clientToBeDeleted) {
      this.service.deleteClient(this.clientToBeDeleted).subscribe({
        next: () => {
          this.getAllClients();
        },
      });
    }
  }
  ngOnInit(): void {
    this.getAllClients();
  }

  ngAfterViewInit(): void {}
}

@Component({
  selector: 'app-theme-color',
  template: `
    <c-col xl="2" md="4" sm="6" xs="12" class="my-4 ms-4">
      <div [ngClass]="colorClasses" style="padding-top: 75%;"></div>
      <ng-content></ng-content>
    </c-col>
  `,
  standalone: true,
  imports: [ColComponent, NgClass],
})
export class ThemeColorComponent implements OnInit {
  @Input() color = '';
  public colorClasses = {
    'theme-color w-75 rounded mb-3': true,
  };

  @HostBinding('style.display') display = 'contents';

  ngOnInit(): void {
    this.colorClasses = {
      ...this.colorClasses,
      [`bg-${this.color}`]: !!this.color,
    };
  }
}
