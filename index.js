"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-the-champions-f87c6-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList");

const textAreaField = document.getElementById("endorsement");
const addBtn = document.getElementById("btn");
const endorsementListEl = document.getElementById("all-endorsements");

addBtn.addEventListener("click", function () {
  let inputValue = textAreaField.value;

  push(endorsementListInDB, inputValue);
  clearTextAreaField();
});

onValue(endorsementListInDB, function (snapshot) {
  endorsementListEl.innerHTML = "";
  let itemsArray = Object.values(snapshot.val());
  for (let i = 0; i < itemsArray.length; i++) {
    appendNewEndorsement(itemsArray[i]);
  }
});

function clearTextAreaField() {
  textAreaField.value = "";
}

function appendNewEndorsement(endoValue) {
  endorsementListEl.innerHTML += `<li>${endoValue}</li>`;
}
