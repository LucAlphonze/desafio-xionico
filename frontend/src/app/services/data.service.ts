import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root', 
})
export class DataService {
  private listVendedoresInfoSource = new Subject();
  listVendedoresInfo = this.listVendedoresInfoSource.asObservable();

  apiVendedores: string = environment.URL_VENDEDORES;
  constructor(private _http: HttpClient) {}

  stream_Vendedor_Info(VendedoresInfo: any) {
    this.listVendedoresInfoSource.next(VendedoresInfo);
  }
  httpGet(url: string, id?: number) {
    return this._http.get(url, {});
  }
  httpPost(url: string, body: any) {
    return this._http
      .post(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
      })
      .pipe(
        catchError(async (error) => {
          console.log(error.message);
          return error;
        })
      );
  }
  UpdateVendedor(id: any, inputdata: any) {
    return this._http.put(this.apiVendedores + id, inputdata);
  }
  DeleteVendedor(id: any) {
    return this._http.delete(this.apiVendedores + id);
  }
  getVendedores() {
 this._http.get(this.apiVendedores).subscribe((res: any) => {
      this.stream_Vendedor_Info(res);
      console.log("get vendedores: ", res)
    });
  }
}
