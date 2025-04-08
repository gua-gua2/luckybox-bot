const fetch = require("node-fetch");

function generateLuckyNumbers() {
  const nums = Array.from({ length: 10 }, (_, i) => i);
  const a = nums[Math.floor(Math.random() * nums.length)];
  let b = nums[Math.floor(Math.random() * nums.length)];
  while (b === a) b = nums[Math.floor(Math.random() * nums.length)];
  return [a, b];
}

function getYesterdayDateText() {
  const now = new Date();
  now.setDate(now.getDate() - 1); // 前一天
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${month}月${day}日`;
}

function createMessage(a, b) {
  const dateText = getYesterdayDateText();

  return `${dateText}盲盒數字為：${a}/${b}
玩家賽後數據ACS内包含當日數字（例：${a}${a}、${a}${b}、${b}${a}、${b}${b}、1${a}${b} 等）
請至 ⁠🧧»數字盲盒-進行 登記

盲盒活動有效時間：每日下午14:00-晚上23:59

注意登記的日期!!!!!
每日登記截止時間為下次盲盒公布前
未改名者無法參加任何活動

領獎模板：
(平台ID在設定裡看)
GONXT 平台ID：8904321689
平台暱稱：xxxxx
日期：xx/xx`;
}

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

sendLuckyNumber();
