import { Injectable } from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from 'devextreme/data/data_source';
import { HttpClient, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom, map } from 'rxjs';
import ArrayStore from 'devextreme/data/array_store';
import { LoadOptions } from 'devextreme/data';

function isNotEmpty(value: any): boolean {
  return value !== undefined && value !== null && value !== '';
}

@Injectable()
export class Service {
  dataSource: DataSource;

  constructor(private httpClient: HttpClient) {
    this.dataSource = new DataSource({
      store: new CustomStore({
          key: 'id',
          load: (loadOptions: LoadOptions) => {
            console.log(loadOptions);
              let params: HttpParams = new HttpParams();

              [
                  'filter',
                  'group',
                  'groupSummary',
                  'parentIds',
                  'requireGroupCount',
                  'requireTotalCount',
                  'searchExpr',
                  'searchOperation',
                  'searchValue',
                  'select',
                  'sort',
                  'skip',
                  'take',
                  'totalSummary',
                  'userData',
              ].forEach(function (i) {
                  // const optionValue = loadOptions[i as keyof LoadOptions];
                  // if (i in loadOptions && isNotEmpty(optionValue)) {
                  //     params = params.set(i, JSON.stringify(optionValue));
                  // }
              });
              params = params.set('limit', '25');
              return lastValueFrom(
                  this.httpClient.get<any[]>(
                      'https://fakestoreapi.com/products',
                      { params }
                  )
              ).then((response: any) => {
                  return {
                      data: response,
                      totalCount: 50,
                  };
              }).catch(() => {
                  throw 'Data loading error';
              });
          },
          // Needed to process selected value(s) in the SelectBox, Lookup, Autocomplete, and DropDownBox
          // byKey: (key: number) => {
          //     return lastValueFrom(
          //        this.http.get(`$https://mydomain.com/MyDataService?id=${key}`)
          //     );
          // },
      }),
  });
  }

  getDataSource() {
    let params: HttpParams = new HttpParams();
    params = params.set('limit', '25');
    return this.httpClient
      .get<any[]>('https://fakestoreapi.com/products', { params })
      .pipe(
        map(
          (data) =>
            new DataSource({
              store: new ArrayStore({
                key: 'id',
                data,
              }),
            })
        )
      );
  }

  getAsyncDataSource() {
    return this.dataSource;
  }
}
