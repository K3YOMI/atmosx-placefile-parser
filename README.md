# AtmosphericX - Placefile Parser and Creation Tool

This repository provides a simple way to create and parse placefiles which are used in various weather applications such as GRLevel2, GRLevel3, SupercellWx, and more. 
Placefiles are text files that contain geographic data and metadata, allowing users to visualize weather-related information on maps. 

If you prefer a no-code approach, check out our comprehensive project, [AtmosphericX](https://github.com/k3yomi/AtmosphericX), which leverages this codebase to deliver an intuitive and user friendly experience for weather data analysis and visualization.

## Installation Guide
To install this package, you can use **NPM** (Node Package Manager). Open your terminal and run the following command:

```bash
npm install atmosx-placefile-parser
```

## Usage
```js
const {AtmosXTempestPulling} = require(`atmosx-placefile-parser`); // CJS
import * as AtmosXTempestPulling from 'atmosx-placefile-parser'; // ESM
```

## Functions and Methods
You can also use various functions provided by the package. Here are some examples:
```js
// Parse a placefile from a URL to a string of text. The URL / headers itself is optional and can be left undefined.
AtmosXPlacefileParser.parsePlacefile(data: string, url: string, headers: any[]).then((table) => {
    console.log(table)
})
```

```js
// Parse a GeoJSON from a URL to a string of text. The URL / headers itself is optional and can be left undefined.
AtmosXPlacefileParser.parseGeoJSON(data: string, url: string, headers: any[]).then((table) => {
    console.log(table)
})
```


```js
// Parse a table from a URL to a string of text. The URL / headers itself is optional and can be left undefined.
AtmosXPlacefileParser.parseTable(data: string, url: string, headers: any[]).then((table) => {
    console.log(table)
})
```

```js
// Create a placefile from various parameters and data. (Must be valid placefile data)
AtmosXPlacefileParser.createPlacefile(refresh: int, threshold: int, title: string, settings: string, data: any[], type: [`polygon` | `point`]).then((placefileText) => {
    console.log(placefileText)
})
```

## Credits
This parser is developed and maintained by [K3YOMI](https://github.com/K3YOMI) and the AtmosphericX Team. It is open-source and available for contributions and improvements. If you find any issues or have suggestions, feel free to open an issue or submit a pull request in the repository.
