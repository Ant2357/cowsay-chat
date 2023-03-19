import dotenv from 'dotenv'
import { oraPromise } from 'ora'
import { BingChat } from 'bing-chat'
import { cowsay } from 'cowsayjs'

import { createInterface } from 'readline';

dotenv.config();

function readUserInput(question) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve, reject) => {
    readline.question(question, answer => {
      resolve(answer);
      readline.close();
    });
  });
}

(async () => {
  const api = new BingChat({
    cookie: process.env.BING_COOKIE
  });

  let res = "";
  while (true) {
    const prompt = await readUserInput("質問文>")

    if (prompt === "exit") {
      break;
    }

    res = await oraPromise(api.sendMessage(prompt, res), {
      text: prompt
    });
    console.log(cowsay(res.text));
  }
})();
