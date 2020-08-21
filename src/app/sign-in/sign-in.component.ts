import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VivideaServicesService } from 'src/app/vividea-services.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  submitted = false;

    constructor(private formBuilder: FormBuilder, private vividiasService : VivideaServicesService,private route: Router,) { 

      var userData = JSON.parse(localStorage.getItem('vivideas_user'))
    if(localStorage.getItem('vivideas_token')){
        if(userData.userType == 2){
          this.route.navigate(['/admin']);
        }else{
          this.route.navigate(['/customer']);
        }
    }
    }

  ngOnInit(): void {
    this.generateLoginForm();
  }

  generateLoginForm(){
    this.signInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() { return this.signInForm.controls; }
    login() {
      this.submitted = true;
        // stop here if form is invalid
        if (this.signInForm.invalid) {
            return;
        }
        this.vividiasService.loginUser(this.signInForm.value).subscribe((result:any)=>{
          localStorage.setItem('vivideas_token',result.token); 
          localStorage.setItem('vivideas_user',JSON.stringify(result.userDetails));
            if(result.userDetails.userType == 2){
              this.route.navigate(['/admin']);
            }else{
              this.route.navigate(['/customer']);
            }
        },(error)=>{
           alert("Invalid user name or password");
        })
      }

}
