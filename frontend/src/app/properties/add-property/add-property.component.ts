import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IAddProperty from '../IAddProperty.interface';
import IPropertyState from '../IPropertyState.interface';
import { PropertyService } from '../property.service';

@Component({
  // _id: string;
  // property_description: String; --> enum
  // property_address: { --> enum
  //   street: String;
  //   city: String;
  //   state: String;
  //   zip: String;
  // };
  // location: [Number];
  // property_type: String; --> enum
  // property_price: Number; --> enum
  // number_of_bedrooms: Number; --> enum
  // number_of_bathrooms: Number; --> enum
  // available: Boolean; --> enum
  // image_url: [String]; --> enum
  selector: 'app-add-property',
  template: `
    <div class="p-4 sm:ml-64">
      <div
        class="flex items-center justify-center h-24 mb-4 rounded bg-gray-50 dark:bg-gray-800"
      >
        <p class="text-2xl text-gray-400 dark:text-gray-500">Add Property</p>
      </div>
     
      <div class="decorate">
        <form [formGroup]="addPropertyForm" (ngSubmit)="add()">
          <div class="mb-6">
            <div>
              <label
                for="property_description"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Property Description</label
              >
              <input
                type="text"
                id="property_description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Property Description"
                formControlName="property_description"
                required
              />
            </div>
          </div>
          <div class="mb-6">
            <div>
              <label
                for="property_type"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Property Type</label
              >
              <input
                type="text"
                id="property_type"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Property Type"
                formControlName="property_type"
                required
              />
            </div>
          </div>
          <div class="mb-6">
            <div>
              <label
                for="property_price"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Amount</label
              >
              <input
                type="text"
                id="property_price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount"
                formControlName="property_price"
                required
              />
            </div>
          </div>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="number_of_bedrooms"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Number of Bedrooms</label
              >
              <input
                type="number"
                id="number_of_bedrooms"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Number of Bedrooms"
                formControlName="number_of_bedrooms"
                required
              />
            </div>
            <div>
              <label
                for="number_of_bathrooms"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Number of Bathrooms</label
              >
              <input
                type="number"
                id="number_of_bathrooms"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Number of Bathrooms"
                formControlName="number_of_bathrooms"
                required
              />
            </div>
          </div>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="street"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Street</label
              >
              <input
                type="text"
                id="street"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Street"
                formControlName="street"
                required
              />
            </div>
            <div>
              <label
                for="city"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >City</label
              >
              <input
                type="text"
                id="city"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="City"
                formControlName="city"
                required
              />
            </div>
            <div>
              <label
                for="state"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >State</label
              >
              <input
                type="text"
                id="state"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="State"
                formControlName="state"
                required
              />
            </div>
            <div>
              <label
                for="zip"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Zip</label
              >
              <input
                type="text"
                id="zip"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Zip"
                formControlName="zip"
                required
              />
            </div>
            <div>
              <label
                for="long"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Longitude</label
              >
              <input
                type="text"
                id="long"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Longitude"
                formControlName="long"
                required
              />
            </div>
            <div>
              <label
                for="lat"
                class="block mb-2 text-sm font-medium text-gray-900 "
                >Latitude</label
              >
              <input
                type="text"
                id="lat"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Latitude"
                formControlName="lat"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Porperty
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .decorate {
        background-color: #f2f2f2;
        padding: 20px;
        border-radius: 5px;
        border: 1px solid #ccc;
        width: 70%;
        margin: 0 auto;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    `,
  ],
})
export class AddPropertyComponent {
  propertyService = inject(PropertyService);
  router = inject(Router);
  addPropertyForm = inject(FormBuilder).nonNullable.group({
    property_description: ['', Validators.required],
    property_type: ['', Validators.required],
    property_price: ['', Validators.required],
    number_of_bathrooms: ['', Validators.required],
    number_of_bedrooms: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    long: ['', Validators.required],
    lat: ['', Validators.required],
  });
  add() {
    this.propertyService
      .addProperty(this.addPropertyForm.value as unknown as IAddProperty)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['properties']);
        }
      });
  }
}
