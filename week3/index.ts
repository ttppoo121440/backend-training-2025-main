import { error } from "console";
import * as readline from "readline";

//declare

type Record = {
  name: string;
  courseCount: number;
};
type purchaseRecord = Record & {
  Role: CourseRole;
  createdAt: Date;
};
type CourseRole = {
  name: string;
  price: number;
  limit?: number;
};

//init
let purchaseRecords: purchaseRecord[] = [];
const members = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Evan",
  "Fiona",
  "George",
  "Hannah",
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function cmd() {
  console.log(`[指令]:
 使用預設資料:--default 
 清空資料指令：--clear 
 結束指令：--exit
 獲取總金額：--cal
 篩選為購買：--filter
 顯示目前歷史資料：--his
 顯示指令：--help
 目前會員:${members}
 ==================樂呵呵健身房-購買課程開始=====================
 `);
}

function AppStart() {
  rl.question("請輸入您的名字 :", (input) => {
    handleInput(input.trim());
  });
}

//course role
function getPriceCourse(CourseNum: number) {
  const coursePrice: CourseRole[] = [
    { name: "1-10 堂", price: 1500, limit: 10 },
    { name: "11-20 堂", price: 1300, limit: 20 },
    { name: "21 堂以上", price: 1100 },
  ];
  const resData = coursePrice.find(
    (course) => course.limit === undefined || CourseNum <= course.limit
  );

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
  console.log(`已載入預設資料`);
}
// add record
function addPurchaseRecord(data: Record) {
  const Record = {
    ...data,
    Role: getPriceCourse(data.courseCount),
    createdAt: new Date(),
  };
  purchaseRecords.push(Record);

  console.log(
    `新增購買記錄成功！會員 ${Record.name} 購買 ${
      Record.courseCount
    }  堂課，總金額為 ${Record.courseCount * Record.Role.price} 元。`
  );
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
  return purchaseRecords.reduce(
    (total, record) => total + record.courseCount * record.Role.price,
    0
  );
}

function filterNoBuyMember() {
  console.log(`\n===============[ 顯示未購買課程會員 ]===============`);
  //知識點:Set會自動替除重複資料
  const buyers = new Set(purchaseRecords.map((record) => record.name));
  return members.filter((member) => !buyers.has(member));
}
//filter

// 處理輸入的函式
function handleInput(input: string) {
  switch (input) {
    //顯示已購買會員
    case "--filter":
      console.log(filterNoBuyMember());
      break;
    //目前的總營業額
    case "--cal":
      console.log(`目前的總營業額 ：${getTotalPrice()}元`);
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
        rl.question("請輸入課堂數量: ", (inputCount) => {
          const count = Number(inputCount);
          if (isNaN(count) || !Number.isInteger(count) || count <= 0) {
            console.log("課堂數量必須是一個正整數！請重新輸入");
          } else {
            addPurchaseRecord({ name: input, courseCount: count });
            console.log(
              `資料新增完成: 名稱=${input}, 課堂數量=${inputCount}\n[下一位]`
            );
          }
          AppStart();
        });
      } else {
        console.log(`這位會員:${input}尚未註冊喔！`);
      }
      break;
  }
  // restart
  AppStart();
}

// start
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
