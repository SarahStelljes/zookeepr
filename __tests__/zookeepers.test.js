const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Zack", id: "dksldflkjd212"},
        zookeepers
    );

    expect(zookeeper.name).toBe("Zack");
    expect(zookeeper.id).toBe("dksldflkjd212");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Taj",
            age: 22,
            favoriteAnimal: "Noble Dragon Horse (Mythical Beast)"
        },
        {
            id: "3",
            name: "Aura",
            age: 21,
            favoriteAnimal: "Panda"
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 22 }, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Taj",
            age: 22,
            favoriteAnimal: "Noble Dragon Horse (Mythical Beast)"
        },
        {
            id: "3",
            name: "Aura",
            age: 21,
            favoriteAnimal: "Panda"
        },
    ];
    const result = findById("3", startingZookeepers);
    expect(result.name).toBe("Aura");
});

test("validates age", () => {
    const zookeeper = {
        id: "2",
        name: "Taj",
        age: 22,
        favoriteAnimal: "Noble Dragon Horse (Mythical Beast)"
    };
    const invalidZookeeper = {
        id: "3",
        name: "Aura",
        age: "21",
        favoriteAnimal: "Panda",
    };
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});