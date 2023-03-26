import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import IPropertyState from '../IPropertyState.interface';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-view-request',
  template: `
    <div class="p-4 sm:ml-64">
      <div
        class="flex items-center justify-center h-24 mb-4 rounded bg-gray-50 dark:bg-gray-800"
      >
        <p class="text-2xl text-gray-400 dark:text-gray-500">Request List</p>
      </div>
      
      <div *ngIf="property$ | async as properties">
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div *ngFor="let property of properties">
            <div
              class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div class="flex justify-end px-4 pt-4">
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                  type="button"
                >
                  <span class="sr-only">Open dropdown</span>
                  <svg
                    class="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                    ></path>
                  </svg>
                </button>
                <!-- Dropdown menu -->
              </div>
              <div class="flex flex-col items-center pb-10">
                <img
                  class="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src="../assets/image7.png"
                  alt="Bonnie image"
                />
                <h5
                  class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
                >
                  {{ property.property_description }}
                </h5>
                <span class="text-sm text-gray-500 dark:text-gray-400"
                  >Number of Months:
                  {{ property.request?.number_of_months }}</span
                >
                <span class="text-sm text-gray-500 dark:text-gray-400"
                  >Start Date: {{ property.request?.start_date }}</span
                >
                <div class="flex mt-4 space-x-3 md:mt-6">
                  <button
                    (click)="approveRequest(property._id)"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Approve
                  </button>
                  <button
                    (click)="declineRequest(property._id)"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ViewRequestComponent {
  router = inject(Router);
  propertyService = inject(PropertyService);
  property$!: Observable<IPropertyState[]>;
  constructor() {
    this.fetch();
  }
  approveRequest(id: string) {
    this.propertyService.approveRequest(id).subscribe((res) => {
      this.fetch();
    });
  }
  declineRequest(id: string) {
    this.propertyService.declineRequest(id).subscribe((res) => {
      this.fetch();
    });
  }

  fetch() {
    this.property$ = this.propertyService.viewRequests();
  }
}
