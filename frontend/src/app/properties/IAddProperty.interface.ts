export default interface IAddProperty {
  property_description: string;
  property_type: string;
  property_price: number;
  number_of_bathrooms: number;
  number_of_bedrooms: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  long: number;
  lat: number;
}
