import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PoNetworkType, PoSyncConfig, PoSyncSchema, PoSyncService } from '@po-ui/ng-sync';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private poSync: PoSyncService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initSync();
    });
  }

  initSync() {

    const conferenceSchema: PoSyncSchema = {
      getUrlApi: 'https://po-sample-conference.herokuapp.com/conferences',
      diffUrlApi: 'https://po-sample-conference.herokuapp.com/conferences/diff',
      deletedField: 'deleted',
      fields: [ 'id', 'title', 'location', 'description' ],
      idField: 'id',
      name: 'conference',
      pageSize: 1
    };

    const config: PoSyncConfig = {
      type: PoNetworkType.ethernet,
      period: 10
    
    };
    const schemas = [conferenceSchema];

    this.poSync.prepare(schemas, config).then(() => {
      this.poSync.sync();
    });
  }
}
