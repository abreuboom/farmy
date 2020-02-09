import "firebase/storage";

import * as firebase from "firebase/app";

import uuidv4 from "uuid/v4";

var firebaseConfig = {
  apiKey: "AIzaSyALsDSLXHw4SiOkH8NtZIy16f09jwXRSKU",
  authDomain: "farmy-ebeac.firebaseapp.com",
  databaseURL: "https://farmy-ebeac.firebaseio.com",
  projectId: "farmy-ebeac",
  storageBucket: "farmy-ebeac.appspot.com",
  messagingSenderId: "306850131136",
  appId: "1:306850131136:web:6f89b489ab288235cb1125"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();

export const storageRef = storage.ref();
export const imagesRef = storageRef.child("images");
export const getRef = ref => {
  return storage.ref(ref);
};
export const uploadImg = file => {
  let extension = file.name.substr(file.name.length - 4);
  let new_img_ref = imagesRef.child(uuidv4() + extension);
  return new_img_ref.put(file);
};
export const getImg = (ref, loc) => {
  return getRef(ref).getDownloadURL().then(function (url) {
    document.getElementById(loc).src = url;
    console.log(url);
    return url;
  });
}
export const populateImg = (ref, loc) => {
  return getRef(ref).getDownloadURL().then(function (url) {
    document.getElementById(loc).style.backgroundImage = "url(" + url + ")";
    console.log(url);
    return url;
  });
};