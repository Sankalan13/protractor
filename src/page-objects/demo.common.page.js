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
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class AngularHomepage {
    constructor() {
        this.nameInput = protractor_1.element(protractor_1.by.model('yourName'));
        this.greeting = protractor_1.element(protractor_1.by.binding('yourName'));
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.get('http://www.angularjs.org');
        });
    }
    setName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nameInput.sendKeys(name);
        });
    }
    // getGreeting returns a native Promise<string>
    getGreeting() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.greeting.getText();
        });
    }
}
exports.AngularHomepage = AngularHomepage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5jb21tb24ucGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlbW8uY29tbW9uLnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBZ0Q7QUFFaEQsTUFBYSxlQUFlO0lBQTVCO1FBQ0UsY0FBUyxHQUFHLG9CQUFPLENBQUMsZUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzFDLGFBQVEsR0FBRyxvQkFBTyxDQUFDLGVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQWM3QyxDQUFDO0lBWk8sR0FBRzs7WUFDUCxNQUFNLG9CQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRUssT0FBTyxDQUFDLElBQVk7O1lBQ3hCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUFBO0lBRUQsK0NBQStDO0lBQ3pDLFdBQVc7O1lBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2pDLENBQUM7S0FBQTtDQUNGO0FBaEJELDBDQWdCQyJ9