const {AtmosXPlacefileParser} = require(`dist/src/helper.js`);


AtmosXPlacefileParser.parseTable(null, `https://www.grlevelx.com/lsr/lsr_latest.txt`).then(table => {
    console.log(table)
})
AtmosXPlacefileParser.parsePlacefile(null, `https://www.spotternetwork.org/feeds/gr.txt`).then(table => {
    console.log(table)
})

AtmosXPlacefileParser.parseGeoJSON(null, `https://data2.weatherwise.app/mesoscale-discussions/USA.geojson`).then(table => {
    console.log(table)
})

AtmosXPlacefileParser.createPlacefile(10, 999, `Placefile Title`, 'Font: 1, 11, 0, "Courier New"', [
    { description: 'Sample polygon', polygon: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]], rgb: '255,0,0,128'}
], 'polygon').then(placefile => {
    console.log(placefile)
})

