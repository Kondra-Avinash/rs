import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Reward {
  id?: number;
  employeeId: number;
  rewardName: string;
  dateAwarded: string; 
  category: string;
}

@Injectable({ providedIn: 'root' })
export class RewardService {
  private baseUrl = `http://localhost:8080/api/rewards`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reward[]> {
    return this.http.get<Reward[]>(this.baseUrl);
  }

  assign(reward: Reward): Observable<Reward> {
    return this.http.post<Reward>(this.baseUrl, reward);
  }

  update(id: number, reward: Reward) {
    return this.http.put<Reward>(`${this.baseUrl}/${id}`, reward);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getById(id: number) {
    return this.http.get<Reward>(`${this.baseUrl}/${id}`);
  }
}