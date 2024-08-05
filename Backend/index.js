import express from 'express'
import cors from 'cors'
import { PORT, MongoURL } from './config.js'
import mongoose from 'mongoose'
import { Transaction } from './models/expenseSchema.js'

const app=express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    console.log(req)
    return res.status(234).send("welcome to expense tracker")
})

//posts expenses to the db 
app.post('/transactions', async (req, res)=>{
    try{
        if( !req.body|| !req.body.amount || !req.body.description || !req.body.datetime || !req.body.transactionType)
        {
            return res.status(404).send({msg:"Field not found. enter all fields"})
        }
        const newExpense={
            amount:req.body.amount,
            description:req.body.description,
            datetime:req.body.datetime.replace('T'," "),
            transactionType:req.body.transactionType
        }
        const expense= await Transaction.create(newExpense)
        return res.status(201).send(expense)
    }
    catch(err){
        console.log("Error:", err)
    }
})

//gets all expenses from the db
app.get('/transactions', async(req, res)=>{
    try{
        const expenses= await Transaction.find({})
        return res.status(200).json(expenses)
    }
    catch(err){
        console.log("error:", err)
        res.status(500).send({msg: err})
    }
})


const connectDB=async()=>{
    try{
        await mongoose.connect(MongoURL)
        app.listen(PORT, ()=>{
            console.log(`Server initialised on port ${PORT}`)
        })
        console.log("mongoDB connected successfully ")
    }
    catch(err){
        console.log("Mongo error:", err)
    }
}
connectDB()

