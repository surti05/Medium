import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate} from '@prisma/extension-accelerate'
import { CreateBlogInput, UpdateBlogInput } from '@surti05/medium-common';
import { Hono } from 'hono'
import { Context } from "hono";
import { Jwt } from 'hono/utils/jwt'

const prisma = new PrismaClient()
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>



export async function createBlog(c: Context) {
    const body = await c.req.json();
    const {success} =  CreateBlogInput.safeParse(body)
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
  const user = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get('userId')
    }
  })
  

  
  return c.json({
    user
  })
    }
    catch(e){
      console.log(e)
  c.status(411);
  return c.text('Invalid Input')
    }
  }
  
  export async function updateBlog(c: Context) {
    const body = await c.req.json();
    const {success} =  UpdateBlogInput.safeParse(body)
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
  const user = await prisma.blog.update({
    where: {
        id: body.id,
        authorId : c.get('userId')
    },
    data: {
      title: body.title,
      content: body.content,
    }
  })
  

  
  return c.json({
    user
  })
    }
    catch(e){
      console.log(e)
  c.status(411);
  return c.text('Invalid Input')
    }
  }

  export async function getBulk(c: Context) {
     const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("bulk")
    
      
  const posts = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
  })
  
  return c.json({
    posts
  })
  
    
  }
  
  export async function getBlog(c: Context) {
    const id = Number(c.req.param('id'));
  
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try
    {
  const post = await prisma.blog.findUnique({
    where: {
        id
    },
    select:{
      title: true,
      content: true,
      id: true,
      author: {
        select: {
          name: true
        }
      }
    }
});
  
  
  return c.json({
    post
  })
    }
    catch(e){
  c.status(411);
  return c.text('Invalid Input')
    }
  }
  
  
  