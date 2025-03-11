import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';
import { CompanyService, CompanyDashboard } from 'src/app/services/company.service';

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.css']
})

export class EditcompanyComponent implements OnInit {
  selectedLogo: File | null = null;
  logoBase64: string | null = null;
  editCompanyForm!: FormGroup;
  companyId!: string;
  constructor(private router: Router, private fb: FormBuilder, private cs: CompanyService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.editCompanyForm = this.fb.group({
      companyname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactperson: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      url: '',
      logo: ''

    });

    let userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    this.companyId = userRoleSettings.companyId;
    console.log('CompanyId = ', this.companyId);
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedLogo = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.logoBase64 = (reader.result as string).split(',')[1]; // Extract Base64 only
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdate() {
    console.log(this.editCompanyForm.value);
    if (this.editCompanyForm.valid) {
      //call service


      this.editCompany();
    }
    else {
      ValidateForm.validateForm(this.editCompanyForm);
    }
  }

  editCompany() {
    const formData = this.editCompanyForm.value;
    const payload = {
      Name: formData.companyname,
      Address: formData.address,
      Url: formData.url,
      ContactPerson: formData.contactperson,
      Email: formData.email,
      Mobile: formData.mobile,
      Logo: this.logoBase64, // Can be null
    };
    this.cs.editCompany(payload, this.companyId).subscribe({
      next: (response) => {
        console.log('resoonse = ', response);
        if (response == 1) {
          alert('Company updated successfully!');
        }
        else {
          console.error('Edit Company Failed:', response);
          alert('Failed to update company.');
        }
      },
      error: (err) => {
        console.error('Edit Company Failed:', err);
        alert('Failed to Update company.');
      }
    });
  }
}

