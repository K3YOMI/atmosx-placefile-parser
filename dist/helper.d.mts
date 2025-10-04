declare class AtmosXPlacefileParser {
    /**
      * @function httpFetch
      * @description Fetches data from a given URL with optional headers.
      *
      * @param {string} url - The URL to fetch data from.
      */
    static httpFetch(url: string, headers?: any): Promise<any>;
    /**
      * @function parsePlacefile
      * @description Parses a placefile from a URL or raw data string.
      *
      * @param {string} placefileUrl - The URL of the placefile to parse.
      * @param {string} placefileData - The raw placefile data as a string.
      */
    static parsePlacefile(placefileData?: string, placefileUrl?: string, headers?: any): Promise<any>;
    /**
      * @function parseTable
      * @description Parses a table-formatted placefile from a URL or raw data string.
      *
      * @param {string} placefileUrl - The URL of the placefile to parse.
      * @param {string} placefileData - The raw placefile data as a string.
      * @param {Array} headers - Optional headers for the HTTP request.
      */
    static parseTable(placefileData?: string, placefileUrl?: string, headers?: any): Promise<any>;
    static parseGeoJSON(geojsonData?: string, geojsonUrl?: string, headers?: any): Promise<any>;
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
    static createPlacefile(placefileRefresh?: number, placefileThreshold?: number, placefileTitle?: string, settings?: string, data?: any[], type?: 'polygon' | 'point'): Promise<any>;
}

export { AtmosXPlacefileParser, AtmosXPlacefileParser as default };
