import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// I used these YouTube videos to help me with axios. https://www.youtube.com/watch?v=12l6lkW6JhE 
// https://www.youtube.com/watch?v=bMRrSqWFKqM 
// https://www.w3schools.com/html/html_form_attributes.asp this is for the form on lines 113-142.
// https://www.w3schools.com/jsref/event_onchange.asp this shows onchange event. 
// https://stackoverflow.com/questions/71039088/what-is-onchange-e-setnamee-target-value-in-react-mean onchange event again.
// https://stackoverflow.com/questions/2647171/understanding-try-catch-in-javascript try and catch error explained.
// https://www.w3schools.com/tags/tag_ul.asp for lines 148-160.
// https://www.w3schools.com/jsref/event_onclick.asp for button onclick.
// https://www.youtube.com/watch?v=-4XpG5_Lj_o  this shows how to use usestate and useeffect. 


// On lines 1-3 my "App.css" file is imported. React and the hooks "useState" and "useEffect" are imported.
// "useState" manages state which is variable information within a component."useEffect" is meant to do certain tasks when
// some changes occur. Finally axios is imported. It's used to fetch information from my app.

let API_URL = 'https://679ae62d747b09cdcccfec03.mockapi.io/api/salads/'

// Line 21 declares my API. 

let App = () => {
  let [allSalads, setAllSalads] = useState([]);
  let [saladKind, SetSaladKind] =  useState('');
  let [saladTopping, SetSaladTopping] = useState('');
  let [saladFlavor, SetSaladFlavor] = useState('');
  let [saladPhoto, SetSaladPhoto] = useState('');

  // On line 26, an empty array holds the state variable named "allSalads". This is what stores the list of salads. This state
  // is updated with the function "setAllSalads". On line 27, an empty string holds the state variable named "saladKind". This is
  // what stores the type of salad. This state is updated with the function "setSaladKind". On line 28, an empty string holds the state
  // variable named "saladTopping". This is what stores the type of topping. This state is updated with the function "setSaladTopping".
  // On line 29, an empty string holds the state variable named "saladFlavor". This is what stores the type of flavor. This state is updated with the function "setSaladFlavor".
  // On line 30, an empty string holds the state variable named "saladPhoto". This is what stores the URL to photos of salads. This state is updated with the function "setSaladPhoto".

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

// On lines 39-50, "useEffect" is a hook and allows the function to work. The array is empty which means that this 
// "useEffect" will work one time. Then, "fetchAllSalads", is added to the useEffect and gets or fetches information.
// "fetchAllSalads" is a function and in it, axios is used to get information from my API. "await" ensures that the code only
// runs once it gets an answer. The "catch" block catches errors in the API request. Finally, on line 49, the function "fetchAllSalads"
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

  // on lines 60-73, "createSalad" is an async function and it sends a post request to my API by utilizing axios. Lines 63-67
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

// On lines 80-92, "updateSalad" is an async function and it sends a put request to my API by utilizing axios.
// Lines 83-87 are my variables. Then, "getAllSalads" is called and gets rid of the variables to empty strings. 
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

// On lines 99-107, "deleteSalad" is an aync function and it sends my API a delete request. Await makes sure that the function only
// goes forward when the request provides a response. If the request doesn't work, the "catch" block logs the issue to the console.


return (
  <div>
    <h1>Salads</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Salad Kinds"
        value={saladKind}
        onChange={(e) => SetSaladKind(e.target.value)}
      />
      <input
        type="text"
        name="Salad Topping"
        value={saladTopping}
        onChange={(e) => SetSaladTopping(e.target.value)}
      />
      <input
        type="text"
        name="Flavor"
        value={saladFlavor}
        onChange={(e) => SetSaladFlavor(e.target.value)}
      />
      Upload Image{' '}
      <input
        type="url"
        name="Add image URL"
        value={saladPhoto}
        onChange={(e) => SetSaladPhoto(e.target.value)}
      />
    </form>

   {/* On lines 113-143, a form is created where users can do all the CRUD functions. The name fields known as
   "Salad Kinds", "Salad Topping", "Flavor", and "Salad Photo" lets users put in the details of the salad they want.
   When a user enters these salad details, the state variables become updated due to the onChange handlers on lines
   121, 127, 133, and 140. The "onSubmit" function runs when a user submits the form. */}
    <div>
      <ul>
        {allSalads.map((salad) => (
          <li key={salad.id}>
            {salad.saladKind} , {salad.saladTopping} , {salad.saladFlavor}
            <img src={`${salad.saladPhoto}`} alt={salad.saladKind} />
            <button onClick={() => updateSalad(salad.id)}>Update</button>
            <button onClick={() => deleteSalad(salad.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);



export default App;

// On lines 148-161, line 150, maps over the "allSalads" array. Then, "salad.id" which serves to identify each salad, is 
// inside of the element "<li>" along with a key prop. Different traits of the salads are inside of the <li> element. Users can
// even see a photo of their salad with line 153. Lines 154 and 155 allows users to update or delete their salad once they click
// the buttons. Finally, on line 165, the component known as "App" is exported. 

// This assignment was easier for me than the last however, I can't get my code to run properly. I've spent months working on it
//  and this is the best I could come up with. I decided to use axios instead of jquery because I found it to be easier.
// I included the sources that helped me above.

