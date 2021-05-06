# FoursquareVenues

Project is a DEMO/test task. In general is shows all Burger Venues (points) in a google-map and shows more recent photo for each one in a gallery bellow using Foursquare API. 


## Startup

Run `npm install` and serve project locally using `ng serve`. Navigate to `http://localhost:4200/`.

## Notes

As a default position coordinates there is a Tartu bus station picked up. Unfortunatelly there is no many points and photos for this location, so I added additional location for New York city, which has more of them. Location can be change using picker in a header.

Solution is responsive and tested against different resolutions and devices (virtual and physical one - Google Pixel 3a).

Also, be worries that Foursquare has own restrictions on requests amount to different entry points - it can end up in 420 HTTP code - 'Too many requests' issue, so play with fun, but not too long and often. 

Here is their info in regards to dev accounts: 
`The Foursquare API has a limit of 950 Regular API Calls per day and 50 Premium API Calls per day for Sandbox Tier Accounts.`

## Demo

I have deployed live demo here: `https://venue-burgers.firebaseapp.com` using firebase hosting 🚀 (also see webapp here: `https://venue-burgers.web.app`). 
You can check the solution there without need to install or deploy yourself. 

## Hints for future inprovements

As an improvement I would do: 

- Play with background color / gradient
- I would add a dynamic centered position. I.e. you move you map and see 1km distanced points around your focused position and update gallery based on that.
- Of course production key for google map 
- Some more styles for info window in a map and different minor details (dark mode on google map ? looks awesome in a dark theme of websites)
- To avoid 'Too many requests' issue I would cache results or store them in advance, so app will not request foursquare api each time user perform a new request (if data exists in cache/storage of course.. In case of paid account would do the same to do not pay more then needed )

- I would display venues photos for one venue point (clicking on it in a map). Basically that what I implemented initially :D

## Screenshots

![image](https://user-images.githubusercontent.com/52400862/117324816-d367f680-ae98-11eb-988f-39b93a314994.png)

![image](https://user-images.githubusercontent.com/52400862/117324902-ea0e4d80-ae98-11eb-8cdd-5a2843962be8.png)

