var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/helper.ts
var helper_exports = {};
__export(helper_exports, {
  AtmosXPlacefileParser: () => AtmosXPlacefileParser,
  default: () => helper_default
});
module.exports = __toCommonJS(helper_exports);

// bootstrap.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var import_axios = __toESM(require("axios"));
var packages = { fs, path, axios: import_axios.default };

// src/helper.ts
var AtmosXPlacefileParser = class {
  /**
    * @function httpFetch
    * @description Fetches data from a given URL with optional headers.
    * 
    * @param {string} url - The URL to fetch data from.
    */
  static httpFetch(url, headers = []) {
    return new Promise((resolve, reject) => __async(null, null, function* () {
      let response = yield packages.axios.get(url, { headers, maxRedirects: 0, timeout: 5e3 });
      let validateStatus = (status2) => {
        return status2 == 200 || status2 == 500;
      };
      let { data, status } = response;
      if (validateStatus(status)) {
        return resolve({ success: true, data });
      } else {
        return reject({ success: false, error: `HTTP Error: ${status}` });
      }
    }));
  }
  /**
    * @function parsePlacefile
    * @description Parses a placefile from a URL or raw data string.
    * 
    * @param {string} placefileUrl - The URL of the placefile to parse.
    * @param {string} placefileData - The raw placefile data as a string.
    */
  static parsePlacefile(placefileData = null, placefileUrl = null, headers = []) {
    return new Promise((resolve, reject) => __async(this, null, function* () {
      if (placefileUrl != null) {
        let data = yield this.httpFetch(placefileUrl, headers);
        if (data.success) {
          placefileData = data.data;
        }
      }
      let lines = placefileData.split(/\r?\n/);
      let objects = [];
      let currentObject = {};
      for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith("//")) {
          continue;
        }
        if (line.startsWith("Line:")) {
          const parts = line.replace(`Line:`, "").trim().split(",");
          currentObject.line = { width: parseFloat(parts[0]), style: parseFloat(parts[1]), text: parts.slice(2).join(",").trim() };
          currentObject.coordinates = [];
        }
        if (line.match(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/)) {
          const coords = line.split(",");
          if (currentObject.coordinates) {
            currentObject.coordinates.push([parseFloat(coords[0]), parseFloat(coords[1])]);
          }
        }
        if (line.startsWith("Object:")) {
          const coordinates = line.replace(`Object:`, "").trim().split(",");
          currentObject.object = { coordinates: [parseFloat(coordinates[0]), parseFloat(coordinates[1])], properties: {} };
        }
        if (line.startsWith("Color:")) {
          const parts = line.replace(`Color:`, "").trim().split(" ");
          currentObject["color"] = { r: parseInt(parts[0]), g: parseInt(parts[1]), b: parseInt(parts[2]), a: parseFloat(parts[3]) };
        }
        if (line.startsWith("Icon:")) {
          const parts = line.replace(`Icon:`, "").trim().split(",");
          currentObject.icon = { x: parseFloat(parts[0]), y: parseFloat(parts[1]), color: parts[2], scale: parseFloat(parts[3]), type: parts[4], label: parts.slice(5).join(",").trim().replace(/^"|"$/g, "") };
        }
        if (line.startsWith("End:") && currentObject && Object.keys(currentObject).length > 0) {
          objects.push(currentObject);
          currentObject = {};
        }
        if (!lines.includes("End:") && currentObject && Object.keys(currentObject).length > 0) {
          objects.push(currentObject);
          currentObject = {};
        }
      }
      resolve(objects);
    }));
  }
  /**
    * @function parseTable
    * @description Parses a table-formatted placefile from a URL or raw data string.
    * 
    * @param {string} placefileUrl - The URL of the placefile to parse.
    * @param {string} placefileData - The raw placefile data as a string.
    * @param {Array} headers - Optional headers for the HTTP request.
    */
  static parseTable(placefileData = null, placefileUrl = null, headers = []) {
    return new Promise((resolve, reject) => __async(this, null, function* () {
      if (placefileUrl != null) {
        let data = yield this.httpFetch(placefileUrl, headers);
        if (data.success) {
          placefileData = data.data;
        }
      }
      let lines = placefileData.split(/\r?\n/);
      let objects = [];
      let dict = lines[0].split("|").map((key) => key.trim());
      for (let line of lines.slice(1)) {
        line = line.trim();
        if (!line || line.startsWith("//")) {
          continue;
        }
        if (line.includes("|")) {
          const parts = line.split("|");
          let obj = {};
          for (let i = 0; i < dict.length; i++) {
            obj[dict[i]] = parts[i] ? parts[i].trim() : `N/A`;
          }
          objects.push(obj);
        }
      }
      resolve(objects);
    }));
  }
  static parseGeoJSON(geojsonData = null, geojsonUrl = null, headers = []) {
    return new Promise((resolve, reject) => __async(this, null, function* () {
      if (geojsonUrl != null) {
        let data = yield this.httpFetch(geojsonUrl, headers);
        if (data.success) {
          geojsonData = data.data;
        }
      }
      let geojson = null;
      try {
        geojson = typeof geojsonData === "string" ? JSON.parse(geojsonData) : geojsonData;
      } catch (e) {
        return reject({ success: false, error: `Invalid JSON data` });
      }
      if (!geojson || !geojson.type || geojson.type !== "FeatureCollection" || !Array.isArray(geojson.features)) {
        return reject({ success: false, error: `Invalid GeoJSON data` });
      }
      let features = geojson.features.map((feature) => {
        let geometry = feature.geometry || {};
        let properties = feature.properties || {};
        let parsedFeature = { type: geometry.type || "N/A", coordinates: geometry.coordinates || [], properties };
        return parsedFeature;
      });
      resolve(features);
    }));
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
  static createPlacefile(placefileRefresh = 10, placefileThreshold = 999, placefileTitle = `Default Placefile Title`, settings = ``, data = [], type = "polygon") {
    return new Promise((resolve, reject) => {
      let placefileText = `Refresh: ${placefileRefresh}
Threshold: ${placefileThreshold}
Title: ${placefileTitle}
${settings}
`;
      if (type === "point") {
        for (let item of data) {
          let { description = `No description provided`, point = [], icon = "0,0,000,1,19", text = "0, 15, 1", title = "" } = item || {};
          if (Array.isArray(point) && point.length == 2 && typeof point[0] == "number" && typeof point[1] == "number") {
            placefileText += [`
Object: ${point[1]},${point[0]}`, `Icon: ${icon},"${description.replace(/\n/g, "\\n")}"`, `Text: ${text}, "${title.split("\n")[0]}"`, `End:
`].join("\n");
          }
        }
      } else {
        for (let item of data) {
          let { description = `No description provided`, polygon = [], rgb = `255,255,255,255` } = item || {};
          rgb = rgb.replace(/,/g, " ");
          let hasCoords = Array.isArray(polygon) && polygon.some((ring) => Array.isArray(ring) && ring.some((pt) => Array.isArray(pt) && pt.length == 2 && typeof pt[0] == "number" && typeof pt[1] == "number"));
          if (!hasCoords) continue;
          placefileText += `
Color: ${rgb}

Line: 3,0, ${description}
`;
          for (let ring of polygon) {
            for (let pt of ring) {
              if (Array.isArray(pt) && pt.length == 2) {
                placefileText += `${pt[1]},${pt[0]}
`;
              }
            }
          }
          placefileText += `End:
`;
        }
      }
      resolve(placefileText.trim());
    });
  }
};
var helper_default = AtmosXPlacefileParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AtmosXPlacefileParser
});
