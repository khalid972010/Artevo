import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-profile-client-update',
  standalone: true,
  imports: [],
  providers:[UserService,TokenService,ClientService],
  templateUrl: './profile-client-update.component.html',
  styleUrl: './profile-client-update.component.css'
})
export class ProfileClientUpdate implements OnInit {
  clientId:any;
  client:any;
  fullName:string="";
  userName:string="";
  imageUrl?: string;
  constructor(private route:ActivatedRoute,
              private userService: UserService,
              private tokenService: TokenService,
              private ClientService:ClientService
  ) { }

  NavigateBack() {
  window.history.back();
}

handleFileInput(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e: any) => {
    this.imageUrl = e.target.result;
  };

    reader.readAsDataURL(file);
    this.client.profilePicture = this.imageUrl;
}

  ngOnInit(): void {
    this.imageUrl = this.client?.profilePicture

    this.route.params.subscribe(params => {
      this.clientId = params['id'];
      console.log(this.clientId);

        });
    this.ClientService.getByID(this.clientId).subscribe(
      (res)=>{
        this.client = res.data;
        console.log(this.client);
      },
      (error)=>{}
    )
}

saveChanges(
  firstName: string,
  lastName: string,
  userName:string,
  password: string,
  email: string,

): void {
  //console.log("hi");


  var obj = {
    "_id": this.clientId,
    "fullName": firstName + " " + lastName,
    "userName":userName,
    "password": password,
    "email": email
  };
 this.userService.UpdateUser({"user":obj,"type":"Client"}).subscribe(
  (res)=>{
    console.log(res);
  },
  (error)=>{
    console.log(error);
  }
  )

  this.tokenService.setUser(obj);

  this.NavigateBack();
  }


}
