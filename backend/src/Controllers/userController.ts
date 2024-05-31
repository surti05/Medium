import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate} from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { Context } from "hono";
import { Jwt } from 'hono/utils/jwt'
import { signinInput, signupInput } from '@surti05/medium-common';

const prisma = new PrismaClient()
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>

 export async function signup(c: Context) {
    
 

  const body = await c.req.json();
  
 const {success} =  signupInput.safeParse(body)
 if(!success){
  c.status(411);
  return c.json({
    message: "Inputs not correct"
  })
 }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try
  {
const user = await prisma.user.create({
  data: {
    username: body.username,
    name: body.name,
    password: body.password
  }
})

const jwt = await Jwt.sign(user.id, c.env.JWT_SECRET)

return c.text(jwt)
  }
  catch(e){
c.status(411);
return c.text('Invalid Input')
  }
}

export async function signin(c: Context) {
    
  const body = await c.req.json();
  const {success} =  signinInput.safeParse(body)
  if(!success){
   c.status(411);
   return c.json({
     message: "Inputs not correct"
   })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try
  {
const user = await prisma.user.findFirst({
  where: {
    username: body.username,
    password: body.password
  }
})

if(!user)
  {
    c.status(403);
    return c.text("user is not registered!")
  }
const jwt = await Jwt.sign(user.id, c.env.JWT_SECRET)

return c.text(jwt)
  }
  catch(e){
c.status(411);
return c.text('Invalid Input')
  }
}