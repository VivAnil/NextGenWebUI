import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  companyId!:number;
  roleId!:number;
  resetForm: FormGroup;
  isSubmitted = false;
  successMessage = '';
  errorMessage = '';
  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.route.queryParams.subscribe(params => {
      this.companyId = params['companyId'];
      this.roleId = params['roleId'];
    });
  }
  

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')!.value === form.get('confirmPassword')!.value
      ? null
      : { mismatch: true };
  }
  isNewPasswordFilled(): boolean {
    const password = this.resetForm.get('newPassword')?.value?.trim();
    const confirmPassword = this.resetForm.get('confirmPassword')?.value?.trim();
    return (this.resetForm.get('newPassword')?.value?.trim() !== '') && (password == confirmPassword) && this.resetForm.get('email')?.value?.trim() !== '';
  }

  resetPassword() {
    this.isSubmitted = true;
    alert(this.resetForm.valid);
    //if (this.resetForm.valid) {
      const resetData = {
        email: this.resetForm.value.email,
        password: this.resetForm.value.newPassword,
        companyId: this.companyId,
        roelId: this.roleId
      };
     
      // Call external API to reset password
      this.callResetPasswordService(resetData);
    //}
  }
  ngOnInit(): void {
    
  }
  callResetPasswordService(data: { email: string, password: string, companyId: number, roelId: number }) {
    const apiUrl = environment.resetPasswordUrl; //'https://your-api.com/reset-password'; // Replace with actual API URL
    //alert('hi');
    this.http.post(apiUrl, data).subscribe({
      next: (response) => {
        this.successMessage = 'Password reset successful! Please login with your new password.';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Failed to reset password. Please try again.';
        this.successMessage = '';
        console.error('Error resetting password:', error);
      }
    });
  }

}
