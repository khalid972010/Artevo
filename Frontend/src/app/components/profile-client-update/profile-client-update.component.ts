import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { ClientService } from '../../services/client.service';
import { FileUploadService } from '../../services/file_upload.service';

@Component({
  selector: 'app-profile-client-update',
  standalone: true,
  imports: [],
  providers:[UserService,TokenService,ClientService, FileUploadService],
  templateUrl: './profile-client-update.component.html',
  styleUrl: './profile-client-update.component.css'
})
export class ProfileClientUpdate implements OnInit {
  clientId:any;
  client:any;
  fullName:string="";
  userName:string="";
  imageUrl?: string;
  coverUrl?: string;
  isLoaded?: boolean = true;
  constructor(private route:ActivatedRoute,
              private userService: UserService,
              private tokenService: TokenService,
    private ClientService: ClientService,
              private fileUploadService: FileUploadService
  ) { }

  NavigateBack() {
  window.history.back();
}


  imageLink = '';
  coverLink = '';

  handleProfileInput(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();

    reader.onload = async (e: any) => {

      // this.imageUrl = e.target.result;
      this.imageUrl = "https://i.gifer.com/YlWC.gif";
      if (this.imageUrl !== null) {
        this.imageLink = await this.fileUploadService.uploadAndSaveToDatabase(file);
        this.client.profilePicture = this.imageLink;
      }
      this.imageUrl = this.imageLink;
};
    reader.readAsDataURL(file);
  }

  handleCoverInput(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();

    reader.onload = async (e: any) => {

      this.isLoaded = false

      // this.imageUrl = e.target.result;
      this.coverUrl = "https://i.gifer.com/YlWC.gif";
      if (this.coverUrl !== null) {
        this.coverLink = await this.fileUploadService.uploadAndSaveToDatabase(file);
        this.client.coverPicture = this.coverLink;
      }

      this.coverUrl = this.coverLink;
      setTimeout(() => {
        this.isLoaded = true; // Reload the page after a small delay
    }, 2000);
};
    reader.readAsDataURL(file);
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
  var obj = {
    "_id": this.clientId,
    "fullName": firstName + " " + lastName,
    "profiePicture": this.client.profiePicture,
    "coverPicture": this.client.coverPicture,
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
