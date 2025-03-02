import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';
import { CompanyService, CompanyDashboard } from 'src/app/services/company.service';  


@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit, AfterViewInit {
  companies: CompanyDashboard[] = [];
  stats:any;
  roleId!: number;
  public chartType: ChartType = 'bar';  // Default chart type
  isDialogOpen: boolean = false;
  isProfileOpen: boolean=false;
  displayProfile: string='none';
  passwordError: string='none';
  email:string ='abc@defindia.org';
  companyForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) {
  }
  
  
  // // Hardcoded labels and data  
  public chartData: ChartConfiguration['data']   = {
    labels: ['Projects', 'Project Officers', 'District Coordinators', 'Block Coordinators', 'SoochnaPreneurs', 'States', 'Services'], // Hardcoded labels
    datasets: [
      {
        data: [36, 31, 7, 7, 50, 3, 10], label: 'Total Projects',
        backgroundColor: [   // Different colors for each bar
          '#5580B9',
          '#B85750',
          '#A0BA61',
          '#4EBCAB',
          '#7C659E',
          '#5BAAC3',
          '#EF9B51'
        ],
      },  // Example dataset
      // { data: [120, 180, 140, 190, 170, 110], label: 'Sales 2022' }   // Example dataset for comparison
    ]
  };
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0  // Ensure minimum value starts from 0
      }
    },
    plugins: {
      // title: {
      //   display: true,
      //   text: 'Sales Data 2023',
      //   position: 'bottom'  // Title at the bottom
      // },
      legend: {
        display: false,
        position: 'bottom'  // Legend (dataset label) at the bottom
      }
    }
  };
  // Chart types available in dropdown
  chartTypes: { label: string, value: ChartType }[] = [
    { label: 'Column Chart', value: 'bar' },
    { label: 'Line Chart', value: 'line' },
    { label: 'Pie Chart', value: 'pie' },
    { label: 'Doughnut Chart', value: 'doughnut' }

  ];
 

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roleId = +params['roleid'];
     
    });
    this.companyForm= this.fb.group({
      companyname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactperson: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
    
    this.companyService.getCompanyStatistics().subscribe((data) => {
      this.companies = data;
      //this.createCharts();
    });
  }
  createCharts(): void {
    this.companies.forEach((company) => {
      var chartId=`chart-${company.companyId}`;
      const ctx = document.getElementById(
        `chart-${company.companyId}`
      ) as HTMLCanvasElement;

      new Chart(ctx, {
        type: 'bar',
       // data:this.chartData,
        data: {
          labels: ['Projects', 'Project Managers', 'District Coordinators', 'Block Coordinators','Suchanapreneurs', 'States', 'Services'],
          datasets: [
            {
              label: company.companyName,
              data: [
                company.projects,
                company.projectManagers,
                company.districtCoordinator,
                company.blockCoordinator,
                company.soochnapreneur,
                company.states,
                company.services,
              ],
              backgroundColor: [
                '#5580B9',
                '#B85750',
                '#A0BA61',
                '#4EBCAB',
                '#7C659E',
                '#5BAAC3',
                '#EF9B51'
              ],
              borderColor: [
                '#5580B9',
                '#B85750',
                '#A0BA61',
                '#4EBCAB',
                '#7C659E',
                '#5BAAC3',
                '#EF9B51'
              ],
              borderWidth: 1,
            },
          ],
        },
        options:this.chartOptions,
        // options: {
        //   scales: {
        //     y: {
        //       beginAtZero: true,
        //     },
        //   },
          
        // },
      });
    });

  }
 
  changeChartType(chartType: string): void {
    const selectedChartType = chartType as ChartType
    this.chartType = selectedChartType;
  }


  ngAfterViewInit(): void {
    setTimeout(() => this.createCharts(), 1000); // Ensure charts are created after DOM is updated
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  openProfile() {
    this.isProfileOpen = !this.isProfileOpen;
    if(this.displayProfile=='none') this.displayProfile='block';
    else this.displayProfile='none';
  }
  logout(){
    this.router.navigate(['login']);
  }

  onUpdate() {
    console.log(this.companyForm.value);
    if (this.companyForm.valid) {
      var pass = this.companyForm.controls['password'].value;
      var cpass = this.companyForm.controls['confirmpassword'].value;
      if (pass != cpass) {
        this.passwordError = 'block';
      }
      else {
        this.passwordError = 'none';
      }
      //call service
      let userString = localStorage.getItem('userRoleSettings');
      let userRoleSettings = userString ? JSON.parse(userString) : null;
      if (userRoleSettings != null) {
        this.router.navigate(['organisation']);
      }
      else {
        ValidateForm.validateForm(this.companyForm);
      }
     
    }
    else {
      // Show an error message if login fails
      ValidateForm.validateForm(this.companyForm);
    }
    
  }

  viewCompany(companyId: number, roleId:number): void {
    console.log('companyId = ' + companyId + ' role id = ' + roleId);
    let userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    userRoleSettings.companyId = companyId;
    localStorage.setItem('userRoleSettings', userRoleSettings);
    this.router.navigate(['/organisationadmin', companyId, roleId]
      //{ queryParams: { 'companyid': companyId, 'roleid': roleId } }
    );

  }
}
