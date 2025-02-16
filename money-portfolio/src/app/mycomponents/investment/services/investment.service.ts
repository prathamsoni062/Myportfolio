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
}
