import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "@repo/db/client";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types";
import dotenv from "dotenv"
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: parsedData.data.email,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch (error: any) {
        console.log(error.message);
        return res.status(411).json({
            message: "user already exist with same email"
        })
    }

})

app.post("/signin", async (req, res) => {
    dotenv.config();
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const dataParsed = SigninSchema.safeParse(req.body);
    if (!dataParsed.success) {
        return res.status(411).json({
            mesage: "Incorrect Input"
        })
    }
    const user = await prisma.user.findFirst({
        where: {
            email: dataParsed.data.email,
            password: dataParsed.data.password,
        }
    })
    if (!user) {
        return res.status(411).json({
            message: "user is not found"
        })
    }
    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET)
    res.json({
        token
    })
})

app.post("/create-room", (req, res) => {


})

app.listen(3005);