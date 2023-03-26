import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, mergeMap, Observable } from 'rxjs';
import IAddProperty from '../IAddProperty.interface';
import IPropertyState from '../IPropertyState.interface';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-get-property',
  template: `
    <div class="p-4 sm:ml-64">
      <div
        *ngIf="property$ | async as property"
        class="flex items-center justify-center h-24 mb-4 rounded bg-gray-50 dark:bg-gray-800"
      >
        <p class="text-2xl text-gray-400 dark:text-gray-500">
          {{ property.property_description }} - $ {{ property.property_price }}
        </p>
      </div>
      <div *ngIf="property$ | async as property">
        <div class="grid">
          <div>
            <div
              class="max-w-xxl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <!-- <a href="#">
                <img class="rounded-t-lg height" src="../assets/imag1.PNG" alt="" />
              </a> -->
              <div class="p-5">
                <a href="#">
                  <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    {{ property.property_description }}
                  </h5>
                </a>
                <a href="#"
                  ><h6
                    class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    Price: $ {{ property.property_price }}
                  </h6></a
                >
                <a href="#"
                  ><h6
                    class="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white"
                  >
                    Address:
                    {{ property.property_address.street }}
                    {{ property.property_address.city }},
                    {{ property.property_address.state }},
                    {{ property.property_address.zip }}
                  </h6>
                </a>
                <a href="#"
                  ><h6
                    class="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white"
                  >
                    {{ property.number_of_bedrooms }} Bedroom(s) |
                    {{ property.number_of_bathrooms }} Bathroom(s)
                  </h6>
                </a>
                <a href="#"
                  ><h6
                    class="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white"
                  >
                    Property Type:
                    {{ property.property_type }}
                  </h6>
                </a>
                <a href="#"
                  ><h6
                    class="mb-2 text-1xl tracking-tight text-gray-900 dark:text-white"
                  >
                    Availabilty:
                    {{ property.available ? 'Vacant' : 'Occuppied' }}
                  </h6>
                </a>
                <button
                  (click)="edit()"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit Property
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
                &nbsp;
                <button
                  (click)="delete(property._id)"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Delete Property
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

    <div *ngIf="checker" class="p-4 sm:ml-64">
      <div class="decorate">
        <form [formGroup]="updatePropertyForm" (ngSubmit)="update()">
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
            Update Porperty
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
      /* .adjust{
      top: 5%;
      padding: 10%;
    } */
      .height {
        height: 300px;
      }
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
export class GetPropertyComponent {
  router = inject(Router);
  propertyService = inject(PropertyService);
  property$!: Observable<IPropertyState>;
  activatedRoute = inject(ActivatedRoute);
  updatePropertyForm = inject(FormBuilder).nonNullable.group({
    property_description: ['', Validators.required],
    property_type: ['', Validators.required],
    property_price: ['', Validators.required],
    number_of_bedrooms: ['', Validators.required],
    number_of_bathrooms: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required],
    long: ['', Validators.required],
    lat: ['', Validators.required],
  });
  checker: boolean = false;
  property_id!: string;
  constructor() {
    this.fetch();
  }
  edit() {
    if (this.checker) this.checker = !this.checker;
    else this.checker = true;
  }
  update() {
    this.propertyService.updateProperty(this.property_id, this.updatePropertyForm.value as unknown as IAddProperty).subscribe(response => { 
      if (response) {
        this.edit();
        this.fetch();
        this.router.navigate(['properties', 'view', this.property_id]);
      }
    });
  }
  delete(id: string) {
    this.propertyService.deleteProperty(id).subscribe((response) => {
      if (response) {
        this.edit();
        this.router.navigate(['properties']);
      }
    });
  }
  fetch() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('prop_id') as string),
        mergeMap((prop_id) => {
          return (this.property$ =
            this.propertyService.getPropertyById(prop_id));
        })
      )
      .subscribe((response) => {
        this.property_id = response._id as string;
        this.updatePropertyForm
          .get('property_description')
          ?.patchValue(response.property_description as string);
        this.updatePropertyForm
          .get('property_type')
          ?.patchValue(response.property_type as string);
        this.updatePropertyForm
          .get('property_price')
          ?.patchValue(`${response.property_price}`);
        this.updatePropertyForm
          .get('number_of_bedrooms')
          ?.patchValue(`${response.number_of_bedrooms}`);
        this.updatePropertyForm
          .get('number_of_bathrooms')
          ?.patchValue(`${response.number_of_bathrooms}`);
        this.updatePropertyForm
          .get('street')
          ?.patchValue(response.property_address.street as string);
        this.updatePropertyForm
          .get('city')
          ?.patchValue(response.property_address.city as string);
        this.updatePropertyForm
          .get('state')
          ?.patchValue(response.property_address.state as string);
        this.updatePropertyForm
          .get('zip')
          ?.patchValue(response.property_address.zip as string);
        this.updatePropertyForm
          .get('long')
          ?.patchValue(`${response.location[0]}`);
        this.updatePropertyForm
          .get('lat')
          ?.patchValue(`${response.location[1]}`);
      });
  }
}
