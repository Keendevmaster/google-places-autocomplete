import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  address: Object;
  establishmentAddress: Object;
  addressComp: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;
  formattedAddressComp: string;

  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  zip: string;
  phone: string;

  constructor(public zone: NgZone) { }

  getAddress(place: Object) {
    this.address = place['formatted_address'];

    this.streetNumber = this.getStreetNumber(place);
    this.streetName = this.getStreet(place);
    this.city = this.getCity(place);
    this.state = this.getState(place);
    this.zip = this.getPostCode(place);
    this.phone = this.getPhone(place);

    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);

  }

  getEstablishmentAddress(place: Object) {
    this.establishmentAddress = place['formatted_address'];

    this.phone = this.getPhone(place);

    this.formattedEstablishmentAddress = place['formatted_address'];
    this.zone.run(() => this.formattedEstablishmentAddress = place['formatted_address']);

  }

  getAddressFromComp(place: any) {
    this.addressComp = place['formatted_address'];

    this.phone = this.getPhone(place);

    this.formattedAddressComp = place['formatted_address'];
    this.zone.run(() => this.formattedAddressComp = place['formatted_address']);

  }

  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'phone' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }


}
