const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

// sets where the api is located, and makes a function with the params req an res.
router.get('/animals', (req, res) => {
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

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);

    if(result){
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if(!validateAnimal(req.body)) {
        res.status(400).send("The animal is not properly formatted.");
    } else {
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
    
        res.json(animal);
    }
});

module.exports = router;