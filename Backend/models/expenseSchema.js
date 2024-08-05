import mongoose from "mongoose";

const expenseSchema=mongoose.Schema({
    amount:{type:Number, required: true},
    description:{type: String, required:true},
    datetime:{type: String, required:true},
    transactionType:{type:String, reuqired:true}
})

export const Transaction= mongoose.model("Transaction", expenseSchema)