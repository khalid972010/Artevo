import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FreelancerService } from '../../services/freelancer.service';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
  imageUrl?: string;
  constructor(private route:ActivatedRoute,
              private freelancerService:FreelancerService,
              private userService:UserService){}

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
  const navigation = history.state;
  this.freelancer = navigation.freelancer;
  this.imageUrl = this.freelancer.profilePicture
  this.route.params.subscribe(params => {
    this.freelancerId = params['id'];
    console.log( this.freelancerId);
        });
    this.freelancerService.getFreelancerByID(this.freelancerId).subscribe(
      (res)=>{
        this.freelancer=res.data;
      },
      (error)=>{}
    )
}

saveChanges(
  firstName: string,
  lastName: string,
  password: string,
  location: string,
  email: string,
  about: string
): void {
  console.log("hi");

 this.userService.UpdateUser({"user":{
  "_id":this.freelancerId,
  "fullName": firstName + " " + lastName,
  "password": password,
  "location": location,
  "email": email,
  "about": about
},"type":"Freelancer"}).subscribe(
  (res)=>{
    console.log(res);
  },
  (error)=>{
    console.log(error);
  }
 )


}

}
