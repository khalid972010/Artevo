import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fullName = '';
  userName = '';
  email = '';
  password = '';
  type = '';
  emailExists = false;
  showVerifyEmailMessage = false;


  constructor(private service: RegisterService, private router: Router) {}
  //add user
  addUser() {
    //if no data entered ..
    if (
      this.fullName == '' &&
      this.userName == '' &&
      this.email == '' &&
      this.password == '' &&
      this.type == ''
    ) {
      alert('Please fill your data');
    }
    //if user insert data ..
    else if (this.fullName.length >= 5 && this.email.includes('@')) {
      let obj = {
        fullName: this.fullName,
        userName: this.userName,
        email: this.email,
        password: this.password,
        userType: this.type,
        profilePicture: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png',
        coverPicture: 'https://www.shutterstock.com/image-illustration/picture-icon-no-image-symbol-260nw-1650135331.jpg',
      };

      //create user ..
      if (obj.userType == 'Client') {
        this.service.createClient(obj).subscribe({
          next: (data: any) => {
            if (data.responseBody['message'] == 'Mail already exists!') {
              this.emailExists = true;
            } else {
              console.log(data.statusCode);

              this.fullName = '';
              this.userName = '';
              this.email = '';
              this.password = '';
              this.type = '';
              // Show message to verify email
              this.showVerifyEmailMessage = true;
              // Optionally, you can use a setTimeout to automatically navigate after a certain time
              setTimeout(() => {
                this.router.navigate(['/login'], { replaceUrl: true });
              }, 8000); // 5000 milliseconds (5 seconds)
            }
          },
          error: (err) => {
            alert(err.error.message);
            // console.log('the error in Client Component' + error);
          },
        });
      }
      //create freelancer ..
      else if (obj.userType == 'Freelancer') {
        this.service.createFreeLancer(obj).subscribe({
          next: (data: any) => {
            if (data.responseBody['message'] == 'Email already exists!') {
              this.emailExists = true;
            } else {
              console.log(data.statusCode);
              console.log("Hello" + obj.userType);

              this.fullName = '';
              this.userName = '';
              this.email = '';
              this.password = '';
              this.type = '';
              // Show message to verify email
              this.showVerifyEmailMessage = true;
              // Optionally, you can use a setTimeout to automatically navigate after a certain time
              setTimeout(() => {
                this.router.navigate(['/login'], { replaceUrl: true });
              }, 8000); // 5000 milliseconds (5 seconds)
            }
          },
          error: (error) => {
            alert(error.message);
          },
        });
      }
    }
  }
  //navigat to home page
  navigateToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  checkPassword(): boolean{
    return (this.password!=null && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(this.password));
  }
}
