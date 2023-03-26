import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import IPropertyState from './IPropertyState.interface';
import IAddProperty from './IAddProperty.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  SERVER = environment.SERVER;
  
  constructor(private http: HttpClient) {}

  getAllProperties() {
    return this.http
      .get<{ success: boolean; result: IPropertyState[] }>(
        this.SERVER +'/api/properties'
      )
      .pipe(map((response) => response.result));
  }
  getAllPropertiesForUsers() {
    return this.http
      .get<{ success: boolean; result: IPropertyState[] }>(
        this.SERVER +'/api/properties/for/users'
      )
      .pipe(map((response) => response.result));
  }
  getPropertyById(prop_id: string) {
    return this.http
      .get<{ success: boolean; result: IPropertyState }>(
        this.SERVER +`/api/properties/${prop_id}`
      )
      .pipe(
        map((response) => {
          return response.result;
        })
      );
  }
  getPropertyByZip(zip: string) {
    return this.http
      .get<{ success: boolean; result: IPropertyState[] }>(
        this.SERVER +`/api/properties/zipCode/${zip}`
      )
      .pipe(map((response) => response.result));
  }
  viewRequests() {
    return this.http
      .get<{ success: true; result: IPropertyState[] }>(
        this.SERVER +'/api/properties/view/requests'
      )
      .pipe(map((response) => response.result));
  }
  declineRequest(prop_id: string) {
    return this.http
      .patch<{
        success: boolean;
        result: {
          acknowledged: boolean;
          modifiedCount: number;
          upsertedId: null;
          upsertedCount: number;
          matchedCount: number;
        };
        notify: {
          user_id: string;
          message: string;
          status: string;
          _id: string;
        };
      }>(this.SERVER +`/api/properties/requests/${prop_id}/decline`, {})
      .pipe(map((response) => response.success));
  }
  approveRequest(prop_id: string) {
    return this.http
      .patch<{
        success: boolean;
        result: {
          acknowledged: boolean;
          modifiedCount: number;
          upsertedId: null;
          upsertedCount: number;
          matchedCount: number;
        };
        notify: {
          user_id: string;
          message: string;
          status: string;
          _id: string;
        };
      }>(this.SERVER +`/api/properties/requests/${prop_id}/approve`, {})
      .pipe(map((response) => response.success));
  }
  addProperty(property: IAddProperty) {
    return this.http.post<{ success: boolean; result: IPropertyState }>(
      this.SERVER +'/api/properties',
      property
    );
  }
  updateProperty(prop_id: string, property: IAddProperty) {
    return this.http
      .patch<{ success: boolean; result: IPropertyState }>(
        this.SERVER +`/api/properties/${prop_id}`,
        property
      )
      .pipe(map((response) => response.success));
  }
  deleteProperty(prop_id: string) {
    return this.http
      .delete<{
        success: boolean;
        result: {
          acknowledged: boolean;
          deletedCount: number;
        };
      }>(this.SERVER +`/api/properties/${prop_id}`)
      .pipe(map((response) => response.success));
  }

  getNotifications() {
    return this.http
      .get<{ success: boolean; result: { user_id: string; message: string; status: string; }[] }>(
        this.SERVER +'/api/properties/view/notifications'
      )
      .pipe(map((response) => response.result));
  }
}
