// import { observable, action, computed } from "mobx";
// import axios from "axios";
// import { userStore } from "./UserStore";
// require("dotenv").config();

// class LocationStore {
//   myLocation = observable({});
//   calculatedDistance = observable(0);

//   getLocation = action(() => {
//     let geo = navigator.geolocation;
//     geo.getCurrentPosition(data => {
//       console.log(data);

//       this.myLocation = data;
//     });
//   });

//   calculateDistance = computed(address => {
//     return new Promise((resolve, reject) => {
//       axios
//         .get("https://www.mapquestapi.com/geocoding/v1/address", {
//           params: {
//             key: process.env.MAPQUEST_KEY,
//             location: address
//           }
//         })
//         .then(res => {
//           let latLong = res.data.results[0].locations[0].latLang;
//           resolve(
//             LocationStore.distance(
//               latLong.lat,
//               latLong.lng,
//               this.myLocation.coords.latitute,
//               this.myLocation.longitude,
//               "K"
//             ) * 0.621371
//           );
//         });
//     });
//   });

//   calculateDistanceFromOther = async otherUsername => {
//     let otherAddr = (await userStore.getSomeUser(otherUsername)).address;
//     let addrString = Object.values(otherAddr).join(" ");
//     this.calculatedDistance = this.calculateDistance(addrString);
//   };
//   static distance(lat1, lon1, lat2, lon2, unit) {
//     if (lat1 == lat2 && lon1 == lon2) {
//       return 0;
//     } else {
//       var radlat1 = (Math.PI * lat1) / 180;
//       var radlat2 = (Math.PI * lat2) / 180;
//       var theta = lon1 - lon2;
//       var radtheta = (Math.PI * theta) / 180;
//       var dist =
//         Math.sin(radlat1) * Math.sin(radlat2) +
//         Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//       if (dist > 1) {
//         dist = 1;
//       }
//       dist = Math.acos(dist);
//       dist = (dist * 180) / Math.PI;
//       dist = dist * 60 * 1.1515;
//       if (unit == "K") {
//         dist = dist * 1.609344;
//       }
//       if (unit == "N") {
//         dist = dist * 0.8684;
//       }
//       return dist;
//     }
//   }
// }

// export const locationStore = new LocationStore();
