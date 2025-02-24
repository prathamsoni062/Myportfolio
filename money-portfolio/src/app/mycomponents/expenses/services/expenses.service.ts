import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import apiUrlConfigs from '../../../shared/modules/http-layer/config/api-url.config';
import { ApiService } from '../../../shared/modules/http-layer/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private apiService: ApiService) {}

  getExpenses(): Observable<any> {
    return this.apiService.invoke(apiUrlConfigs.getExpenses);
  }

  createExpenses(data: any): Observable<any> {
    return this.apiService.invoke(apiUrlConfigs.createExpenses, { requestBody: data });
  }

  updateExpenses(data: any): Observable<any> {
    const url = apiUrlConfigs.updateExpenses.pathTemplate.replace(':id', data._id); 
    return this.apiService.invoke({ ...apiUrlConfigs.updateExpenses, pathTemplate: url }, { requestBody: data });
  }

  deleteExpenses(id: string): Observable<any> {
    const url = apiUrlConfigs.deleteExpenses.pathTemplate.replace(':id', id);
    return this.apiService.invoke({...apiUrlConfigs.deleteExpenses, pathTemplate: url });
  }
}
