import util from './util/util.js';
import header from './components/Header/Header.js';
import subHeader from './components/SubHeader/SubHeader.js';
import carCard from './components/CarCard/CarCard.js';

import "./styles.scss";

const clc = document.getElementById('carListContainer');
const subHeaderEl = document.getElementById('subHeader');

/**
 * Loads vendors and cars data and then creates the subheader and list of
 * available cars.
 *
 * @param {string} filter - The selected car list filter.
 */
const displayCars = async (filter) => {
   const response = await fetch('http://www.cartrawler.com/ctabe/cars.json')
      .catch(_ => {});

   if (!response || !response.ok) {
      clc.insertAdjacentHTML('beforeend', "<div>Could not fetch list of cars!</div>");

      return;
   }

   const data     = (await response.json())[0];
   const vehicles = [];

   const pickUpData = data.VehAvailRSCore.VehRentalCore;
   const sh = document.createElement('div', { is : 'x-sub-header' });
   sh.props = {
      pickUpLocation : pickUpData.PickUpLocation['@Name'],
      pickUpDate     : pickUpData['@PickUpDateTime'],
      returnLocation : pickUpData.ReturnLocation['@Name'],
      returnDate     : pickUpData['@ReturnDateTime'],
      filterChangeHandler,
      filter
   };
   subHeaderEl.replaceChildren(sh);

   for (const vendor of data.VehAvailRSCore.VehVendorAvails) {
      for (const vehicle of vendor.VehAvails) {
         vehicles.push({
            vendor: vendor.Vendor,
            vehicle
         });
      }
   }

   vehicles.sort((a, b) =>
        +(a.vehicle.TotalCharge['@RateTotalAmount'])
      - +(b.vehicle.TotalCharge['@RateTotalAmount'])
   );

   if (filter === 'desc')    vehicles.reverse();

   clc.replaceChildren();

   for (const v of vehicles) {
      const card = document.createElement('div', { is : 'x-car-card' });
      card.props = v;

      clc.appendChild(card);
   }

   console.log(vehicles)
}

/**
 * Called when the cars filter is changed.
 */
const filterChangeHandler = e => {
   displayCars(e.target.value);
}

displayCars('asc');
