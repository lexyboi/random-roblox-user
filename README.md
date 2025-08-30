# random-roblox-user
I made this project because i got bored. So i dont wanna explain a lot. You just find a random user with one function.

## Example:
```js
import { randomUser } from ("random-roblox-user") //or turn this line to cjs which is not recommended because of i dont like cjs.

(async () => {
  const users = await randomUser(3, "name", false);
  console.log(users[1]); //1 bc 0 is can be failed sometimes lol
})();
```
