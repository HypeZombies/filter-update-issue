import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ColDef, GridReadyEvent, SideBarDef} from "ag-grid-community";
import {ITestTData} from "./interfaces";
import {createDataSource} from "./datasource";
import 'ag-grid-enterprise';
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  generalSideBarConfiguration: SideBarDef = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        minWidth: 225,
        width: 225,
        maxWidth: 225,
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
        },
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
        minWidth: 180,
        maxWidth: 400,
        width: 250,
      },
    ],
    position: 'left',
    defaultToolPanel: 'filters',
  };
  dummyFilterChangesSubject = new Subject<{id: number, name: string}[]>();
  dummyFilterValues: {id: number, name: string}[] = []

  title = 'filter-update-issue';

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef<ITestTData>[] = [
    {
      headerName: 'Type',
      field: 'type',
      colId: 'type',
      flex: 1,
      filter: 'agSetColumnFilter',
      filterParams: {
        keyCreator: (params: any) => params.value.id,
        valueFormatter: (params: any) => params.value.name,
        suppressSelectAll: true,
        defaultToNothingSelected: true,
        buttons: ['reset'],
        values: [],
      },
    },
  ];

  constructor(private crd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dummyFilterChangesSubject.subscribe(
      (dummyFilterValues) => {
        this.dummyFilterValues = dummyFilterValues;
        this.crd.detectChanges();
      }
    )
  }

  onGridReady($event: GridReadyEvent<any>) {
    const dataSource = createDataSource(this.dummyFilterChangesSubject);
    $event.api.setGridOption('serverSideDatasource', dataSource);
  }
}
