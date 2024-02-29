const data = {
    "0": {
        "imageAlt": "Image of Bhoomi's Organic Salad Bowl",
        "itemName": "ORGANIC QUINOA BOWL",
        "itemDesc": "Warm, aromatic, protein-rich super grain"
    },
    "1": {
        "imageAlt": "Image of Bhoomi's Organic Salad Bowl",
        "itemName": "ORGANIC SALAD BOWL",
        "itemDesc": "Organic spring mix with house aged balsamic"
    },
    "2": {
        "imageAlt": "Image of Bhoomi's Basmati Rice Bow",
        "itemName": "BASMATI RICE BOWL",
        "itemDesc": "Fragrant and incredibly flavorful basmati rice"
    },
    "3": {
        "imageAlt": "Image of Bhoomi's Whole Grain Phulka",
        "itemName": "WHOLE GRAIN PHULKA",
        "itemDesc": "Fragrant and incredibly flavorful basmati rice"
    },
    "4": {
        "imageAlt": "Image of Bhoomi's Grilled Naan",
        "itemName": "GRILLED NAAN",
        "itemDesc": "Leaved, over grilled naan bread with a touch of tikka masala sauce. Topped with kebab, veggies, sauce, and a sprinkle of cheese"
    },
    "5": {
        "imageAlt": "Image of Bhoomi's Organic, Pasture Raised Chicken\"",
        "itemName": "ORGANIC, PASTURE RAISED CHICKEN",
        "itemDesc": null
    },
    "6": {
        "imageAlt": "Image of Bhoomi's Beef Kebab",
        "itemName": "MELT-IN-YOU-MOUTH BEEF KEBAB",
        "itemDesc": null
    },
    "7": {
        "imageAlt": "Image of Bhoomi's Paneer",
        "itemName": "ORGANIC, GRASS-FED PANEER (FRESH CHEESE)",
        "itemDesc": null
    },
    "8": {
        "imageAlt": "Image of Bhoomi's MSC Certified Salmon",
        "itemName": "MSC CERTIFIED SALMON",
        "itemDesc": null
    },
    "9": {
        "imageAlt": "Image of Bhoomi's Shrimp",
        "itemName": "TIGER PRAWN JUMBO SHRIMP",
        "itemDesc": null
    },
    "10": {
        "imageAlt": "Image of Bhoomi's Vegan Kebab",
        "itemName": "VEGAN KEBAB (PLANT-BASED PROTEIN)",
        "itemDesc": null
    },
    "11": {
        "imageAlt": "Image of Bhoomi's Cauliflower",
        "itemName": "CHARRED, SPICED CAULIFLOWER",
        "itemDesc": null
    },
    "12": {
        "imageAlt": "Image of Bhoomi's Veggie Topping",
        "itemName": "TOPPED WITH VEGGIES",
        "itemDesc": "Fresh-cut red cabbage slaw, red & yellow peppers, scallions, house pickled apple cider red onions"
    },
    "13": {
        "imageAlt": "Image of Bhoomi Sauce",
        "itemName": "BHOOMI",
        "itemDesc": "Tangy and cooling, made with fresh herbs. Recommended with chicken, paneer, salmon, cauliflower, and prawn"
    },
    "14": {
        "imageAlt": "Image of Tikka Masala Sauce",
        "itemName": "CREAMY TIKKA MASALA SAUCE",
        "itemDesc": "The most famous of Indian sauces with a tomato base. Recommended with chicken, paneer, and prawn"
    },
    "15": {
        "imageAlt": "Image of Chimmichutney",
        "itemName": "CHIMMICHUTNEY",
        "itemDesc": "Olive oil based chimmichurri style sauce with fresh herbs and fresh garlic. Recommended with steak, beef, and vegan kebab"
    },
    "16": {
        "imageAlt": "Image of Mirchup Sauce",
        "itemName": "MIRCHUP",
        "itemDesc": "Spicy sauce using San Marzano tomatoes. Great to top on anything you want spicier, especially paneer and prawn"
    },
    "17": {
        "imageAlt": "Image of Bhoomi's Grass-fed Steak",
        "itemName": "GRASS-FED STEAK",
        "itemDesc": null
    }
}


const convertMapToArray = (map) => {
    const result = [];
    for (const key in map) {
        result.push(map[key]);
    }
    return result;
};

console.log(convertMapToArray(data));
