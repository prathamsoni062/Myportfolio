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
}
