import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="p-3 bg-white md:p-4 lg:p-3 dark:bg-gray-800 remain">
      <div class="mx-auto max-w-screen-xl text-center">
        <!-- <p class="my-6 text-gray-500 dark:text-gray-400">
          A property listing website for real estate agents and property consultants.
        </p> -->
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2022-2023 <a href="#" class="hover:underline">Sweet Homes</a>. All
          Rights Reserved.</span
        >
      </div>
    </footer>
  `,
  styles: [
    `
      .remain {
        position: fixed;  
        bottom: 0;
        width: 100%;
      }
      img {
        width: 10%;
        height: 15%;
      }
    `,
  ],
})
export class FooterComponent {}
