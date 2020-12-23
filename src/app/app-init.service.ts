import { Injectable } from '@angular/core';
import { MingleService, Configuration } from '@totvs/mingle'
import { ConfigService } from './config.service';
@Injectable()
export class AppInitService {

  constructor(private configService: ConfigService, private mingleService: MingleService) { }

  mingleConfiguration(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("Mingle Service Configuration called");
      const config = new Configuration();
      config.modules.web = true;
      config.environment = 'DEV';
      config.modules.usage_metrics = true;
      config.modules.gateway = true;
      config.modules.push_notification = true;
      config.server = 'https://dev-mingle.totvs.com.br/api';
      config.app_identifier = '5e4d714eb9bae0e8338db387'

      this.mingleService.setConfiguration(config);

      this.mingleService.init()
        .then(init => {
          resolve('Mingle Service Init');
        }).catch(error => {
          console.log("error", error);
          reject(error);
        });

      console.log("Mingle Service configuration completed");

    });
  }
}
