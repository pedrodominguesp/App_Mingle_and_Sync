import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PoUploadFile } from '@po-ui/ng-components/lib/components/po-field/po-upload/po-upload-file';
import { PoHttpRequestData, PoHttpRequestType, PoNetworkType, PoSyncConfig, PoSyncService } from '@po-ui/ng-sync';
import { PoHttpHeaderOption } from '@po-ui/ng-sync/lib/services/po-http-client/interfaces/po-http-header-option.interface';
import { MingleService } from '@totvs/mingle';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private configuracaoSync: PoSyncConfig = {
    type: [],
    period: 5,
  };

  photoFile: Array<PoUploadFile> = [{} as PoUploadFile];
  urlImage = 'https://hom-mingle.totvs.com.br/api/api/v1/gateway/5fe0aca89ba194f09f8a8e72/api/testedepost';
  lectureId: string;

  constructor(private poSync: PoSyncService, private http: HttpClient, private mingleService: MingleService) { }

  ngOnInit(): void {
  }



  public enviarAnexosSync(rawFile: any) {
    const headers: Array<PoHttpHeaderOption> = [
      {
        name: 'Authorization', value: 'Bearer ',
      },
      { name: "returnformatversion", value: "2" }

    ];
    const [poFile] = rawFile;
    const requestData: PoHttpRequestData = {
      url: this.urlImage,
      method: PoHttpRequestType.POST,
      headers,
      body: poFile.rawFile,
      formField: 'file',
    };

    this.poSync.insertHttpCommand(requestData).then(value => {
      alert(`código identificador do evento: ${value}`);
    });
  }

  public enviarAnexosDireto(value: any) {

    const formData: FormData = new FormData();

    formData.append('file', value[0].rawFile);

    this.http.request<any>('POST', 'http://10.80.129.152:8180/api/mip/v1/servicerequest/pi-upload', {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data', //application/json // text/plain //multipart/form-data
        Authorization: 'Basic ' + btoa('13' + ':' + '13'),
        'returnformatversion': '2',
      }),
      body: formData
    }).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  public envioMingleGateway(value: any) {
    const formData: FormData = new FormData();

    formData.append('file', value[0].rawFile);

    const options = { body: formData };

    this.login();

    this.mingleService.gateway.post("api/testedepost", options).subscribe(res => {
      console.log("HTTP RESPONSE: ", res)
    }), error => {
      console.log(" deu ruim", error);

    }

  }

  public login() {
    this.mingleService.auth.login("pedro",
      "123",
      "TDATASULCRM2 PEDRO")
      .subscribe((dataLogin) => {
        console.log("dados do login", dataLogin);
        return dataLogin
      }, (authError) => {
        console.log(" deu ruim authError", authError);
      });
  }

}
