import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tgtdashboard',
  templateUrl: './tgtdashboard.component.html',
  styleUrls: ['./tgtdashboard.component.css']
})
export class TgtdashboardComponent implements OnInit {

  states: any;
  districts: any;
  villages: any;
  blocks: any;
  rweNames: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private menuService: MenuService) { }

  ngOnInit(): void {
    this.updatePath();
    this.apiService.fetchTGTDashBoardFilters().subscribe(
      (data) => {
        this.states = [
          {
            id: 0,                // special ID for "All"
            stateId: 0,
            stateName: "All",
            isSelected: false
          },
          ...data
            .filter(
              (value: any, index: any, self: any) =>
                index === self.findIndex(
                  (t: any) => t.stateId === value.stateId && t.stateName === value.stateName
                )
            )
            .map((item: any) => ({
              id: item.stateId,
              stateId: item.stateId,
              stateName: item.stateName,
              isSelected: false
            }))];

        this.districts = [
          {
            id: 0,                // special ID for "All"
            stateId: 0,
            districtId: 0,
            districtName: "All",
            isSelected: false
          },
         ...data
          .filter(
            (value: any, index: any, self: any) =>
              index === self.findIndex(
                (t: any) => t.stateId === value.stateId && t.districtId === value.districtId && t.districtName === value.districtName
              )
          )
          .map((item: any) => ({
            id: item.stateId + '_' + item.districtId,
            stateId: item.stateId,
            districtId: item.districtId,
            districtName: item.districtName,
            isSelected: false
          }))];

        this.blocks = [
          {
            id: 0,                // special ID for "All"
            stateId: 0,
            districtId: 0,
            blockId: 0,
            blockName:  "All",
            isSelected: false
          },
          ...data
            .filter(
              (value: any, index: any, self: any) =>
                index === self.findIndex(
                  (t: any) => t.stateId === value.stateId && t.districtId === value.districtId && t.blockid == value.blocktId && t.blockid === value.blockid && t.blockName === value.blockName
                )
            )
            .map((item: any) => ({
              id: item.stateId + '_' + item.districtId + '_' + item.blockId,
              stateId: item.stateId,
              districtId: item.districtId,
              blockId: item.blockId,
              blockName: item.blockName,
              isSelected: false
            }))];

        this.villages = [
          {
            id: 0,                // special ID for "All"
            stateId: 0,
            districtId: 0,
            blockId: 0,
            villageName: "All",
            isSelected: false
          },
          ...data
            .filter(
              (value: any, index: any, self: any) =>
                index === self.findIndex(
                  (t: any) => t.stateId === value.stateId && t.districtId === value.districtId && t.blockid == value.blocktId && t.blockid === value.blockid && t.village === value.village
                )
            )
            .map((item: any) => ({
              id: item.stateId + '_' + item.districtId + '_' + item.blockId + '_' + item.village,
              stateId: item.stateId,
              districtId: item.districtId,
              blockId: item.blockId,
              villageName: item.village,
              isSelected: false
            }))];

        this.rweNames=data
          .filter(
            (value: any, index: any, self: any) =>
              index === self.findIndex(
                (t: any) => t.stateId === value.stateId && t.districtId === value.districtId && t.blockid == value.blocktId && t.blockid === value.blockid && t.village === value.village 
              )
          )
          .map((item: any) => ({
            id: item.stateId + '_' + item.districtId + '_' + item.blockId + '_' + item.village,
            stateId: item.stateId,
            districtId: item.districtId,
            blockId: item.blockId,
            village: item.village,
            isSelected: false 
          }));
      }
    );
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
      }
    ]);
  }

}
