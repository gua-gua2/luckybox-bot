const fetch = require("node-fetch");

function generateLuckyNumbers() {
  // 修改這一行，避免選擇 0 到 3
  const nums = Array.from({ length: 6 }, (_, i) => i + 4); // 生成 4 到 9 的數字
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
玩家賽後數據ACS内包含當日數字（例：${a}${a}、${a}${b}、${b}${a}、${b}${b}、1${a}${b} 、1${b}${a}、1${b}${b}、2${a}${b}、2${b}${a}等）
請至 ⁠🧧»https://ptb.discord.com/channels/1299287200697024593/1336558795651813377 登記

:Red_point:盲盒活動有效時間：每日下午14:00-晚上23:59

:utility5:注意登記的日期!!!!!
:utility5:每日登記截止時間為下次盲盒公布前
:utility5:未改名者無法參加任何活動

領獎模板：
(平台ID在設定裡看)
GONXT 平台ID：8904321689
平台暱稱：xxxxx
日期：xx/xx`;
}

async function sendLuckyNumber() {
  const [a, b] = generateLuckyNumbers();
  const message = createMessage(a, b);

  // @everyone 要加到訊息裡面
  const finalMessage = `@everyone\n${message}`;

  // 正確的 fetch 呼叫
  await fetch("https://ptb.discord.com/api/webhooks/1358737810059821073/NgGSEFhLMUSggt_Z4sjV_3Tp_yieIv_U3IeKwFWRjUJwtSbUmRTmkPt_UFoXTcWEM5pY", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: finalMessage }), // 傳遞最終的訊息
  });

  console.log("盲盒訊息已送出！");
}

sendLuckyNumber();

