"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var knex_1 = __importDefault(require("knex"));
// @ts-ignore
var knexConfig = __importStar(require("../../knexfile"));
require("dotenv").config();
var db;
console.log(knexConfig);
if (process.env.NODE_ENV != "development") {
    console.log(knexConfig);
    db = knex_1.default({
        client: "pg",
        connection: process.env.DATABASE_URL
    });
}
else {
    db = knex_1.default(knexConfig.development);
}
var app = express_1.default();
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("abc");
});
app.get("/listings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, db("Listing").select("*")];
            case 1:
                data = _c.sent();
                _b = (_a = res).send;
                return [4 /*yield*/, Promise.all(data.map(function (elem) { return __awaiter(void 0, void 0, void 0, function () {
                        var produce, lister;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, db("Produce")
                                        .select(["name", "category"])
                                        .where({ produce_id: elem.produce })];
                                case 1:
                                    produce = _a.sent();
                                    return [4 /*yield*/, db("User")
                                            .select("*")
                                            .where({ id: elem.lister })];
                                case 2:
                                    lister = _a.sent();
                                    elem.produce = produce;
                                    elem.lister = lister;
                                    return [2 /*return*/, elem];
                            }
                        });
                    }); }))];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get("/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, db("User").select("*")];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get("/requests", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, db("Request").select("*")];
            case 1:
                data = _c.sent();
                _b = (_a = res).send;
                return [4 /*yield*/, Promise.all(data.map(function (elem) { return __awaiter(void 0, void 0, void 0, function () {
                        var requester, produce;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, db("User")
                                        .select("*")
                                        .where({ id: elem.requester })];
                                case 1:
                                    requester = _a.sent();
                                    return [4 /*yield*/, db("Produce")
                                            .select(["name", "category"])
                                            .where({ produce_id: elem.produce })];
                                case 2:
                                    produce = _a.sent();
                                    elem.requester = requester;
                                    elem.produce = produce;
                                    return [2 /*return*/, elem];
                            }
                        });
                    }); }))];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.listen(9999, function () {
    console.log("Listening on 9999");
});
