import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Router } from '@angular/router';
import { faWeight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-organisationadmin',
  templateUrl: './organisationadmin.component.html',
  styleUrls: ['./organisationadmin.component.css']
})
export class OrganisationadminComponent implements OnInit {
  public chartType: ChartType = 'bar';
  public StateBenChartType: ChartType = 'pie';
  public GenBenChartType: ChartType = 'bar';
  public OccBenChartType: ChartType = 'pie';
  constructor() { }

  // Hardcoded labels and data
  public chartData: ChartConfiguration['data'] = {
    labels: ['Smartpur', 'Project CIRC', 'Krisarthak', 'Digital DIDI', 'Bittiya Sakhi', 'SoochnaPreneur', 'Digital Artisans'], // Hardcoded labels
    datasets: [
      {
        data: [36, 31, 7, 7, 6, 10, 3], label: 'Smartpur',
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
    }
  };

  // Hardcoded labels and data
  public StateBenChartData: ChartConfiguration['data'] = {
    labels: ['Rajathan', 'Assam', 'Karnataka', 'Madhya Pradesh', 'Uttar Pradesh', 'Jharkhand', 'Bihar'], // Hardcoded labels
    datasets: [
      {
        data: [36, 31, 7, 7, 6, 10, 3], label: 'Smartpur',
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
    labels: ['Male', 'Female', 'Transgender'], // Hardcoded labels
    datasets: [
      {
        data: [36, 31, 4], label: 'Male',
        backgroundColor: [   // Different colors for each bar
          '#5580B9',
          '#B85750',
          '#A0BA61'

        ],
      },  // Example dataset
      // { data: [120, 180, 140, 190, 170, 110], label: 'Sales 2022' }   // Example dataset for comparison
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
    labels: ['Private Job', 'Business', 'Artisans', 'Daily Wagers', 'Home Maker', 'Agriculture', 'Unemployed'], // Hardcoded labels
    datasets: [
      {
        data: [36, 31, 4,7,6,10,13], label: 'Occupation',
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
  }
  changeChartType(chartType: string): void {
    const selectedChartType = chartType as ChartType
    this.chartType = selectedChartType;
  }
}
