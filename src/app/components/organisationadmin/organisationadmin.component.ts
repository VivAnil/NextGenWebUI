import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { faWeight } from '@fortawesome/free-solid-svg-icons';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import { CompanyService } from 'src/app/services/company.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-organisationadmin',
  templateUrl: './organisationadmin.component.html',
  styleUrls: ['./organisationadmin.component.css']
})
export class OrganisationadminComponent implements OnInit, AfterViewInit  {
  public chartType: ChartType = 'bar';
  public StateBenChartType: ChartType = 'pie';
  public GenBenChartType: ChartType = 'bar';
  public OccBenChartType: ChartType = 'pie';
  companyId!: number;
  roleId!: number;
  public companyName:string='';
 stats:any;
  // Chart Data and Options
  genderChartLabels: string[] = [];
  genderChartData: number[] = [];
  genderChartType: ChartType = 'bar';

  occupationChartLabels: string[] = [];
  occupationChartData: number[] = [];
  occupationChartType: ChartType = 'pie';

  stateChartLabels: string[] = [];
  stateChartData: number[] = [];
  stateChartType: ChartType = 'pie';

  projectChartLabels: string[] = [];
  projectChartData: number[] = [];
  projectChartType: ChartType = 'bar';

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0  // Ensure minimum value starts from 0
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Project Wise Beneficiaries',
        position: 'top',  // Title at the bottom
        font: {
          size: 24,
          weight: 'bold',
          family: 'Helvetica Neue'
        }
      },

      legend: {
        display: true,
        position: 'bottom'  // Legend (dataset label) at the bottom
      }
    },
  };
  constructor(private route: ActivatedRoute, private companyService: CompanyService, private menuService: MenuService) { }
  
  // Hardcoded labels and data
  public chartData: ChartConfiguration['data'] = {
    //labels: ['Smartpur', 'Project CIRC', 'Krisarthak', 'Digital DIDI', 'Bittiya Sakhi', 'SoochnaPreneur', 'Digital Artisans'], // Hardcoded labels
    datasets: [
      {
        data: [1, 2], 
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
  // public chartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   scales: {
  //     x: {},
  //     y: {
  //       min: 0  // Ensure minimum value starts from 0
  //     }
  //   },
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: 'Project Wise Beneficiaries',
  //       position: 'top',  // Title at the bottom
  //       font: {
  //         size: 24,
  //         weight: 'bold',
  //         family: 'Helvetica Neue'
  //       }
  //     },

  //     legend: {
  //       display: true,
  //       position: 'bottom'  // Legend (dataset label) at the bottom
  //     }
  //   }
  // };

  // Hardcoded labels and data
  public StateBenChartData: ChartConfiguration['data'] = {
   // labels: ['Rajathan', 'Assam', 'Karnataka', 'Madhya Pradesh', 'Uttar Pradesh', 'Jharkhand', 'Bihar'], // Hardcoded labels
    datasets: [
      {
        data: [1,2], 
        //label: 'Smartpur',
        // backgroundColor: [   // Different colors for each bar
        //   '#5580B9',
        //   '#B85750',
        //   '#A0BA61',
        //   '#4EBCAB',
        //   '#7C659E',
        //   '#5BAAC3',
        //   '#EF9B51'
        // ],
      },  // Example dataset
      // { data: [120, 180, 140, 190, 170, 110], label: 'Sales 2022' }   // Example dataset for comparison
    ]
  };
  public StateBenChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0  // Ensure minimum value starts from 0
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'State-Wise Beneficiaries',
        position: 'top',  // Title at the bottom
        font: {
          size: 24,
          weight: 'bold',
          family: 'Helvetica Neue'
        }
      },

      legend: {
        display: true,
        position: 'bottom'  // Legend (dataset label) at the bottom
      }
    }
  };

  // Hardcoded labels and data
  public GenBenChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [36, 31], 
      //   //label: 'Male',
        backgroundColor: [   // Different colors for each bar
          '#5580B9',
         // '#B85750',
          '#A0BA61'

        ],
       },   
    ]
  };
  public GenBenChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0  // Ensure minimum value starts from 0
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Gender-Wise Beneficiaries',
        position: 'top',  // Title at the bottom
        font: {
          size: 24,
          weight: 'bold',
          family: 'Helvetica Neue'
        }
      },

      legend: {
        display: true,
        position: 'bottom'  // Legend (dataset label) at the bottom
      }
    }
  };

  // Hardcoded labels and data
  public OccBenChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [], 
        label: 'Occupation',
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
  public OccBenChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0  // Ensure minimum value starts from 0
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Beneficiaries as per Occupation',
        position: 'top',  // Title at the bottom
        font: {
          size: 24,
          weight: 'bold',
          family: 'Helvetica Neue'
        }
      },

      legend: {
        display: true,
        position: 'bottom'  // Legend (dataset label) at the bottom
      }
    }
  };
  // Chart types a
  // Chart types available in dropdown
  chartTypes: { label: string, value: ChartType }[] = [
    { label: 'Column Chart', value: 'bar' },
    { label: 'Line Chart', value: 'line' },
    { label: 'Pie Chart', value: 'pie' },
    { label: 'Doughnut Chart', value: 'doughnut' }

  ];
  ngOnInit(): void {
    let userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    if (userRoleSettings != null && userRoleSettings != undefined)
    {
      this.roleId = userRoleSettings.companyRoleId;
    this.companyId=userRoleSettings.companyId;
    }
    this.updatePath();
    this.loadCompanyData();
  }
 ngAfterViewInit(): void {
  //alert(sessionStorage.getItem('reloaded'));
  //if (sessionStorage.getItem('reloaded') == 'false') {
  //  sessionStorage.setItem('reloaded', 'true');
  //  const current = window.location.href; // or this.router.url for SPA path
  //   setTimeout(() => {
  //     window.location.replace(current);     
  //    }, 1000);
   
  //}
}
  loadCompanyData(): void {
    // Call API to load data for the selected company using this.companyId
    console.log('Loading data for company ID:', this.companyId);
    this.companyService.getBeneficiaryStats(this.companyId).subscribe((data) => {
      this.stats = data;
      this.companyName=data.companyName;
      console.log(data);
      // Populate Gender Chart Data
      this.genderChartLabels = data.genderWiseStats.map((item: any) => item.category);
      this.genderChartData = data.genderWiseStats.map((item: any) => item.numberOfBeneficiaries);
      this.GenBenChartData.labels=this.genderChartLabels ;
      this.GenBenChartData.datasets[0].data=this.genderChartData;
      this.GenBenChartData.datasets[0].label='Gender';
      

      // Populate Occupation Chart Data
      this.occupationChartLabels = data.occupationWiseStats.map((item: any) => item.category);
      this.occupationChartData = data.occupationWiseStats.map((item: any) => item.numberOfBeneficiaries);
      this.OccBenChartData.labels=this.occupationChartLabels ;
      this.OccBenChartData.datasets[0].data=this.occupationChartData;
     // this.OccBenChartData.datasets[0].label='Occupation Wise Beneficiaries';
      // Populate State Chart Data
      this.stateChartLabels = data.stateWiseStats.map((item: any) => item.category);
      this.stateChartData = data.stateWiseStats.map((item: any) => item.numberOfBeneficiaries);
      this.StateBenChartData.labels=this.stateChartLabels ;
      this.StateBenChartData.datasets[0].data=this.stateChartData;
      // Populate Project Chart Data
      this.projectChartLabels = data.projectWiseStats.map((item: any) => item.category);
      this.projectChartData = data.projectWiseStats.map((item: any) => item.numberOfBeneficiaries);
      this.chartData.labels=this.projectChartLabels ;
      this.chartData.datasets[0].data=this.projectChartData;
      this.chartData.datasets[0].label='Projects';
     
    });
  }
  
  changeChartType(chartType: string): void {
    const selectedChartType = chartType as ChartType
    this.chartType = selectedChartType;
  }
  // Method to toggle chart type
  toggleChartType(chartType: string, chart: string) {
    const newType = chartType as ChartType;
    switch (chart) {
      case 'gender':
        this.genderChartType = newType;
        break;
      case 'occupation':
        this.occupationChartType = newType;
        break;
      case 'state':
        this.stateChartType = newType;
        break;
      case 'project':
        this.projectChartType = newType;
        break;
    }
  }

  updatePath(): void{
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
      }
    ]);
  }
}
