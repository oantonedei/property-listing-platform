import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PropertyService } from '../../property.service';

@Component({
  selector: 'app-notification',
  template: `
    <div class="p-4 sm:ml-64">
      <div
        class="flex items-center justify-center h-24 mb-4 rounded bg-gray-50 dark:bg-gray-800"
      >
        <p class="text-2xl text-gray-400 dark:text-gray-500">Notifications</p>
      </div>
      <div *ngIf="notifications$ | async as notifications">
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div *ngFor="let notification of notifications">
            <div *ngIf="notification.status == 'approved'">
              <a
                href="#"
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-green-100 dark:bg-green-800 dark:border-green-700 dark:hover:bg-green-700"
                >    
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ notification.status }}
                </h5>
                    
                <p class="font-normal text-white-700 dark:text-white">
                  {{ notification.message }}
                </p></a
              >
            </div>
            <div *ngIf="notification.status == 'declined'">
              <a
                href="#"
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-red-100 dark:bg-red-800 dark:border-red-700 dark:hover:bg-red-700"
                >    
                <h5
                  class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ notification.status }}
                </h5>
                    
                <p class="font-normal text-white-700 dark:text-white">
                  {{ notification.message }}
                </p></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class NotificationComponent {
  // router = inject(Router);
  propertyService = inject(PropertyService);
  notifications$!: Observable<
    { user_id: string; message: string; status: string }[]
  >;
  constructor() {
    this.notifications$ = this.propertyService.getNotifications();
  }
}
