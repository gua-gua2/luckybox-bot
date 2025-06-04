const fetch = require('node-fetch');
const moment = require('moment-timezone');

// 隨機生成兩個不同的數字
function generateLuckyNumbers() {
  const nums = [4, 5, 6, 7, 8, 9];
  const a = nums[Math.floor(Math.random() * nums.length)];
  let b = nums[Math.floor(Math.random() * nums.length)];
  while (b === a) b = nums[Math.floor(Math.random() * nums.length)];
  return [a, b];
}

// 取得台灣時區的昨天日期
function getYesterdayDateText() {
  const yesterday = moment().tz('Asia/Taipei').subtract(1, 'day');
  console.log('昨天的台灣時間：', yesterday.format('YYYY-MM-DD'));
  const month = yesterday.month() + 1;
  const day = yesterday.date();
  return `${month}月${day}日`;
}

// 創建訊息內容
function createMessage(a, b) {
  const dateText = getYesterdayDateText();

  let message = `🎉 **@everyone 今日盲盒揭曉！** 🎉


📅 日期：${dateText}      🎲 數字：${a} / ${b}


🎯 **如何中獎？**  
你的對戰 ACS 數據中包含任兩碼組合，即可得獎！  
例：${a}${a}、${a}${b}、${b}${b}、1${a}${b}、1${b}${a}、1${a}${a}、2${a}${b}、2${b}${b} 等..  

📌 **請前往：** 🧧»https://ptb.discord.com/channels/1299287200697024593/1336558795651813377 登記

🕑 **盲盒有效時間：**  每日 12:00-23:59

📌 **盲盒活動範圍：**  VALORANT（valorant遊戲內一般、RANK對局+GoNxt對局都可以參加）

📌 **盲盒獎勳金額：**  30 Mycard點數（每日上限20人）

🚨 **注意事項：**  

 登記截止為下次盲盒開獎前  
 未更改名稱者無法參與活動  
 若有違反匹配規則受到懲罰將取消當局獎勳資格  

🎁 **領取方式：**  玩家戰績面板截圖包含盲盒數字視為中獎，用戶透過截圖發送到對應登記DC，獲得相對應的獎勳

🎁 **領獎範例格式：**

\`\`\`
GONXT 平台ID：8904321689
平台暱稱：xxxxx
日期：${dateText}
登記日期：12/20
語音時間：16:40
ACS：XXX 
\`\`\`

📸 **範例圖片：**  
`;

  // 圖片網址
  const imageUrls = [
    "https://media.discordapp.net/attachments/1336558795651813377/1363830699647565967/8b4b95119ee2771f5e68b5395ba28d1.png",
    "https://media.discordapp.net/attachments/1336558795651813377/1363830700100292618/fa0b41e966910852bc0f3c238c000bc.png"
  ];

  // 返回訊息和圖片的 embed
  const embeds = imageUrls.map(url => ({
    image: {
      url: url
    }
  }));

  return { message, embeds };
}

// 發送盲盒訊息
async function sendLuckyNumber() {
  const [a, b] = generateLuckyNumbers();
  const { message, embeds } = createMessage(a, b);

  await fetch('https://ptb.discord.com/api/webhooks/1379849361735028769/YTnvr1AW-SBNRXR2blu5hAdD6odoORQOrf8QlDbD6lVk_YZw8EqU8QsNQc8IQxSHyKqE', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: message,
      embeds: embeds
    }),
  });

  console.log('盲盒訊息已送出！');
}

sendLuckyNumber();
