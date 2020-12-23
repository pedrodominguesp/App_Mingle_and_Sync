import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoStorageModule } from '@po-ui/ng-storage';
import { PoSyncModule } from '@po-ui/ng-sync';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MingleHttpInterceptor, MingleService } from '@totvs/mingle';
import { AppInitService } from './app-init.service';
import { ConfigService } from './config.service';

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => { 
    return appInitService.mingleConfiguration();
  }
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    PoTemplatesModule,
    PoStorageModule.forRoot({
      name: 'mystorage',
      storeName: '_mystore',
      driverOrder: ['lokijs', 'websql', 'indexeddb', 'localstorage']
    }),
    PoSyncModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AppInitService,
    ConfigService,
    MingleService, 
    { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: MingleHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
