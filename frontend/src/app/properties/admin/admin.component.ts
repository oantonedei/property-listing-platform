import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import IPropertyState from '../IPropertyState.interface';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-admin',
  template: `
    <div class="p-4 sm:ml-64">
      <div
        class="flex items-center justify-center h-24 mb-4 rounded bg-gray-50 dark:bg-gray-800"
      >
        <p class="text-2xl text-gray-400 dark:text-gray-500">Property List</p>
      </div>
      <div *ngIf="property$ | async as properties">
        <div class="grid grid-cols-3 gap-4 mb-4">
          <div *ngFor="let property of properties">
            <div
              class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img class="rounded-t-lg" src="../assets/imag1.PNG" alt="" />
              </a>
              <div class="p-5">
                <a href="#">
                  
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    {{ property.property_description }}
                  </h5>
                <h6
                    class="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white"
                  >
                    Price: $ {{ property.property_price }}
                  </h6>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Address:
                  {{ property.property_address.street }}
                  {{ property.property_address.city }},
                  {{ property.property_address.state }},
                  {{ property.property_address.zip }}
                  <br />
                  {{ property.number_of_bedrooms }} bds |
                  {{ property.number_of_bathrooms }} ba |
                  {{ property.property_type }} | Vacancy:
                  {{ property.available ? "Vacant" : "Occupied" }}
                </p>
                <button
                (click)="viewProperty(property._id)"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  More Details
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    `,
  ],
})
export class AdminComponent {
  router = inject(Router)
  propertyService = inject(PropertyService);
  property$!: Observable<IPropertyState[]>;
  constructor() {
    this.property$ = this.propertyService.getAllProperties();
  }

  viewProperty(id: string) { 
    this.router.navigate(['properties','view', id])
  }
}
