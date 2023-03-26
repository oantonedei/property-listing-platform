import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { UserService } from 'src/app/user.service';
import IPropertyState from '../../IPropertyState.interface';
import { PropertyService } from '../../property.service';

@Component({
  selector: 'app-property-details',
  template: `
    <div class="p-4 sm:ml-64">
      <div
        class="flex items-center justify-center h-24 mb-4 rounded bg-gray-50 dark:bg-gray-800"
      >
        <p class="text-2xl text-gray-400 dark:text-gray-500">
          Property Details
        </p>
      </div>
      <p>Property_Id - {{ property._id }}</p>
      <p>Number_of_bathrooms - {{ property.number_of_bathrooms }}</p>
      <p>Number_of_bedrooms - {{ property.number_of_bedrooms }}</p>
      <p>Property_address -</p>
      <p>Street - {{ property.property_address.street }}</p>
      <p>City - {{ property.property_address.city }}</p>
      <p>State - {{ property.property_address.state }}</p>
      <p>Zip - {{ property.property_address.zip }}</p>
      <p>Property_type - {{ property.property_type }}</p>
      <p>Property_price - {{ property.property_price }}</p>
      <p>Available - {{ property.available }}</p>
      <p>Location long and lat - {{ property.location }}</p>

      <div id="controls-carousel" class="relative" data-carousel="static">
        <!-- Carousel wrapper -->
        <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
          <!-- Item 1 -->
          <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="../assets/imag1.PNG"
              class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
          <!-- Item 2 -->
          <div
            class="hidden duration-700 ease-in-out"
            data-carousel-item="active"
          >
            <img
              src="../assets/image4.png"
              class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
          <!-- Item 3 -->
          <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="../assets/image6.png"
              class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
          <!-- Item 4 -->
          <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="../assets/image3.PNG"
              class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
          <!-- Item 5 -->
          <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="../assets/image12.png"
              class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="..."
            />
          </div>
        </div>
        <!-- Slider controls -->
        <button
          type="button"
          class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-white dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span class="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span
            class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-white dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span class="sr-only">Next</span>
          </span>
        </button>
      </div>

      <br />
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        (click)="onRentRequest()"
      >
        Request for rant
      </button>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        (click)="onBackToList()"
      >
        Back To list
      </button>

      <form [formGroup]="rentForm" (ngSubmit)="onRequestSubmit()"
        *ngIf="check"
        href="#"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 "
      >
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          Request for Rent
        </h5>
        <p class=" tracking-tight text-gray-900 dark:text-white">
          start date
          <input class="font-normal text-gray-700 dark:text-gray-400 " formControlName ="startDate" type="date"  />
        </p>
        <br />
        <p class="mb-2 tracking-tight text-gray-900 dark:text-white">
          Duration in Mon
          <input class="font-normal text-gray-700 dark:text-gray-400 " formControlName ="duration" type="number" />
        </p>
        <br />
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          (click)="onRequestSubmit()"
        >
          Submit
        </button>
      </form>
    </div>

    <br />
    <br />
  `,
  styles: [
    `
      #displayProperty {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }
      #prop_details {
        color: text-white;
      }
      #formInPut {
        textcolor: text-white;
      }
    `,
  ],
})
export class PropertyDetailsComponent {
  activatedRoute = inject(ActivatedRoute);
  propertiesService = inject(PropertyService);
  userService = inject(UserService);
  router = inject(Router);
  propertyId!: string;
  property$!: Observable<IPropertyState>;
  property!: IPropertyState;
  check: boolean = false;

  constructor() {
    this.activatedRoute.paramMap
      .pipe(
        map((params) => params.get('prop_id') as string),
        mergeMap((prop_id) => this.propertiesService.getPropertyById(prop_id))
      )
      .subscribe((property) => {
        this.property = property;
        console.log(property._id);
      });
  }
  rentForm = inject(FormBuilder).nonNullable.group({
    startDate: ['', Validators.required],
    duration: ['', Validators.required],
  });

  onRentRequest() {
    console.log('test rent request');
    if (this.check) this.check = !this.check;
    else this.check = true;
    // this.userService.requestPropertyById(this.property._id);
  }
  onRequestSubmit() {
    console.log('test request submit');
    this.userService.requestPropertyById(this.property._id, this.rentForm.value as {number_of_months: number, start_date: Date})
    .subscribe((res) => {
      if(res){ 
        alert('Request sent successfully');
        this.router.navigate(['properties'])
    }
      else alert('Request failed');
    });
    
  }
  onBackToList() {
    console.log('test back to list');
    this.router.navigate(['properties']);
  }
}
