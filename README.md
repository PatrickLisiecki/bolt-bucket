# WEB103 Project 4 - *Bolt Bucket*

Submitted by: **Patrick Lisiecki**

About this web app: **An car personalizer that allows users to create a custom car and view, edit, or delete ones they have already created.**

Time spent: **5** hours

## Required Features

The following **required** functionality is completed:

- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomCar` table**
  - [X] **NOTE: Your GIF must include a view of your Railway database that shows the contents of the table used by your app**
- [X] **The web app uses React to display data from the API**
- [X] **Users can view a list of options they can select for different aspects of a `CustomCar`**
- [X] **On selecting each option, the displayed visual icon for the `CustomCar` updates to match the option the user chose**
- [X] **The user can submit their choices to save the car to the list of created `CustomCar`**
- [X] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database**
- [X] **The app displays the total price of all features**
- [X] **Users can view a list of all submitted `CustomCar`**
- [X] **Users can edit or delete a submitted `CustomCar` from the list view of submitted `CustomCar`**
- [X] **Users can update or delete `CustomCar` that have been created from the detail page**

The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://github.com/PatrickLisiecki/bolt-bucket/blob/main/demo.gif' title='Video Walkthrough' alt='Video Walkthrough' />

GIF created with GeForce Experience and CloudConvert.

## Notes

I had some issues with returning the correct responses from API which would cause errors on the client side.

## License

Copyright 2024 Patrick Lisiecki

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.