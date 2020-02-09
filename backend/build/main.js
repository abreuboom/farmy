"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var knexConfig = __importStar(require("../knexfile"));
// @ts-ignore
var clarifai_1 = __importDefault(require("clarifai"));
require("dotenv").config();
var clarifai = new clarifai_1.default.App({
    apiKey: process.env.CLARIFAI_API_KEY
});
var predictFood = function (rawBytes) {
    return clarifai.models.predict("bd367be194cf45149e75f01d59f77ba7", {
        base64: rawBytes
    });
};
require("dotenv").config();
var db = knex_1.default(knexConfig[process.env.NODE_ENV]);
var app = express_1.default();
app.use(body_parser_1.default.json({ limit: "5mb" }));
app.get("/", function (req, res) {
    res.send("abc");
});
app.get("/api/listings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                                    produce = (_a.sent())[0];
                                    return [4 /*yield*/, db("User")
                                            .select(["username"])
                                            .where({ id: elem.lister })];
                                case 2:
                                    lister = (_a.sent())[0];
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
app.post("/api/listings", function (_a, res) {
    var body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var newProdID, search, _b, data, E_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 8, , 9]);
                    newProdID = void 0;
                    if (!(typeof body.produce === "string")) return [3 /*break*/, 5];
                    return [4 /*yield*/, db("Produce")
                            .where({ name: body.produce })
                            .select("produce_id")];
                case 2:
                    search = _c.sent();
                    console.log(search);
                    if (!search.length) return [3 /*break*/, 3];
                    body.produce = search[0].produce_id;
                    return [3 /*break*/, 5];
                case 3:
                    _b = body;
                    return [4 /*yield*/, db("Produce").insert({
                            name: body.produce
                        }, "produce_id")];
                case 4:
                    _b.produce = (_c.sent())[0];
                    _c.label = 5;
                case 5:
                    console.log(body);
                    return [4 /*yield*/, db("Listing").insert(body, "*")];
                case 6:
                    data = (_c.sent())[0];
                    console.log(data);
                    return [4 /*yield*/, db("Produce")
                            .where({ produce_id: data.produce })
                            .increment("count", 1)];
                case 7:
                    _c.sent();
                    res.send(data);
                    return [3 /*break*/, 9];
                case 8:
                    E_1 = _c.sent();
                    console.log(E_1);
                    res.status(400);
                    res.send(E_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
});
app.get("/api/users", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!req.query.username) return [3 /*break*/, 2];
                _b = (_a = res).send;
                return [4 /*yield*/, db("User")
                        .select("*")
                        .where({ username: req.query.username })];
            case 1:
                _b.apply(_a, [(_e.sent())[0]]);
                return [3 /*break*/, 4];
            case 2:
                _d = (_c = res).send;
                return [4 /*yield*/, db("User").select("*")];
            case 3:
                _d.apply(_c, [_e.sent()]);
                _e.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
app.post("/api/users", function (_a, res) {
    var body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var address, rest, addr_id, _b, _c, e_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    address = body.address, rest = __rest(body, ["address"]);
                    addr_id = undefined;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 5, , 6]);
                    if (!(typeof address == "object")) return [3 /*break*/, 3];
                    return [4 /*yield*/, db("Address").insert(address, "address_id")];
                case 2:
                    addr_id = (_d.sent())[0];
                    _d.label = 3;
                case 3:
                    _c = (_b = res).send;
                    return [4 /*yield*/, db("User").insert(__assign(__assign({}, rest), { address_id: addr_id }), "*")];
                case 4:
                    _c.apply(_b, [(_d.sent())[0]]);
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _d.sent();
                    console.log(e_1);
                    res.status(400);
                    res.send(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
});
app.get("/api/requests", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
                                        .select("username")
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
app.get("/api/produce", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db("Produce").select("*")];
            case 1:
                data = _a.sent();
                res.send(data);
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/categories", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db("Category").select("*")];
            case 1:
                data = _a.sent();
                res.send(data);
                return [2 /*return*/];
        }
    });
}); });
app.post("/api/predict", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataURItotal, rawBytes;
    return __generator(this, function (_a) {
        dataURItotal = req.body.dataURI;
        rawBytes = dataURItotal.split(",")[1];
        try {
            console.log("start predict");
            predictFood(rawBytes).then(function (prediction) {
                console.log("end predict");
                res.send(prediction);
            }, function (err) { return console.log(err); });
        }
        catch (e) {
            res.send(e);
        }
        return [2 /*return*/];
    });
}); });
app.listen(process.env.PORT, function () {
    console.log("Listening on " + process.env.PORT);
});
