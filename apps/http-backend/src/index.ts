import express from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "@repo/db/client";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types";
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
        console.log(parsedData.data.email);
        console.log(parsedData.data.password);
        console.log(parsedData.data.name);

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

app.post("/signin", (req, res) => {

})

app.post("/create-room", (req, res) => {


})

app.listen(3005);