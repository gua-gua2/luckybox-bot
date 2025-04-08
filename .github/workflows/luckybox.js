const fetch = require("node-fetch");  // 引入 node-fetch
const moment = require("moment-timezone");  // 引入 moment-timezone

// 生成隨機的兩個數字
function generateLuckyNumbers() {
  const nums = [4, 5, 6, 7, 8, 9];
  const a = nums[Math.floor(Math.random() * nums.length)];
  let b = nums[Math.floor(Math.random() * nums.length)];
  while (b === a) b = nums[Math.floor(Math.random() * nums.length)];
  return [a, b];
}

// 取得昨天的日期並格式化為 "月日"
function getYesterdayDateText() {
  // 取得台灣時區的昨天日期
  const yesterday = moment().tz("Asia/Taipei").subtract(1, "day");
  console.log("昨天的台灣時間：", yesterday.format("YYYY-MM-DD"));  // 檢查昨天的日期
  const month = yesterday.month() + 1;  // month 是從 0 開始的，因此要加 1
  const day = yesterday.date();
  return `${month}月${day}日`;
}

// 根據生成的數字與日期，創建消息內容
function createMessage(a, b) {
  const dateText = getYesterdayDateText();  // 取得昨天的日期文字

  return `🎉 **@everyone 今日盲盒揭曉！** 🎉


📅 日期：${dateText}      🎲 數字：${a} / ${b}


🎯 **如何中獎？**  
你的對戰 ACS 數據中包含任兩碼組合，即可得獎！  
例：${a}${a}、${a}${b}、${b}${b}、1${a}${b}、1${b}${a}、1${a}${a}、2${a}${b}、2${b}${b} 等..  

📌 **請前往：** 🧧»https://ptb.discord.com/channels/1299287200697024593/1336558795651813377 登記

🕑 **盲盒有效時間：**  每日 14:00 ～ 當天 23:59

🚨 **注意事項：**  

 登記截止為下次盲盒開獎前  
 未更改名稱者無法參與活動

🎁 **領獎範例格式：**

\`\`\`
GONXT 平台ID：8904321689
平台暱稱：xxxxx
日期：${dateText}
\`\`\`
`;
}

// 發送盲盒訊息到 Discord Webhook
async function sendLuckyNumber() {
  const [a, b] = generateLuckyNumbers();  // 生成隨機的數字
  const message = createMessage(a, b);  // 創建要發送的訊息

  // 發送 POST 請求到 Discord Webhook
  await fetch("https://ptb.discord.com/api/webhooks/1358737810059821073/NgGSEFhLMUSggt_Z4sjV_3Tp_yieIv_U3IeKwFWRjUJwtSbUmRTmkPt_UFoXTcWEM5pY", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),  // 發送的消息內容
  });

  console.log("盲盒訊息已送出！");
}

// 執行發送盲盒訊息的函數
sendLuckyNumber();




