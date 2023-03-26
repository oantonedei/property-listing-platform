import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <!-- <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img id="main"  class="w-8 h-8 mr-2" src="../assets/image8.png" alt="logo" width="630" >
          SweetHome    
      </a>
      </div> -->
    <div id="big_image">
      <img src="../assets/image3.PNG" />
    </div>
    <div class="bg-text">
      <p>
        You Want
        <b>More Leads</b><br />
        <b>More Sales</b><br />
        <b>More Authority</b>
      </p>
    </div>
  `,
  styles: [
    `
      img {
        width: 1500px;
        height: 60%;
        margin: 150px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: blur(8px);
        -webkit-filter: blur(4px);
      }
      #main {
        width: 1000px;
        height: 100px;
      }

      .bg-image {
        /* The image used */
        /* background-image: url("../assets/image12.png"); */

        /* Add the blur effect */
        filter: blur(8px);
        -webkit-filter: blur(8px);

        /* Full height */
        height: 100%;

        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .bg-text {
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
        color: white;
        font-weight: bold;
        border: 3px solid #f1f1f1;
        position: absolute;
        top: 50%;
        left: 55%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 80%;
        padding: 20px;
        text-align: center;
      }
    `,
  ],
})
export class WelcomeComponent {}
