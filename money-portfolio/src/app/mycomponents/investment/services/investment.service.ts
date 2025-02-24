import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import apiUrlConfigs from 'src/app/shared/modules/http-layer/config/api-url.config';
import { ApiService } from 'src/app/shared/modules/http-layer/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private apiService: ApiService) { }

  getInvestments(): Observable<any> {
    return this.apiService.invoke(apiUrlConfigs.getInvestments);
  }

  addInvestment(data:any): Observable<any>{
    return this.apiService.invoke(apiUrlConfigs.addInvestment,{requestBody:data});
  }

  updateInvestment(data: any): Observable<any> {
    const url = apiUrlConfigs.updateInvestment.pathTemplate.replace(':id', data._id); // Replace :id with actual ID
    return this.apiService.invoke({ ...apiUrlConfigs.updateInvestment, pathTemplate: url }, { requestBody: data });
  }
  
  deleteInvestment(id: string): Observable<any> {
    const url = apiUrlConfigs.deleteInvestment.pathTemplate.replace(':id', id); // Replace :id with actual ID
    return this.apiService.invoke({...apiUrlConfigs.deleteInvestment, pathTemplate: url });
  }
}
