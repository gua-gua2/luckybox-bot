const fetch = require('node-fetch');

// 計算並返回昨天的日期格式（例如 "4月8日"）
function getYesterdayDateText() {
  const now = new Date();
  now.setDate(now.getDate() - 1); // 減去一天
  const month = now.getMonth() + 1; // JavaScript的月份從0開始，所以加1
  const day = now.getDate();
  return `${month}月${day}日`;
}

// 生成兩個隨機數字
function generateLuckyNumbers() {
  const nums = [4, 5, 6, 7, 8, 9]; // 避開 0～3
  const a = nums[Math.floor(Math.random() * nums.length)];
  let b = nums[Math.floor(Math.random() * nums.length)];
  while (b === a) b = nums[Math.floor(Math.random() * nums.length)];
  return [a, b];
}

// 創建消息
function createMessage(a, b) {
  const dateText = getYesterdayDateText(); // 使用昨天日期
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

// 發送盲盒訊息到 Discord
async function sendLuckyNumber() {
  const [a, b] = generateLuckyNumbers();
  const message = createMessage(a, b);

  await fetch("https://ptb.discord.com/api/webhooks/1358737810059821073/NgGSEFhLMUSggt_Z4sjV_3Tp_yieIv_U3IeKwFWRjUJwtSbUmRTmkPt_UFoXTcWEM5pY", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });

  console.log("盲盒訊息已送出！");
}

// 執行發送
sendLuckyNumber();

