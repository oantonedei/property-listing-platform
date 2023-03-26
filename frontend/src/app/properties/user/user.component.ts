import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import IPropertyState from '../IPropertyState.interface';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-user',
  template: `
    <div class="p-4 sm:ml-64">
      <div
        class="flex items-center justify-center h-24 mb-4 rounded bg-gray-50 dark:bg-gray-800"
      >
        <p class="text-2xl text-gray-400 dark:text-gray-500">Property List</p>
      </div>
      <div>
        <!-- search form -->
        <form>
          <button
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
             (click)="onSearchPropertyById()" >Search</button
          >
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
              (keyup)="onSearchByZipCode(search.value)"
              #search
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <!-- search end -->
      </div>
      <br />
      <div *ngIf="properties$ | async as properties">
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
                    Price: $ {{ property.property_price }}
                  </h5>
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
                  {{ property.property_type }} | available:
                  {{ property.available }}
                </p>
                <button
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                 (click)="onMoreDetail(property._id)" >
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
      #displayProperty {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    `,
  ],
})
export class UserComponent {
  propertiesService = inject(PropertyService);
  router = inject(Router);
  properties$!: Observable<IPropertyState[]>;
  constructor() {
    this.fetchProperties();
  }
  onMoreDetail(id: string) {
    this.router.navigate(['properties', 'view', id, 'details']);
  }
  onSearchPropertyById( ) {
  }
  onSearchByZipCode(zipCode: string) {
    this.properties$ = this.propertiesService.getPropertyByZip(zipCode);
    if(zipCode.length == 0) {
      this.fetchProperties();
    }
  }
  fetchProperties() {
    this.properties$ = this.propertiesService.getAllPropertiesForUsers();
  }
  
}
