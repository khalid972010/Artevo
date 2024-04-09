import { CommonModule } from '@angular/common';
import { Component, Input ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-profile-client',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers:[ClientService],
  templateUrl: './profile-client.component.html',
  styleUrl: './profile-client.component.css',
})
export class ProfileClientComponent  implements OnInit {
  constructor(private router: Router,
              private route:ActivatedRoute,
              private clientservice:ClientService
  ) {}
  @Input() selectedTab: string = 'orders';
  ClientID:any;
  Client:any;


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.ClientID = params['id'];
      });
      this.clientservice.getByID(this.ClientID).subscribe(
        (res) => {
          this.Client = res.data;
         // console.log(this.Client);
        },
        (error) => {
          console.error(error);
        }
      );

    }
    addPost() {
      console.log('add post method');
    }
    NavigateUpdateProfile(event: Event) {
      event.preventDefault();
      this.router.navigate(['/profile/client/update']);}
}
