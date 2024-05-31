import { Hono } from "hono";
import { createBlog, getBlog, getBulk, updateBlog } from "../Controllers/blogController"
import { authMiddleware } from "../Middlewares/auth";

export const blogRouter = new Hono();

blogRouter.post('/', authMiddleware, createBlog)
blogRouter.put('/',authMiddleware,  updateBlog)

blogRouter.get('/bulk',authMiddleware, getBulk)
blogRouter.get('/:id',authMiddleware,  getBlog)