import { Component, OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {

  public chartType: ChartType = 'bar';  // Default chart type
  isDialogOpen: boolean = false;
  isProfileOpen: boolean=false;
  displayProfile: string='none';
  email:string ='abc@defindia.org';
  // Hardcoded labels and data
  public chartData: ChartConfiguration['data'] = {
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
        display: true,
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
  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  changeChartType(chartType: string): void {
    const selectedChartType = chartType as ChartType
    this.chartType = selectedChartType;
  }
  // changeChartType(event: Event): void {
  //   const selectedChartType = (event.target as HTMLSelectElement).value as ChartType;
  //   this.chartType = selectedChartType;
  // }

  ngAfterViewInit() {
    // var options = {

    //   data: [{
    //       type: "column",
    //       startAngle: 45,
    //       showInLegend: "false",
    //       legendText: "{label}",
    //       indexLabel: "{label} ({y})",
    //       yValueFormatString:"#,##0.#%",
    //       dataPoints: [
    //         { label: "Total Projects", y: 36 },
    //         { label: "Total Project Officers", y: 31 },
    //         { label: "Total District Coordinators", y: 7 },
    //         { label: "Total Block Coordinators", y: 7 },
    //         { label: "Total SoochnaPreneurs", y: 50 },				
    //         { label: "States", y: 3 },
    //         { label: "Services", y: 10 }
    //       ]
    //   }]
    // };
    //  this.chartGlance = CanvasJSChart(options);
    //  this.chartGlance2 = CanvasJSChart(options);
    //  this.chartGlance3 = CanvasJSChart(options);
    // // $("#chartGlance").CanvasJSChart(options);
    // // $("#chartGlance2").CanvasJSChart(options);
    // // $("#chartGlance3").CanvasJSChart(options);
    // }
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
}
