import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';
import { CompanyService, CompanyDashboard } from 'src/app/services/company.service';
import { MenuService } from '../../services/menu.service';

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
  companyName!: string;
  allowUpdateProject: boolean = false;
  loading: boolean = false;
  message: string = '';
  isError: boolean = false; 
  constructor(private router: Router, private fb: FormBuilder, private cs: CompanyService, private route: ActivatedRoute, private menuService: MenuService) {
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    let permissionSettings = userRoleSettings ? userRoleSettings.permissionSettings : [];
    let addNewProjectPermission = permissionSettings.filter((setting: { permissionName: string, isAssigned: boolean }) => setting.permissionName === 'Edit_Project');
    this.allowUpdateProject = addNewProjectPermission?.isAssigned ?? true;
  }
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
    this.updatePath();

    if (this.companyId) {
      this.loadCompanyData();
    }

  }
  updatePath(): void {
    console.log('updatepath');
    this.menuService.resetMenu();
    this.menuService.updateMenuItems([
      {
        title: 'User Configuration',
        links: [
        ]
      },
      {
        title: 'User Details',
        links: [
        ]
      },
      {
        title: 'Company Details',
        links: [
        ]
      },
      {
        title: 'Report Section',
        links: [
        ]
      },
      {
        title: 'Service Section',
        links: [
        ]
      },
      {
        title: 'Payment Section',
        links: [
        ]
      },
      {
        title: 'Business Section',
        links: [
          { label: 'View All Products', path: '/businessproduct' }
        ]
      },
      {
        title: 'Reports Section',
        links: [
          { label: 'LBC Reports', path: '/lbcreport' },
          { label: 'Product Reports', path: '/productreport' },
          { label: 'LBC Business Analysis', path: '/lbcba' },
          { label: 'LBC Trend Analysis', path: '/lbctrend' }
        ]
      }
    ]);
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
      this.loading = true;
      this.message = '';
      this.isError = false;
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
        this.loading = false;
        this.isError = false;
        this.message = 'Company updated successfully!';
        if (response == 1) {
          alert('Company updated successfully!');
        }
        else {
          console.error('Edit Company Failed:', response);
          this.loading = false;
          this.isError = false;
          this.message = 'Failed to update company.';
          alert('Failed to update company.');
        }
      },
      error: (err) => {
        console.error('Edit Company Failed:', err);
        this.loading = false;
        this.isError = false;
        this.message = 'Failed to update company.';
        alert('Failed to Update company.');
      }
    });
  }

  loadCompanyData(): void {
    this.loading = true;
    this.cs.getCompanyById(this.companyId).subscribe({
      next: (data) => {
        this.loading = false;
        if (data) {
          this.companyName = data.name;
          this.editCompanyForm.patchValue({
            companyname: data.name,
            url: data.url,
            email: data.email,
            contactperson: data.contactPerson,
            mobile: data.mobile,
            address: data.address
          });

          if (data.logo) {
            // this.logoPreview = `data:image/png;base64,${data.logo}`;
          }
        }
      },
      error: (err) => {
        this.loading = false;
        this.isError = true;
        this.message = 'Failed to load company data.';
        console.error('Failed to load company data', err);
      }
    });
  }
}

