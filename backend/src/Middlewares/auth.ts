import { Next } from "hono";
import { Jwt } from "hono/utils/jwt";
import { Hono } from 'hono'
import { Context } from "hono";
const app = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    }
  }>

export async function authMiddleware(c: Context, next: Next) {
	const jwt = c.req.header('Authorization');
  console.log(jwt)
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token: string = jwt.split(" ")[1];
if(token !== null || token !== undefined){
    const decode = await Jwt.verify(token, c.env.JWT_SECRET);
    if(decode){
        c.set("userId", decode);
        console.log(c.get('userId'))
        await next();
    }
    else{
        return c.body("you are unauthroized user sorry", 401);
    }
}
else{
    return c.body("you are unauthroized user", 401);
}
}