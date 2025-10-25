import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { ApiService } from '../../services/api.service';
import { filter } from 'rxjs/operators';
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
  lbcNames: any;
  allData: any;
  totalLivestockCount: any =0;
  clms: any =[];
  pashusakhis: any = [];
  economicStatus: any = [];
  goatCount: number = 0;
  cowCount: number = 0;
  duckCount: number = 0;
  pigCount: number = 0;
  henCount: number = 0;
  buffaloCount: number = 0;
  otherCount: number = 0;


  constructor(private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private menuService: MenuService) { }

  ngOnInit(): void {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';

    // this.runDashboardLogic();

    // // ✅ Run again every time this route is navigated to
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     if (this.router.url.includes('/tgtdashboard')) {
    //       this.runDashboardLogic();
    //     }
    //   });
    // this.updatePath();
    // this.apiService.fetchTGTDashBoardFilters().subscribe(
    //   (data) => {
    //     this.allData = data;

    //     this.states = ResetStates(data);  

    //     this.districts = ResetDistricts(data);

    //     this.blocks = ResetBlocks(data);  

    //     this.villages = ResetVillages(data);

    //     this.rweNames = ResetRWEs(data);

    //   }
    // );
  }
  ngAfterViewInit(): void {
    // ✅ Wait until DOM and child views are fully rendered
    setTimeout(() => {
      this.runDashboardLogic();
    });
  }
  private runDashboardLogic() {
    this.updatePath();

    this.apiService.fetchTGTDashBoardFilters().subscribe((data) => {
      this.allData = data;
      this.states = ResetStates(data);
      this.districts = ResetDistricts(data);
      this.blocks = ResetBlocks(data);
      this.villages = ResetVillages(data);
      this.rweNames = ResetRWEs(data);
      this.lbcNames = ResetLBCs(data);
    });
  }

  fetchRweSummary(): any {
   const rwes= this.rweNames.filter((d: any) => d.isSelected)
      .map((d: any) => d.rweId);
    this.apiService.fetchTGTDashBoarData(rwes).subscribe((data: any) => {
      this.totalLivestockCount = data.totalLivestockCount;
      this.clms = data.clm;
      this.pashusakhis = data.pashuSakhi;
      this.economicStatus = data.economicStatus;
      this.goatCount = data.livestockSummary.Goat;
      this.cowCount = data.livestockSummary.Cow;
      this.buffaloCount = data.livestockSummary.Buffalo;
      this.pigCount = data.livestockSummary.Pig;
      this.duckCount = data.livestockSummary.Duck;
      this.otherCount = data.livestockSummary.Other;
      this.henCount = data.livestockSummary.Poultry;
    });
  }

  updatePath(): void {
    console.log('updatepath');
    this.menuService.resetMenu();
    this.menuService.updateMenuItems([
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
        title: 'Service Section',
        links: [
        ]
      }
    ]);
  }
  // when state checkbox changes
  onStateChange(state:any) {

      // Filter districts belonging to selected states
    const selectedStates = this.states
      .filter((d: any) => d.isSelected && d.stateId !== 0)
    .map((d: any) => d.stateId);

    this.districts = ResetDistricts(this.allData).
      filter((d: any) => !selectedStates || selectedStates.length === 0 ? true :
        selectedStates.includes(d.stateId));

    this.blocks = ResetBlocks(this.allData)
      .filter((d: any) => !selectedStates || selectedStates.length === 0 ? true :
        selectedStates.includes(d.stateId));

    this.villages = ResetVillages(this.allData)
      .filter((d: any) => !selectedStates || selectedStates.length === 0 ? true :
        selectedStates.includes(d.stateId));

    this.lbcNames = ResetLBCs(this.allData)
      .filter((d: any) => !selectedStates || selectedStates.length === 0 ? true :
        selectedStates.includes(d.stateId));

    this.rweNames = ResetRWEs(this.allData)
      .filter((d: any) =>
        !selectedStates || selectedStates.length ===0? true :
        selectedStates.includes(d.stateId));


}

  onDistrictChange() {
    const selectedDistricts = this.districts
      .filter((d: any) => d.isSelected && d.districtId !== 0)
      .map((d: any) => d.districtId);
    
    this.blocks = ResetBlocks(this.allData)
      .filter((d: any) =>
        !selectedDistricts || selectedDistricts.length === 0
          ? true
          : selectedDistricts.includes(d.districtId)
        );

    this.villages = ResetVillages(this.allData)
      .filter((d: any) =>
        !selectedDistricts || selectedDistricts.length === 0
          ? true
          : selectedDistricts.includes(d.districtId)
    );

    this.lbcNames = ResetLBCs(this.allData)
      .filter((d: any) =>
        !selectedDistricts || selectedDistricts.length === 0
          ? true
          : selectedDistricts.includes(d.districtId)
      );

    this.rweNames = ResetRWEs(this.allData)
      .filter((d: any) =>
        !selectedDistricts || selectedDistricts.length === 0
          ? true
          : selectedDistricts.includes(d.districtId)

        );
  }

  onBlockChange() {
    const selectedBlocks = this.blocks
      .filter((b:any) => b.isSelected && b.blockId !== 0) // skip "All"
      .map((b: any) => b.blockId);

    this.villages = ResetVillages(this.allData)
      .filter((d: any) =>
        !selectedBlocks || selectedBlocks.length === 0
          ? true
          : selectedBlocks.includes(d.blockId)
    );

    this.lbcNames = ResetLBCs(this.allData)
      .filter((d: any) =>
        !selectedBlocks || selectedBlocks.length === 0
          ? true
          : selectedBlocks.includes(d.blockId)
      );

    this.rweNames = ResetRWEs(this.allData)
      .filter((d: any) =>
        !selectedBlocks || selectedBlocks.length === 0
          ? true
          : selectedBlocks.includes(d.blockId)
      );
  }

  onVillageChange() {
    const selectedVillages = this.villages
      .filter((v: any) => v.isSelected)
      .map((v: any) => v.village);

    this.lbcNames = ResetLBCs(this.allData)
      .filter((d: any) =>
        !selectedVillages || selectedVillages.length === 0
          ? true
          : selectedVillages.includes(d.village)
      );

    this.rweNames = ResetRWEs(this.allData)
      .filter((d: any) =>
        !selectedVillages || selectedVillages.length === 0
          ? true
          :selectedVillages.includes(d.village)
      );
  }

  onLBCChange() {
    const selectedLCB = this.lbcNames
      .filter((v: any) => v.isSelected)
      .map((v: any) => v.lbcId);

    this.rweNames = ResetRWEs(this.allData)
      .filter((d: any) =>
        !selectedLCB || selectedLCB.length === 0
          ? true
          : selectedLCB.includes(d.lbcId)
      );
  }
}

function ResetStates(data: any): any {
  return data
      .filter(
        (value: any, index: any, self: any) =>
          index === self.findIndex(
            (t: any) => t.stateId === value.stateId && t.stateName === value.stateName && t.stateId !== 0
          )
      )
      .map((item: any) => ({
        id: item.stateId,
        stateId: item.stateId,
        stateName: item.stateName,
        isSelected: false
      }));
}

function ResetDistricts(data: any): any {
  return data
      .filter(
        (value: any, index: any, self: any) =>
          index === self.findIndex(
            (t: any) => t.stateId === value.stateId
              && t.districtId === value.districtId
              && t.districtName === value.districtName
              && t.stateId !== 0
              && t.districtId !== 0
          )
      )
      .map((item: any) => ({
        id: item.stateId + '_' + item.districtId,
        stateId: item.stateId,
        districtId: item.districtId,
        districtName: item.districtName,
        isSelected: false
      }));
}

function ResetBlocks(data: any): any {
  return data
      .filter(
        (value: any, index: any, self: any) =>
          index === self.findIndex(
            (t: any) => t.stateId === value.stateId
              && t.districtId === value.districtId
              && t.blockId == value.blockId
              && t.blockName === value.blockName
          )
      )
      .map((item: any) => ({
        id: item.stateId + '_' + item.districtId + '_' + item.blockId,
        stateId: item.stateId,
        districtId: item.districtId,
        blockId: item.blockId,
        blockName: item.blockName,
        isSelected: false
      }));
}

function ResetVillages(data: any[]): any[] {
  const seen = new Set<string>();
  let counter = 1;

  return data
    .filter(item => {
      // Normalize village name to avoid duplicates due to case/whitespace
      const key = `${item.stateId}_${item.districtId}_${item.blockId}_${item.village.trim().toLowerCase()}`;

      if (
        !item.stateId ||
        !item.districtId ||
        !item.blockId ||
        seen.has(key)
      ) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .map(item => ({
      id: `${item.stateId}_${item.districtId}_${item.blockId}_${counter++}`,
      stateId: item.stateId,
      districtId: item.districtId,
      blockId: item.blockId,
      village: item.village.trim(),
      isSelected: false
    }));
}

function ResetRWEs(data: any[]): any[] {
  const seen = new Set<string>();

  return data
    .filter(item => {
      const key = `${item.stateId}_${item.districtId}_${item.blockId}_${item.village.trim().toLowerCase()}_${item.lbcId}_${item.rweId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(item => ({
      id: `${item.stateId}_${item.districtId}_${item.blockId}_${item.village}_${item.lbcId}_${item.rweId}`,
      stateId: item.stateId,
      districtId: item.districtId,
      blockId: item.blockId,
      village: item.village.trim(),
      lbcId: item.lbcId,
      rweId: item.rweId,
      rweName: item.rweName?.trim(),
      isSelected: false
    }));
}

function ResetLBCs(data: any[]): any[] {
  const seen = new Set<string>();

  return data
    .filter(item => {
      // Normalize text to avoid duplicates by case or whitespace
      const key = `${item.stateId}_${item.districtId}_${item.blockId}_${item.village.trim().toLowerCase()}_${item.lbcId}`;

      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .map(item => ({
      id: `${item.stateId}_${item.districtId}_${item.blockId}_${item.village}_${item.lbcId}`,
      stateId: item.stateId,
      districtId: item.districtId,
      blockId: item.blockId,
      village: item.village.trim(),
      lbcId: item.lbcId,
      lbcName: item.lbcName?.trim(),
      isSelected: false
    }));
}

