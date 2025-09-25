/*
                                            _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                                 
                                     |_|                                                                                                                
    
    Written by: k3yomi@GitHub                        
*/

import * as loader from '../bootstrap';

export class AtmosXPlacefileParser { 


    /**
      * @function httpFetch
      * @description Fetches data from a given URL with optional headers.
      * 
      * @param {string} url - The URL to fetch data from.
      */

    static httpFetch(url: string, headers: any = []): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let response = await loader.packages.axios.get(url, { headers: headers, maxRedirects: 0, timeout: 5000 })
            let validateStatus = (status: number) => { return status == 200 || status == 500 }
            let { data, status } = response
            if (validateStatus(status)) {
                return resolve({success: true, data: data})
            } else {
                return reject({success: false, error: `HTTP Error: ${status}`})
            }
        })
    }

    /**
      * @function parsePlacefile
      * @description Parses a placefile from a URL or raw data string.
      * 
      * @param {string} placefileUrl - The URL of the placefile to parse.
      * @param {string} placefileData - The raw placefile data as a string.
      */

    static parsePlacefile(placefileData: string = null, placefileUrl: string = null, headers: any = []): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (placefileUrl != null) {
                let data = await this.httpFetch(placefileUrl, headers)
                if (data.success) { placefileData = data.data }
            }
            let lines = placefileData.split(/\r?\n/)
            let objects = []
            let currentObject: any = {}
            for (let line of lines) {
                line = line.trim()
                if (!line || line.startsWith('//')) { continue }
                if (line.startsWith('Line:')) {
                    const parts = line.replace(`Line:`, '').trim().split(',')
                    currentObject.line = { width: parseFloat(parts[0]), style: parseFloat(parts[1]), text: parts.slice(2).join(',').trim() }
                    currentObject.coordinates = []
                }
                if (line.match(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/)) {
                    const coords = line.split(',')
                    if (currentObject.coordinates) { currentObject.coordinates.push([parseFloat(coords[0]), parseFloat(coords[1])]) }
                }
                if (line.startsWith('Object:')) {
                    const coordinates = line.replace(`Object:`, '').trim().split(',')
                    currentObject.object = {  coordinates: [parseFloat(coordinates[0]), parseFloat(coordinates[1])], properties: {} }
                }
                if (line.startsWith('Color:')) {
                    const parts = line.replace(`Color:`, '').trim().split(' ')
                    currentObject['color'] = { r: parseInt(parts[0]), g: parseInt(parts[1]), b: parseInt(parts[2]), a: parseFloat(parts[3]) }
                }
                if (line.startsWith('Icon:')) {
                    const parts = line.replace(`Icon:`, '').trim().split(',')
                    currentObject.icon = { x: parseFloat(parts[0]), y: parseFloat(parts[1]), color: parts[2], scale: parseFloat(parts[3]), type: parts[4], label: parts.slice(5).join(',').trim().replace(/^"|"$/g, '') }
                }
                if (line.startsWith('End:') && currentObject && Object.keys(currentObject).length > 0) {
                    objects.push(currentObject);
                    currentObject = {}
                }
                if (!lines.includes('End:') && currentObject && Object.keys(currentObject).length > 0) {
                    objects.push(currentObject); 
                    currentObject = {} 
                }
            }
            resolve(objects)
        })
    }

    /**
      * @function parseTable
      * @description Parses a table-formatted placefile from a URL or raw data string.
      * 
      * @param {string} placefileUrl - The URL of the placefile to parse.
      * @param {string} placefileData - The raw placefile data as a string.
      * @param {Array} headers - Optional headers for the HTTP request.
      */

    static parseTable(placefileData: string = null, placefileUrl: string = null,  headers: any = []): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (placefileUrl != null) {
                let data = await this.httpFetch(placefileUrl, headers)
                if (data.success) { placefileData = data.data }
            }
            let lines = placefileData.split(/\r?\n/)
            let objects = []
            let dict = lines[0].split('|').map((key) => key.trim())
            for (let line of lines.slice(1)) {
                line = line.trim()
                if (!line || line.startsWith('//')) { continue }
                if (line.includes('|')) {
                    const parts = line.split('|')
                    let obj: any = {}
                    for (let i = 0; i < dict.length; i++) { obj[dict[i]] = parts[i] ? parts[i].trim() : `N/A` }
                    objects.push(obj)
                }
            }
            resolve(objects)
        })
    }

    /**
      * @function createPlacefile
      * @description Creates a placefile string from provided data and settings.
      * 
      * @param {number} placefileRefresh - Refresh interval in minutes.
      * @param {number} placefileThreshold - Threshold value.
      * @param {string} placefileTitle - Title of the placefile.
      * @param {string} settings - Additional settings for the placefile.
      * @param {Array} data - Array of data objects to include in the placefile.
      * @param {string} type - Type of placefile ('polygon' or 'point').
      */

    static createPlacefile(placefileRefresh: number = 10, placefileThreshold: number = 999, placefileTitle: string = `Default Placefile Title`, settings: string = ``, data: any[] = [], type: 'polygon' | 'point' = 'polygon' ): Promise<any> {
        return new Promise((resolve, reject) => {
            let placefileText = `Refresh: ${placefileRefresh}\nThreshold: ${placefileThreshold}\nTitle: ${placefileTitle}\n${settings}\n`
            if (type === 'point') {
                for (let item of data) {
                    let { description = `No description provided`, point = [], icon = '0,0,000,1,19', text = '0, 15, 1', title = '' } = item || {};
                    if (Array.isArray(point) && point.length == 2 && typeof point[0] == 'number' && typeof point[1] == 'number') {
                        placefileText += [ `\nObject: ${point[1]},${point[0]}`, `Icon: ${icon},"${description.replace(/\n/g, '\\n')}"`, `Text: ${text}, "${title.split('\n')[0]}"`, `End:\n` ].join('\n');
                    }
                }
            } else {
                for (let item of data) {
                    let { description = `No description provided`, polygon = [], rgb = `255,255,255,255` } = item || {};
                    rgb = rgb.replace(/,/g, ' ');
                    let hasCoords = Array.isArray(polygon) && polygon.some(ring => Array.isArray(ring) && ring.some(pt => Array.isArray(pt) && pt.length == 2 && typeof pt[0] == 'number' && typeof pt[1] == 'number'));
                    if (!hasCoords) continue;
                    placefileText += `\nColor: ${rgb}\n\nLine: 3,0, ${description}\n`;
                    for (let ring of polygon) {
                        for (let pt of ring) {
                            if (Array.isArray(pt) && pt.length == 2) { placefileText += `${pt[1]},${pt[0]}\n`; }
                        }
                    }
                    placefileText += `End:\n`;
                }
            }
            resolve(placefileText.trim())
        })
    }

}

module.exports = AtmosXPlacefileParser
