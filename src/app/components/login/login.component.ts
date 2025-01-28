import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  error: string ="none";
  roleId: number | null = null;
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) 
  { }

  ngOnInit(): void {
    this.loginForm= this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin1(){
    if(this.loginForm.valid)
      {
        //call service
        console.log(this.loginForm.value);
        this.authService.login(this.loginForm.value).subscribe(roleDefinition => {
          if (roleDefinition) {
            // Navigate to a different route on successful login
            this.error="none";
            this.router.navigate(['organisation']); 
          } else {
            // Show an error message if login fails
            this.error="block";
            ValidateForm.validateForm(this.loginForm);
          }
        });
      }
      else {
      // Show an error message if login fails
        this.loginForm.reset();
        this.error="block";
        ValidateForm.validateForm(this.loginForm);
      }
      
  }

  onLogin(){
    if(this.loginForm.valid)
      {
        //call service
        console.log(this.loginForm.value);
       // this.authService.login(this.loginForm.value).subscribe(isAuthenticated => {
      this.authService.authenticate(this.loginForm.value).subscribe({
        next: (roleId) => {
          this.roleId = roleId;
          if (roleId === -1) {
            //  alert('An error occurred during authentication.');
            // Show an error message if login fails
            this.error = "block";
            ValidateForm.validateForm(this.loginForm);
          } else {
            console.log('RoleId:', this.roleId);
            this.error = "none";
            this.router.navigate(['organisation/' + this.roleId]);
          }

        },
        error: () => {
          this.loginForm.reset();
          this.error = "block";
          ValidateForm.validateForm(this.loginForm);
        }
      });
      }
      else {
      // Show an error message if login fails
        this.loginForm.reset();
        this.error="block";
        ValidateForm.validateForm(this.loginForm);
      }
  }
}
