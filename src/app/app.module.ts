import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProduct from './+state/product.reducer';
import { ProductEffects } from './+state/product.effects';
import {
  DxDataGridModule,
  DxTemplateModule,
  DxBulletModule,
} from 'devextreme-angular';
import { Service } from './app.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreModule.forFeature(
      fromProduct.PRODUCT_FEATURE_KEY,
      fromProduct.productReducer
    ),
    EffectsModule.forFeature([ProductEffects]),
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
  ],
  providers: [
    Service
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
