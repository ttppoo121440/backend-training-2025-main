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
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
//init
var purchaseRecords = [];
var members = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Evan",
    "Fiona",
    "George",
    "Hannah",
];
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function cmd() {
    console.log("[\u6307\u4EE4]:\n \u4F7F\u7528\u9810\u8A2D\u8CC7\u6599:--default \n \u6E05\u7A7A\u8CC7\u6599\u6307\u4EE4\uFF1A--clear \n \u7D50\u675F\u6307\u4EE4\uFF1A--exit\n \u7372\u53D6\u7E3D\u91D1\u984D\uFF1A--cal\n \u7BE9\u9078\u70BA\u8CFC\u8CB7\uFF1A--filter\n \u986F\u793A\u76EE\u524D\u6B77\u53F2\u8CC7\u6599\uFF1A--his\n \u986F\u793A\u6307\u4EE4\uFF1A--help\n \u76EE\u524D\u6703\u54E1:".concat(members, "\n ==================\u6A02\u5475\u5475\u5065\u8EAB\u623F-\u8CFC\u8CB7\u8AB2\u7A0B\u958B\u59CB=====================\n "));
}
function AppStart() {
    rl.question("請輸入您的名字 :", function (input) {
        handleInput(input.trim());
    });
}
//course role
function getPriceCourse(CourseNum) {
    var coursePrice = [
        { name: "1-10 堂", price: 1500, limit: 10 },
        { name: "11-20 堂", price: 1300, limit: 20 },
        { name: "21 堂以上", price: 1100 },
    ];
    var resData = coursePrice.find(function (course) { return course.limit === undefined || CourseNum <= course.limit; });
    if (resData) {
        return resData;
    }
    throw new Error(" course number 異常");
}
// get default
function getDefaultValue() {
    addPurchaseRecord({ name: "Alice", courseCount: 4 });
    addPurchaseRecord({ name: "Bob", courseCount: 12 });
    addPurchaseRecord({ name: "Charlie", courseCount: 25 });
    addPurchaseRecord({ name: "Hannah", courseCount: 50 });
    console.log("\u5DF2\u8F09\u5165\u9810\u8A2D\u8CC7\u6599");
}
// add record
function addPurchaseRecord(data) {
    var Record = __assign(__assign({}, data), { Role: getPriceCourse(data.courseCount), createdAt: new Date() });
    purchaseRecords.push(Record);
    console.log("\u65B0\u589E\u8CFC\u8CB7\u8A18\u9304\u6210\u529F\uFF01\u6703\u54E1 ".concat(Record.name, " \u8CFC\u8CB7 ").concat(Record.courseCount, "  \u5802\u8AB2\uFF0C\u7E3D\u91D1\u984D\u70BA ").concat(Record.courseCount * Record.Role.price, " \u5143\u3002"));
}
//clear
function deleteRecords() {
    purchaseRecords = [];
    console.log("已清空所有資料。");
}
//show history
function showCourseRecords() {
    console.log(purchaseRecords);
}
//calculateTotalPrice
function getTotalPrice() {
    return purchaseRecords.reduce(function (total, record) { return total + record.courseCount * record.Role.price; }, 0);
}
function filterNoBuyMember() {
    console.log("\n===============[ \u986F\u793A\u672A\u8CFC\u8CB7\u8AB2\u7A0B\u6703\u54E1 ]===============");
    //知識點:Set會自動替除重複資料
    var buyers = new Set(purchaseRecords.map(function (record) { return record.name; }));
    return members.filter(function (member) { return !buyers.has(member); });
}
//filter
// 處理輸入的函式
function handleInput(input) {
    switch (input) {
        //顯示已購買會員
        case "--filter":
            console.log(filterNoBuyMember());
            break;
        //目前的總營業額
        case "--cal":
            console.log("\u76EE\u524D\u7684\u7E3D\u71DF\u696D\u984D \uFF1A".concat(getTotalPrice(), "\u5143"));
            break;
        //目前的營業紀錄
        case "--his":
            showCourseRecords();
            break;
        //寫入預設資料
        case "--default":
            getDefaultValue();
            break;
        //清空所有資料
        case "--clear":
            deleteRecords();
            break;
        //顯示指令
        case "--help":
            console.log("\x1Bc");
            cmd();
            break;
        case "--exit":
            console.log("程式結束。");
            rl.close(); // 結束程序
            return;
        default:
            if (members.includes(input)) {
                rl.question("請輸入課堂數量: ", function (inputCount) {
                    var count = Number(inputCount);
                    if (isNaN(count) || !Number.isInteger(count) || count <= 0) {
                        console.log("課堂數量必須是一個正整數！請重新輸入");
                    }
                    else {
                        addPurchaseRecord({ name: input, courseCount: count });
                        console.log("\u8CC7\u6599\u65B0\u589E\u5B8C\u6210: \u540D\u7A31=".concat(input, ", \u8AB2\u5802\u6578\u91CF=").concat(inputCount, "\n[\u4E0B\u4E00\u4F4D]"));
                    }
                    AppStart();
                });
            }
            else {
                console.log("\u9019\u4F4D\u6703\u54E1:".concat(input, "\u5C1A\u672A\u8A3B\u518A\u5594\uFF01"));
            }
            break;
    }
    // restart
    AppStart();
}
// start
cmd();
AppStart();
//第一階段：新增課程購買記錄（優惠定價）
//第二階段：計算目前的總營業額
//第三階段：篩選出還沒有購課的會員
/*
題目 - 樂呵呵健身房
樂呵呵健身房目前有 8 位會員

第一階段：新增課程購買記錄（優惠定價）
撰寫函式 addPurchaseRecord，用於新增會員購買課程的記錄，並依購買數量套用優惠價格：

購買數量 / 單價 (每堂課)

1-10 堂 / 1500 元
11-20 堂 / 1300 元
21 堂以上 / 1100 元

記錄內容：

會員名稱 (name)：字串
購買課程數量 (courses)：數字
課程單價（自動計算）
總金額（courses × 單價）
功能要求：
使用陣列 purchaseRecords 儲存每筆記錄。
如果輸入無效（如名稱為空或數值不正確），提示輸入錯誤，並不儲存該記錄。
成功新增後，印出「新增購買記錄成功！會員 [會員名稱] 購買 [數量] 堂課，總金額為 [金額] 元。」
舉例：
addPurchaseRecord("Alice", 4); >> 印出 console.log 文字為 新增購買記錄成功！會員 Alice 購買 4 堂課，總金額為 6000 元。
addPurchaseRecord("Bob", 12); >> 印出 console.log 文字為 新增購買記錄成功！會員 Bob 購買 12 堂課，總金額為 15600 元。
addPurchaseRecord("Charlie", 25); >> 印出 console.log 文字為 新增購買記錄成功！會員 Charlie 購買 25 堂課，總金額為 27500 元。
addPurchaseRecord("Hannah", 50); >> 印出 console.log 文字為 新增購買記錄成功！會員 Hannah 購買 50 堂課，總金額為 55000 元。
addPurchaseRecord("名稱", “課程數量”); >> 印出 console.log 文字為 輸入錯誤，請輸入有效的會員名稱和課程數量。


第二階段：計算目前的總營業額
新增函式 calculateTotalPrice，計算目前的總營業額為多少。

印出 console.log 文字為 目前總營業額為 ${totalPrice} 元

第三階段：篩選出還沒有購課的會員
新增函式 filterNoPurchaseMember，篩選特定條件的會員記錄。例如：未購買過課程的會員，並依序列出

印出 console.log 文字為 未購買課程的會員有：....... */
