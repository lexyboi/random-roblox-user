const pkg = require("./package.json")
const chalk = require("chalk")

//i didnt had enough time to put a bunch of stuff to this, so its just basic.
async function checkVersion() {
  try {
    const res = await fetch("https://registry.npmjs.org/random-roblox-user/latest");
    const data = await res.json();
    const latest = data.version;
    if (pkg.version !== latest) {
      console.log(chalk.yellow(`⚠️ The version you're using is outdated. Current: ${pkg.version}, Latest: ${latest}`));
    }
  } catch (e) {}
}

/**
 * 
 * @description Find random user in roblox with random id. (9.3 billion is the max number.)
 * @param {*} attempt_count  Attempt count, how much random users will be returned.  Cannot be greater than 10.
 * @param {*} wanted_field  Wanted field in json bodies. 
 * @param {*} enable_logs If you want to see the logs of the users, you can activate this.
 * @example
 * import { randomUser } from ("random-roblox-user")
 * 
 * (async () => {
  const users = await randomUser(3, "name", false);
  console.log(users[1]); //1 bc 0 is can be failed sometimes lol
})();
 * @returns Array of users.
 */
async function randomUser(attempt_count = 1, wanted_field = "name", enable_logs = true) {
  await checkVersion();
  if (attempt_count > 10) throw new Error("attempt_count cannot be greater than 10");

  const results = [];
  for (let i = 0; i < attempt_count; i++) {
    const randomId = Math.floor(Math.random() * (9300000000 - 1 + 1)) + 1;
    try {
      const res = await fetch(`https://users.roblox.com/v1/users/${randomId}`);
      if (!res.ok) {
        if (enable_logs) console.log(`Failed! ID: ${randomId}`);
        results.push({ status: "Failed", id: randomId });
        continue;
      }
      const data = await res.json();
      if (wanted_field && data[wanted_field] !== undefined) {
        if (enable_logs) console.log(`Accepted! User: ${data[wanted_field]}`);
        results.push({ status: "Accepted", user: data[wanted_field] });
      } else {
        if (enable_logs) console.log(`Accepted! User: ${JSON.stringify(data)}`);
        results.push({ status: "Accepted", user: data });
      }
    } catch {
      if (enable_logs) console.log(`Failed! ID: ${randomId}`);
      results.push({ status: "Failed", id: randomId });
    }
  }
  return results;
}

module.exports = {
  randomUser,
  checkVersion
}
