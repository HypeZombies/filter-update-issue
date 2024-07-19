import {IServerSideDatasource, IServerSideGetRowsParams} from "ag-grid-community";
import {ITestTData} from "./interfaces";
import {Subject} from "rxjs";

export function createDataSource(
  dummyFilterChangesSubject: Subject<{id: number, name: string}[]>
): IServerSideDatasource {
  return {
    getRows(params: IServerSideGetRowsParams<ITestTData>) {

      const dummyFilterValues: {id: number, name: string}[] = [
        {
          id: 1,
          name: `filter one (${Math.floor(Math.random() * 50) + 1})`
        },
        {
          id: 2,
          name: `filter two (${Math.floor(Math.random() * 50) + 1})`
        },
        {
          id: 3,
          name: `filter two (${Math.floor(Math.random() * 50) + 1})`
        },        {
          id: 4,
          name: `filter two (${Math.floor(Math.random() * 50) + 1})`
        },        {
          id: 5,
          name: `filter two (${Math.floor(Math.random() * 50) + 1})`
        },        {
          id: 6,
          name: `filter two (${Math.floor(Math.random() * 50) + 1})`
        }
      ]

      params.success({
        rowData: [
          {
            id: 1,
            type: 'A'
          }
        ],
        rowCount: 1
      })

      dummyFilterChangesSubject.next(dummyFilterValues);

      params.api
        .getColumnFilterInstance('type')
        .then((filter: any) => {
          filter.setFilterValues(
            dummyFilterValues as any
          )
          filter.refreshFilterValues()
        }
        );

    }
  }
}
