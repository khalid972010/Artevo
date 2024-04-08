import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-profile-freelancer-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers:[FreelancerService,UserService],
  templateUrl: './profile-freelancer-update.component.html',
  styleUrl: './profile-freelancer-update.component.css'
})
export class ProfileFreelancerUpdateComponent implements OnInit {
  freelancerId:any;
  freelancer:any;
  firstName:string="";
  userName:string="";
  imageUrl?: string;
  constructor(private route:ActivatedRoute,
              private freelancerService:FreelancerService,
              private userService: UserService,
              private tokenService: TokenService
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
    this.freelancer.profilePicture = this.imageUrl;
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
    "userName":userName,
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
