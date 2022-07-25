const { animals } = require('./data/animals.json');
const express = require('express');

const app = express();

// the filter by query function
function filterByQuery(query, animalsArray){
    // is an array for personality traits of (an) animal(s)
    let personalityTraitsArray = [];
    // sets filtered results to be the animals data from the animals.json file. It is pulled from the app.get.
    let filteredResults = animalsArray;

    if(query.personalityTraits) {
        // Save personality traits as a dedicated array.
        // if personalityTraits is a string, place it into a new array and save.
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // loop through each trait in the persoalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one
            // of the traits when the .forEach() loop is finsihed.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    
    // if the query is about the diet of animals, will set the filteredResults to be only the animals with the queried diet.
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    // if the query is about a species, will set the filteredResults to be only the animals of the specified species.
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    // if the query is about a name of an animal, will set the filteredResults to be about the specific animal that is queried.
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // give's the results back to app.get's function.
    return filteredResults;
}

// sets where the api is located, and makes a function with the params req an res.
app.get('/api/animals', (req, res) => {
    // results is the animal data from the animals.json file.
    let results = animals;
    // if there is a query request...
    if (req.query) {
        // the new results will be the filtered query by using the filterByQuery function.
        results = filterByQuery(req.query, results);
    }
    // NOT SURE, GOTTA GO BACK AND READ
    res.json(results);
});

// makes the app listen for anything on port 3001
app.listen(3001, () => {
    // tells us the app is on server port 3001
    console.log(`API server now on port 3001!`);
});