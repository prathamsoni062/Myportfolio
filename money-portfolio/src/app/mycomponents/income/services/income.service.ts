import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import apiUrlConfigs from '../../../shared/modules/http-layer/config/api-url.config';
import { ApiService } from '../../../shared/modules/http-layer/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private apiservice:ApiService) { }

  getIncome():Observable<any>{
    return this.apiservice.invoke(apiUrlConfigs.getIncome);
  }

  createIncome(data:any):Observable<any>{
    return this.apiservice.invoke(apiUrlConfigs.createIncome,{requestBody:data});
  }

  updateIncome(data:any):Observable<any>{
    const url = apiUrlConfigs.updateIncome.pathTemplate.replace(':id',data._id);
    return this.apiservice.invoke({...apiUrlConfigs.updateIncome,pathTemplate:url},{requestBody:data});
  }

  deleteIncome(id:string):Observable<any>{
    const url = apiUrlConfigs.deleteIncome.pathTemplate.replace(':id',id);
    return this.apiservice.invoke({...apiUrlConfigs.deleteIncome,pathTemplate:url});
  }
}


