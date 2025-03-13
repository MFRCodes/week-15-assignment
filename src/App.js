import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// I used these YouTube videos to help me with axios. https://www.youtube.com/watch?v=12l6lkW6JhE 
// https://www.youtube.com/watch?v=bMRrSqWFKqM 
// https://www.w3schools.com/html/html_form_attributes.asp this is for the form on lines 118-123.
// https://www.w3schools.com/jsref/event_onchange.asp this shows onchange event. 
// https://www.youtube.com/watch?v=4uDKxoBJCBs onchange event again.
// https://www.w3schools.com/js/js_errors.asp#:~:text=JavaScript%20try%20and%20catch,occurs%20in%20the%20try%20block. try and catch error explained.
// https://www.w3schools.com/tags/tag_ul.asp for lines 132 and 141.
// https://www.w3schools.com/jsref/event_onclick.asp for button onclick.
// https://www.youtube.com/watch?v=-4XpG5_Lj_o  this shows how to use usestate and useeffect. 
// https://www.w3schools.com/jsref/event_onsubmit.asp shows on submit on line 118.
// https://www.w3schools.com/react/react_es6_array_methods.asp shows the map method.


// On lines 1-3 my "App.css" file is imported. React and the hooks "useState" and "useEffect" are imported.
// "useState" manages state which is variable information within a component."useEffect" is meant to do certain tasks when
// some changes occur. Finally axios is imported. It's used to fetch information from my app.

let API_URL = 'https://679ae62d747b09cdcccfec03.mockapi.io/api/salads/'

// Line 23 declares my API. 

let App = () => {
  let [allSalads, setAllSalads] = useState([]);
  let [saladKind, SetSaladKind] =  useState('');
  let [saladTopping, SetSaladTopping] = useState('');
  let [saladFlavor, SetSaladFlavor] = useState('');
  let [saladPhoto, SetSaladPhoto] = useState('');

  // On line 27, an empty array holds the state variable named "allSalads". This is what stores the list of salads. This state
  // is updated with the function "setAllSalads". On line 29, an empty string holds the state variable named "saladKind". This is
  // what stores the type of salad. This state is updated with the function "setSaladKind". On line 30, an empty string holds the state
  // variable named "saladTopping". This is what stores the type of topping. This state is updated with the function "setSaladTopping".
  // On line 31, an empty string holds the state variable named "saladFlavor". This is what stores the type of flavor. This state is updated with the function "setSaladFlavor".
  // On line 32, an empty string holds the state variable named "saladPhoto". This is what stores the URL to photos of salads. This state is updated with the function "setSaladPhoto".

  useEffect(() => {
  let fetchAllSalads = async () => {
    try {
  let response = await axios.get (API_URL);
  setAllSalads (response.data);
  }
  catch (error) {
    (console.error(error)); 
  }
};
fetchAllSalads (); 
  }, []);

}

// On lines 41-52, "useEffect" is a hook and allows the function to work. The array is empty which means that this 
// "useEffect" will work one time. Then, "fetchAllSalads", is added to the useEffect and gets or fetches information.
// "fetchAllSalads" is a function and in it, axios is used to get information from my API. "await" ensures that the code only
// runs once it gets an answer. The "catch" block catches errors in the API request. Finally, on line 51, the function "fetchAllSalads"
//  begins gathering the information. 

let createSalad = async () => {
  try {
    let response = await axios.post (API_URL, {saladKind, saladTopping, saladFlavor, saladPhoto })
      getAllSalads();
      SetSaladKind('');
      SetSaladTopping('');
      SetSaladFlavor('');
      SetSaladPhoto('');
      (response.data);
    }
    catch (error) {
      (console.error(error)); 
    }
  };

  // on lines 62-75, "createSalad" is an async function and it sends a post request to my API by utilizing axios. Lines 65-69
  // are my variables. Afterwards, "getAllSalads" is called and gets rid of the aforementioned variables to empty strings. 
  // Finally, the "catch" block catches errors in the API request. It will log the issue to the console.


let updateSalad = async () => {       
  try {
  let response = await axios.put(API_URL, { saladKind, saladTopping, saladFlavor, saladPhoto })
      getAllSalads();
      SetSaladKind('');
      SetSaladTopping('');
      SetSaladFlavor('');
      SetSaladPhoto('');
      (response.data);
    }
    catch (error) {
    (console.error(error));
    } 
};

// On lines 82-95, "updateSalad" is an async function and it sends a put request to my API by utilizing axios.
// Lines 85-89 are my variables. Then, "getAllSalads" is called and gets rid of the variables to empty strings. 
// If the put request doesn't work, the "catch" block will log the issue to the console. 

let deleteSalad = async (Id) => {
  try {
  let response = await axios.delete(API_URL)
  (response.data);
  }
  catch (error) {
    (console.error(error));
    } 
};

// On lines 101-109, "deleteSalad" is an aync function and it sends my API a delete request. Await makes sure that the function only
// goes forward when the request provides a response. If the request doesn't work, the "catch" block logs the issue to the console.


return (
  <div>
    <h1>Salads</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" name="Salad Kinds" value={saladKind} onChange={(e) => SetSaladKind(e.target.value)}> 
      <input type="text" name="Salad Topping" value={saladTopping} onChange={(e) => SetSaladTopping(e.target.value)}>
      <input type="text" name="flavor" value={saladFlavor} onChange={(e) => SetSaladFlavor(e.target.value)}>
      <input type="text" name="photo" value={saladPhoto} onChange={(e) => SetSaladPhoto(e.target.value)}>
    </form>
    

   {/* On lines 115-123, a form is created. The name fields known as
   "Salad Kinds", "Salad Topping", "Flavor", and "Salad Photo" lets users put in the details of the salad they want.
   When a user enters these salad details, the state variables become updated due to the onChange handlers.
   The "onSubmit" function runs when a user submits the form. */}

<div>
  <ul>
    {allSalads.map(({ saladKind, saladTopping, saladFlavor, saladPhoto }) => (
      <li key={id}>
        {saladKind}, {saladTopping}, {saladFlavor}
        <img src={saladPhoto}/>
        <button onClick={() => updateSalad(id)}>Update</button>
        <button onClick={() => deleteSalad(id)}>Delete</button>
      </li>
    ))}
  </ul>
</div>
);




{/* //On lines 131-142, aspects of a salad are rendered via a list when the array known as "allSalads" gets iterated over
with the map method. An image tag is used to display a photo of the salad.The event handler known as "onClick", is
set with the "update" and "delete" buttons so that users can update and delete items from the form.  

// This assignment was easier for me than the last however, I can't get my code to run properly. I've spent a long time working on it
//  and this is the best I could come up with. I decided to use axios instead of jquery because I found it to be easier.
// I included the sources that helped me above.  */}



