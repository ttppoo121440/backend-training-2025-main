type record = {
  name: string;
  courseCount: number;
};
type purchaseRecord = record & {
  Role: CourseRole;
  createdAt: Date;
};
type CourseRole = {
  name: string;
  price: number;
  limit?: number;
};

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

function getCoursePrice(CourseNum: number) {
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

function getDefaultValue() {
  console.log(`已載入預設資料`);
}

function addPurchaseRecord(data: record) {
  const Record = {
    ...data,
    Role: getCoursePrice(data.courseCount),
    createdAt: new Date(),
  };
  purchaseRecords.push(Record);

  console.log(
    `新增購買記錄成功！會員 ${Record.name} 購買 ${
      Record.courseCount
    }  堂課，總金額為 ${Record.courseCount * Record.Role.price} 元。`
  );
}

function getTotalPrice() {
  return purchaseRecords.reduce(
    (total, record) => total + record.courseCount * record.Role.price,
    0
  );
}

function filterNoBuyMember() {
  console.log(`[ 顯示未購買課程會員 ]`);
  const buyers = new Set(purchaseRecords.map((record) => record.name));
  return members.filter((member) => !buyers.has(member));
}

addPurchaseRecord({ name: "Alice", courseCount: 4 });
addPurchaseRecord({ name: "Bob", courseCount: 12 });
addPurchaseRecord({ name: "Charlie", courseCount: 25 });
addPurchaseRecord({ name: "Hannah", courseCount: 50 });

console.log(`目前的總營業額 ：${getTotalPrice()}元`);

console.log(filterNoBuyMember());
