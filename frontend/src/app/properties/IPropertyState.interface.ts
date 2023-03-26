export default interface IPropertyState {
  _id: string;
  property_description: String;
  property_address: {
    street: String;
    city: String;
    state: String;
    zip: String;
  };
  location: Number[];
  property_type: String;
  property_price: Number;
  number_of_bedrooms: Number;
  number_of_bathrooms: Number;
  available: Boolean;
  image_url: [String]; //image_url.path
  user?: {
    user_id: string;
    user_name: String;
    user_email: String;
  };
  request?: {
    user_id: string;
    number_of_months: Number;
    start_date: Date;
  };
}
