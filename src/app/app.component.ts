import { Component } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { Service } from './app.service';
import CustomStore from 'devextreme/data/custom_store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  dataSource$: Observable<DataSource> = this.service.getDataSource();
  dataSourceAsync: DataSource = this.service.getAsyncDataSource();

  collapsed = false;

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  customizeTooltip = (pointsInfo: any) => ({
    text: `${parseInt(pointsInfo.originalValue)}%`,
  });

  constructor(public service: Service) {}

  onPageChange(event: any) {
    console.log(event);
  }
}
