import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { FileUploadService } from '../../services/file_upload.service';

@Component({
  selector: 'app-profile-freelancer-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[FreelancerService,UserService, FileUploadService],
  templateUrl: './profile-freelancer-update.component.html',
  styleUrl: './profile-freelancer-update.component.css'
})
export class ProfileFreelancerUpdateComponent implements OnInit {
  freelancerId:any;
  freelancer:any;
  firstName:string="";
  userName:string="";
  imageUrl?: string;
  constructor(private route: ActivatedRoute,
    private freelancerService: FreelancerService,
    private userService: UserService,
    private tokenService: TokenService,
    private fileUploadService: FileUploadService,
  ) { }

  NavigateBack() {
  window.history.back();
}

  handleFileInput(event: any) {
      console.log("Hello");

  const file = event.target.files[0];
  const reader = new FileReader();

    reader.onload = async (e: any) => {
  this.imageUrl = e.target.result;
      if (this.imageUrl !== null) {
        let imageLink = await this.fileUploadService.uploadAndSaveToDatabase(file);
        this.freelancer.profilePicture = imageLink;
  }
};
    reader.readAsDataURL(file);
}

  ngOnInit(): void {
    this.imageUrl = this.freelancer?.profilePicture

    this.route.params.subscribe(params => {
      this.freelancerId = params['id'];

        });
    this.freelancerService.getFreelancerByID(this.freelancerId).subscribe(
      (res)=>{
        this.freelancer = res.data;

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
  console.log("hi");


  var obj = {
    "_id": this.freelancerId,
    "fullName": firstName + " " + lastName,
    "userName": userName,
    "profilePicture": this.freelancer.profilePicture,
    "password": password,
    "location": location,
    "email": email,
    "about": about
  };
 this.userService.UpdateUser({"user":obj,"type":"Freelancer"}).subscribe(
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
