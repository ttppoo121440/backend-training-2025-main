// ### 題目一：比較運算子
// 請依序告知以下 console.Log 會顯示什麼值，
// 若不確定答案，可將 code 貼在 chrome console 顯示後，再回頭補知識點。
let a = 9;
let b = 13;
console.log(a > 0);     // 9>0 => true
console.log(b > a);     // 13>9 => true
console.log(a + b > 1); // 9+13 > 1 => true
let c = 51;
let d = 163;
console.log(c == d);    // 51==164 => false
console.log(c !== d);   // 51!==164 => true
let e = 28;
let f = 45;
console.log(f >= e);    // 45>= 28 => true
console.log(f != e);    // 45 != 28 => true
console.log(f == e);    // 45 == 28 => false

// ### 題目二：比較運算子 + 強制轉型
// 請回答每個 console.log 的值為？
let g = 8;
let h = '8';
console.log(g * h == 88); // 64 == 88 false
console.log(g * h == 64); // 64 == 64 true
console.log(g * h === 64);// 64 == 64 true

let i = '9';
let j = '9';
console.log(i + j == 99);   // '99' == 99 true
console.log(i + j === '99');// '99' == '99' true
console.log(i + j === 99);  // 64 === 64 false

var k = 3;
var l = '8';
// 請文字解釋為什麼
console.log(k * l > 21);  // 3* '8'=24,  24>21=> true

// ### 題目三：邏輯運算子 + if, else
// 情境：健身房週年慶，買課程送贈品
// 健身房準備了 280 個贈品，只要有達以下條件之一，就送會員一個贈品
// 1. 消費滿 1599 元
// 2. 是健身房的 VIP 會員
// Bob 今天來消費了 1800 元，但並非 VIP 會員
// 請問 Bob 是否有獲得贈品，以及贈品剩下多少？請完成以下修改處程式碼


class GymWeekPlan {
  //初始化
  constructor() {
    this.giftNum = 280;
    this.giftPriceRule = 1599;
  }

  // 判斷是否符合獲得贈品資格
  isGift(price, isVip) {
    return price >= this.giftPriceRule || isVip;
  }

  // 發送贈品，並更新剩餘數量
  giveGift() {
    console.log("恭喜你獲得贈品喔。");
    this.giftNum--;
  }

  // 處理客戶的贈品發放邏輯
  gameStart(price, isVip) {
    if (this.giftNum <= 0) return console.log("贈品已經發完了，下次請早！！");
    if (this.isGift(price, isVip)) return this.giveGift();
    console.log("你不合贈品資格喔。QAQ");
  }

  // 取得剩餘贈品數量
  getRemainingGifts() {
    console.log("贈品剩下：" + this.giftNum + " 個。");
  }
}

let BobPrice = 1800; /* Bob 消費金額 */
let BobIsVip = false; /* Bob 是否為 VIP */
const gymPlan = new GymWeekPlan();
gymPlan.gameStart(BobPrice, BobIsVip);
gymPlan.getRemainingGifts();

// ### 題目四：
// 健身房的業績獎金計算
// 會計官想寫一個程式，來計算教練的業績獎金，以下為條件值
// 條件一：不管有無課程，基本獎金先給 6,000元
// 條件二：全年業績在 10 萬以下者，給 10% 獎金
// 條件三：全年業績超過 10 萬 ~ 30 萬以下者，給 15% 獎金
// 條件四：全年業績超過 30 萬者，給 20% 獎金

// 例如小華的全年業績為 8 萬：80,000 * 0.1 + 6,000 總計需要支付 14,000 元獎金。

//獎金加給A 固定6000
//獎金加給B 
//      10 萬以下者，給 10% 獎金
//      10 萬 ~ 30 萬以下者，給  15%  獎金
//      30 萬以下者，給 20% 獎金

class salary {
  constructor(coachIncome, baseBonus) {
    this.coachIncome = coachIncome;
    this.baseBonus = baseBonus;
  }
  getSalary() {
    if (this.coachIncome < 100000) return this.baseBonus + 1.1 * this.coachIncome;
    if (this.coachIncome < 300000) return this.baseBonus + 1.15 * this.coachIncome;
    return this.baseBonus + 1.2 * this.coachIncome;
  }
}
let coachIncome = 240000; // 小明全年業績
let baseBonus = 6000; // 基本獎金
const memberMin = new salary(coachIncome, baseBonus);
// 練習：計算教練業績獎金

console.log(`小明總共 ${memberMin.getSalary()} 獎金`);



// ### 題目五：剪刀石頭布
// 請寫程式來判斷剪刀石頭布的輸贏
// 宣告兩個變數，一個是 playerA 另一個是 playerB
// 請透過 if, if 包 if, else if, else 等方法思考每個玩家出拳的情境


// 隨機生成電腦的選擇
const choices = ['stone', 'paper', 'scissors'];

//電腦
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// 判斷 win&lose
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'draw';
  }

  if (
    (playerChoice === choices[0] && computerChoice === choices[2]) ||
    (playerChoice === choices[1] && computerChoice === choices[0]) ||
    (playerChoice === choices[2] && computerChoice === choices[1])
  ) {
    return 'win';
  }
  return 'lose';
}
function valCheck(playerChoice) {
  if (typeof playerChoice === 'undefined' || playerChoice < 0 || playerChoice > 2) {
    console.error("請輸入0（stone）、1（paper）或2（scissors）開始遊戲");
    return true;
  }
  return false;
}


function playGame(val) {
  if (valCheck(val)) {
    return;
  }

  const playerChoice = choices[val];
  const computerChoice = getComputerChoice();
  const result = determineWinner(playerChoice, computerChoice);

  console.log(`你選擇了: ${playerChoice}`);
  console.log(`電腦選擇了: ${computerChoice}`);
  console.log(`結果是: ${result}`);
}

playGame(2);



// ### 題目六：陣列、物件變數定義
// 這是一間位於高雄市的健身房，名為「高雄市健身教練聯盟」，專注於提供高品質的健身指導服務。健身房內有多位專業教練，以下是兩位教練的詳細介紹：
/*
王教練：
- 專長：力量訓練、減重課程
- 課程：
  - 個人訓練課程：每次收費 2000 元，課程時長 60 分鐘，目前有空堂。
  - 團體訓練課程：每次收費 1500 元，課程時長 90 分鐘，目前無空堂。
- 背景介紹：王教練擁有 5 年教學經驗，專精於提升學員的肌力與減脂，適合希望快速達成體能目標的學員。
- 是否接收新學員：是

李教練：
- 專長：瑜伽、體態雕塑
- 課程：
  - 個人訓練課程：每次收費 1800 元，課程時長 50 分鐘，目前無空堂。
  - 團體訓練課程：每次收費 1200 元，課程時長 75 分鐘，目前有空堂。
- 背景介紹：李教練是一位瑜伽大師，擁有 10 年教學經驗，擅長幫助學員雕塑完美體態，適合希望改善姿態與柔軟度的學員。
- 是否接收新學員：否
*/


// 練習：使用物件變數定義兩位教練的資訊

let gymCoaches = [
  {

    name: "王教練",
    specialties: ["力量訓練", "減重課程"],
    courses: [
      {

        name: "個人訓練課程",
        fee: 2000,
        duration: 60,
        available: true,
      },
      {

        name: "團體訓練課程",
        fee: 1500,
        duration: 90,
        available: false,
      },
    ],
    background: "王教練擁有 5 年教學經驗，專精於提升學員的肌力與減脂，適合希望快速達成體能目標的學員。",
    hasNewStudents: true,
  },
  {

    name: "李教練",
    specialties: ["瑜伽", "體態雕塑"],
    courses: [
      {

        name: "個人訓練課程",
        fee: 1800,
        duration: 50,
        available: false,
      },
      {

        name: "團體訓練課程",
        fee: 1200,
        duration: 75,
        available: true,
      },
    ],
    background: "李教練是一位瑜伽大師，擁有 10 年教學經驗，擅長幫助學員雕塑完美體態，適合希望改善姿態與柔軟度的學員。",
    hasNewStudents: false,
  },
];

gymCoaches.forEach((coach) => console.log(coach));

console.log(gymCoach);

// ### 題目七：
// 主管要求健身中心的兩位教練業績都需達到 50,000元
// 請透過以下資訊修改，幫助教練業績達標！
let performanceData = {
  company: 'hahaFitness',
  bossName: 'casper',
  coaches: [
    {
      name: 'Alice',
      performance: 42000,
    },
    {
      name: 'Bob',
      performance: 38000,
    },
  ],
};

//運算是否50000
this.basePerformance = 50000;
function hasPerformance(coach) {
  if (performance < basePerformance) return console.log(`${name}: 你的績效未符合標準喔，還差${basePerformance - performance}元，要加油喔!!`);
  return console.log(`${name}: 恭喜你的績效符合標準喔，多了${performance - basePerformance}元，公司幫你加薪喔!!`);
}
performanceData.coaches.forEach((coach) => hasPerformance(coach));


// ### 題目八
/* 
使用 `物件包含物件` 的格式定義以下內容：
  - 跑步機每分鐘消耗 10 卡
  - 瑜伽每分鐘消耗 5 卡
  - 騎腳踏車每分鐘消耗 8 卡
*/
// 練習：使用 `物件包含物件` 的格式定義運動類型與每分鐘消耗卡路里

const activities = {
  treadmill: {
    id: 'Act001',
    name: '跑步機',
    calPerMin: 10
  },
  yoga: {
    id: 'Act002',
    name: '瑜伽',
    calPerMin: 5
  },
  bicycle: {
    id: 'Act003',
    name: '騎腳踏車',
    calPerMin: 8
  }
};



// ## 題目九
// 情境：算小明今天的卡路里消耗
// 承上題，根據運動類型與每分鐘消耗卡路里的變數設計，計算小明消耗的卡路里。
// 小明今天騎了 10 分鐘的腳踏車去健身房，並先跑了 30 分鐘的跑步機熱身，最後再參加了 40 分鐘的瑜伽團課，最後再騎 10 分鐘腳踏車回家。


class Sport {
  constructor(name, records) {
    this.name = name;
    this.historyRecords = records;
  }
  getName() {
    return this.name;
  }
  addRecord(records) {
    this.historyRecords.push(records);
  }
  getMyCal() {
    return this.historyRecords.reduce((totalCalories, record) => {
      // activity Mapping
      const activity = Object.values(activities).find(
        (activity) => activity.id === record.activities_id
      );
      //計算cal
      if (activity) {
        totalCalories += activity.calPerMin * parseInt(record.activeTime, 10);
      } else {
        console.warn(`activities 沒有這個 id [${record.activities_id}] 喔 確認遺下!!!`);
      }
      return totalCalories;
    }, 0);
  }
}

const records = [
  { activities_id: 'Act001', activeTime: '10' },
  { activities_id: 'Act002', activeTime: '30' },
  { activities_id: 'Act003', activeTime: '40' },
  { activities_id: 'Act001', activeTime: '10' },
];

const sportRecordsMin = new Sport('Min', records);

// 練習：計算小明今日消耗的卡路里

console.log(`${sportRecordsMin.name}今日一共消耗約 ${sportRecordsMin.getMyCal} 卡路里。`);

// ### 10. 運動量是否達標！
// 情境：小明記錄了一週內每一天的運動情況，包含運動時長（分鐘）和平均心率（次數）。
/* 現有的運動標準為「533原則」：
  1. 每週運動至少 5 次
  2. 或每週累計運動時間達 150 分鐘
  3. 每次運動必須達到 **30 分鐘** 且平均心率達 **130 次以上** 才算合格。
  
  請完成程式碼，判斷小明是否符合「533原則」。
*/

// 運動紀錄
let totalDuration = 0; // 累計符合條件的運動時間
let validDays = 0; // 符合條件的運動次數

// 小明的一週運動紀錄
const exerciseRecords = [
  { day: 'Monday', duration: 40, heartRate: 135 },
  { day: 'Tuesday', duration: 20, heartRate: 120 },
  { day: 'Wednesday', duration: 30, heartRate: 140 },
  { day: 'Friday', duration: 50, heartRate: 125 },
  { day: 'Saturday', duration: 60, heartRate: 145 },
];



function is533role() {
  const perWeekValidDays = exerciseRecords.count;
  const perWeekSportDuration = exerciseRecords.reduce((sum, record) => sum + record.duration, 0);
  let role = true;

  if (perWeekValidDays < 5) {
    console.log("每週需運動至少 5 次");
    role = false;
  }
  if (perWeekSportDuration < 150) {
    console.log("每週需累計運動時間達 150 分鐘");
    role = false;
  }

  exerciseRecords.map(record => {
    role = record.duration >= 30 && record.heartRate > 130;
    if (!role) console.log(`每次運動必須達到 **30 分鐘** 且平均心率達 **130 次以上** 才算合格。`, record);
  });
  return role;
}
is533role();