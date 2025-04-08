const fetch = require('node-fetch');

// 測試 API 請求
async function testFetch() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log('Fetch 成功！', data);
  } catch (error) {
    console.error('Fetch 錯誤:', error);
  }
}

// 測試 API 是否正常工作
testFetch();

// 生成隨機的兩個數字
function generateLuckyNumbers() {
  const nums = [4, 5, 6, 7, 8, 9]; // 避開 0～3
  const a = nums[Math.floor(Math.random() * nums.length)];
  let b = nums[Math.floor(Math.random() * nums.length)];
  while (b === a) b = nums[Math.floor(Math.random() * nums.length)];
  return [a, b]; // 返回兩個不同的數字
}

// 獲取昨天的日期
function getYesterdayDateText() {
  const now = new Date();
  now.setDate(now.getDate() - 1); // 設置為昨天的日期
  const month = now.getMonth() + 1; // 月份從0開始，需加1
  const day = now.getDate();
  return `${month}月${day}日`; // 返回格式 "4月8日"
}

// 創建盲盒訊息
function createMessage(a, b) {
  const dateText = getYesterdayDateText(); // 取得昨天日期

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

// 發送盲盒訊息
async function sendLuckyNumber() {
  const [a, b] = generateLuckyNumbers(); // 隨機生成數字
  const message = createMessage(a, b); // 創建訊息

  try {
    await fetch("https://ptb.discord.com/api/webhooks/1358737810059821073/NgGSEFhLMUSggt_Z4sjV_3Tp_yieIv_U3IeKwFWRjUJwtSbUmRTmkPt_UFoXTcWEM5pY", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });

    console.log("盲盒訊息已送出！");
  } catch (error) {
    console.error('發送訊息時發生錯誤:', error);
  }
}

// 執行發送盲盒訊息
sendLuckyNumber();
