"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtmosXPlacefileParser = void 0;
var loader = __importStar(require("../bootstrap"));
var AtmosXPlacefileParser = /** @class */ (function () {
    function AtmosXPlacefileParser() {
    }
    /**
      * @function httpFetch
      * @description Fetches data from a given URL with optional headers.
      *
      * @param {string} url - The URL to fetch data from.
      */
    AtmosXPlacefileParser.httpFetch = function (url, headers) {
        var _this = this;
        if (headers === void 0) { headers = []; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var response, validateStatus, data, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, loader.packages.axios.get(url, { headers: headers, maxRedirects: 0, timeout: 5000 })];
                    case 1:
                        response = _a.sent();
                        validateStatus = function (status) { return status == 200 || status == 500; };
                        data = response.data, status = response.status;
                        if (validateStatus(status)) {
                            return [2 /*return*/, resolve({ success: true, data: data })];
                        }
                        else {
                            return [2 /*return*/, reject({ success: false, error: "HTTP Error: ".concat(status) })];
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
      * @function parsePlacefile
      * @description Parses a placefile from a URL or raw data string.
      *
      * @param {string} placefileUrl - The URL of the placefile to parse.
      * @param {string} placefileData - The raw placefile data as a string.
      */
    AtmosXPlacefileParser.parsePlacefile = function (placefileData, placefileUrl, headers) {
        var _this = this;
        if (placefileData === void 0) { placefileData = null; }
        if (placefileUrl === void 0) { placefileUrl = null; }
        if (headers === void 0) { headers = []; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var data, lines, objects, currentObject, _i, lines_1, line, parts, coords, coordinates, parts, parts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(placefileUrl != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.httpFetch(placefileUrl, headers)];
                    case 1:
                        data = _a.sent();
                        if (data.success) {
                            placefileData = data.data;
                        }
                        _a.label = 2;
                    case 2:
                        lines = placefileData.split(/\r?\n/);
                        objects = [];
                        currentObject = {};
                        for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                            line = lines_1[_i];
                            line = line.trim();
                            if (!line || line.startsWith('//')) {
                                continue;
                            }
                            if (line.startsWith('Line:')) {
                                parts = line.replace("Line:", '').trim().split(',');
                                currentObject.line = { width: parseFloat(parts[0]), style: parseFloat(parts[1]), text: parts.slice(2).join(',').trim() };
                                currentObject.coordinates = [];
                            }
                            if (line.match(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/)) {
                                coords = line.split(',');
                                if (currentObject.coordinates) {
                                    currentObject.coordinates.push([parseFloat(coords[0]), parseFloat(coords[1])]);
                                }
                            }
                            if (line.startsWith('Object:')) {
                                coordinates = line.replace("Object:", '').trim().split(',');
                                currentObject.object = { coordinates: [parseFloat(coordinates[0]), parseFloat(coordinates[1])], properties: {} };
                            }
                            if (line.startsWith('Color:')) {
                                parts = line.replace("Color:", '').trim().split(' ');
                                currentObject['color'] = { r: parseInt(parts[0]), g: parseInt(parts[1]), b: parseInt(parts[2]), a: parseFloat(parts[3]) };
                            }
                            if (line.startsWith('Icon:')) {
                                parts = line.replace("Icon:", '').trim().split(',');
                                currentObject.icon = { x: parseFloat(parts[0]), y: parseFloat(parts[1]), color: parts[2], scale: parseFloat(parts[3]), type: parts[4], label: parts.slice(5).join(',').trim().replace(/^"|"$/g, '') };
                            }
                            if (line.startsWith('End:')) {
                                objects.push(currentObject);
                                currentObject = {};
                            }
                        }
                        resolve(objects);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AtmosXPlacefileParser.parseTable = function (placefileData, placefileUrl, headers) {
        var _this = this;
        if (placefileData === void 0) { placefileData = null; }
        if (placefileUrl === void 0) { placefileUrl = null; }
        if (headers === void 0) { headers = []; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var data, lines, objects, dict, _i, _a, line, parts, obj, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(placefileUrl != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.httpFetch(placefileUrl, headers)];
                    case 1:
                        data = _b.sent();
                        if (data.success) {
                            placefileData = data.data;
                        }
                        _b.label = 2;
                    case 2:
                        lines = placefileData.split(/\r?\n/);
                        objects = [];
                        dict = lines[0].split('|').map(function (key) { return key.trim(); });
                        for (_i = 0, _a = lines.slice(1); _i < _a.length; _i++) {
                            line = _a[_i];
                            line = line.trim();
                            if (!line || line.startsWith('//')) {
                                continue;
                            }
                            if (line.includes('|')) {
                                parts = line.split('|');
                                obj = {};
                                for (i = 0; i < dict.length; i++) {
                                    obj[dict[i]] = parts[i] ? parts[i].trim() : "N/A";
                                }
                                objects.push(obj);
                            }
                        }
                        resolve(objects);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    AtmosXPlacefileParser.createPlacefile = function (placefileRefresh, placefileThreshold, placefileTitle, settings, data, type) {
        if (placefileRefresh === void 0) { placefileRefresh = 10; }
        if (placefileThreshold === void 0) { placefileThreshold = 999; }
        if (placefileTitle === void 0) { placefileTitle = "Default Placefile Title"; }
        if (settings === void 0) { settings = ""; }
        if (data === void 0) { data = []; }
        if (type === void 0) { type = 'polygon'; }
        return new Promise(function (resolve, reject) {
            var placefileText = "Refresh: ".concat(placefileRefresh, "\nThreshold: ").concat(placefileThreshold, "\nTitle: ").concat(placefileTitle, "\n").concat(settings, "\n");
            if (type === 'point') {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    var _a = item || {}, _b = _a.description, description = _b === void 0 ? "No description provided" : _b, _c = _a.point, point = _c === void 0 ? [] : _c, _d = _a.icon, icon = _d === void 0 ? '0,0,000,1,19' : _d, _e = _a.text, text = _e === void 0 ? '0, 15, 1' : _e, _f = _a.title, title = _f === void 0 ? '' : _f;
                    if (Array.isArray(point) && point.length == 2 && typeof point[0] == 'number' && typeof point[1] == 'number') {
                        placefileText += ["\nObject: ".concat(point[1], ",").concat(point[0]), "Icon: ".concat(icon, ",\"").concat(description.replace(/\n/g, '\\n'), "\""), "Text: ".concat(text, ", \"").concat(title.split('\n')[0], "\""), "End:\n"].join('\n');
                    }
                }
            }
            else {
                for (var _g = 0, data_2 = data; _g < data_2.length; _g++) {
                    var item = data_2[_g];
                    var _h = item || {}, _j = _h.description, description = _j === void 0 ? "No description provided" : _j, _k = _h.polygon, polygon = _k === void 0 ? [] : _k, _l = _h.rgb, rgb = _l === void 0 ? "255,255,255,255" : _l;
                    rgb = rgb.replace(/,/g, ' ');
                    var hasCoords = Array.isArray(polygon) && polygon.some(function (ring) { return Array.isArray(ring) && ring.some(function (pt) { return Array.isArray(pt) && pt.length == 2 && typeof pt[0] == 'number' && typeof pt[1] == 'number'; }); });
                    if (!hasCoords)
                        continue;
                    placefileText += "\nColor: ".concat(rgb, "\n\nLine: 3,0, ").concat(description, "\n");
                    for (var _m = 0, polygon_1 = polygon; _m < polygon_1.length; _m++) {
                        var ring = polygon_1[_m];
                        for (var _o = 0, ring_1 = ring; _o < ring_1.length; _o++) {
                            var pt = ring_1[_o];
                            if (Array.isArray(pt) && pt.length == 2) {
                                placefileText += "".concat(pt[1], ",").concat(pt[0], "\n");
                            }
                        }
                    }
                    placefileText += "End:\n";
                }
            }
            resolve(placefileText.trim());
        });
    };
    return AtmosXPlacefileParser;
}());
exports.AtmosXPlacefileParser = AtmosXPlacefileParser;
module.exports = AtmosXPlacefileParser;
