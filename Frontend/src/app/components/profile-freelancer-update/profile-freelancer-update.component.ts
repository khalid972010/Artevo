import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { FileUploadService } from '../../services/file_upload.service';
import { LoadingComponent } from "../../loading/loading.component";

@Component({
    selector: 'app-profile-freelancer-update',
    standalone: true,
    providers: [FreelancerService, UserService, FileUploadService],
    templateUrl: './profile-freelancer-update.component.html',
    styleUrl: './profile-freelancer-update.component.css',
    imports: [ReactiveFormsModule, LoadingComponent, FormsModule]
})
export class ProfileFreelancerUpdateComponent implements OnInit {
  freelancerId:any;
  freelancer:any;
  firstName:string="";
  userName:string="";
  imageUrl?: string;
  coverUrl?: string;
  isLoaded?: boolean = true;

  constructor(private route: ActivatedRoute,
    private freelancerService: FreelancerService,
    private userService: UserService,
    private tokenService: TokenService,
    private fileUploadService: FileUploadService,
  ) { }

  NavigateBack() {
  window.history.back();
  }
  goBackAndRefresh(): void {
    window.history.back();
    setTimeout(() => {
      window.location.reload(); // Reload the page after a small delay
    }, 100); // Adjust the delay as needed
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
        this.freelancer.profilePicture = this.imageLink;
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
        this.freelancer.coverPicture = this.coverLink;
      }

      this.coverUrl = this.coverLink;
      setTimeout(() => {
        this.isLoaded = true; // Reload the page after a small delay
    }, 2000);
};
    reader.readAsDataURL(file);
}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.freelancerId = params['id'];

        });
    this.freelancerService.getFreelancerByID(this.freelancerId).subscribe(
      (res)=>{
        this.freelancer = res.data;
        this.imageUrl = this.freelancer?.profilePicture
        this.coverUrl = this.freelancer?.coverPicture

      },
      (error)=>{}
    )
}

saveChanges(
  firstName: string,
  lastName: string,
  userName:string,
  password: string,
  location: string,
  email: string,
  about: string,

): void {
  var obj = {
    "_id": this.freelancerId,
    "fullName": firstName + " " + lastName,
    "userName": userName,
    "profilePicture": this.freelancer.profilePicture,
    "coverPicture": this.freelancer.coverPicture,
    "location": location,
    "email": email,
    "about": about
  };

   if (password !== "") {
    Object.assign(obj, { "password": password });
  }

 this.userService.UpdateUser({"user":obj,"type":"Freelancer"}).subscribe(
  (res)=>{
    console.log(res);
  },
  (error)=>{
    console.log(error);
  }
  )

  this.tokenService.setUser(obj);

  this.goBackAndRefresh();
  }


}
