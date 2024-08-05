import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [amount, setAmount]= useState()
  const [description, setDescription]=useState('')
  const [datetime, setDatetime]=useState('')
  const [transactionType, setTransactionType]=useState('')

  const[expenseData, setExpenseData]= useState([])
  const addTransaction=(e)=>{
    e.preventDefault()
    if(!amount || !description || !datetime || !transactionType)
      return console.log("ERROR")

    axios.post('http://localhost:4000/transactions',{
      amount,description,datetime,transactionType
    })
    .then(res=>{
        setAmount('')
        setDatetime('')
        setTransactionType('--Transaction Type--')
        setDescription('')
        alert("NEW TRANSACTION ENTERED")
        console.log(res.data)})
    .catch(err=>
      console.log(err)
    )}

  const getTransaction=()=>{
    axios.get('http://localhost:4000/transactions')
      .then((res)=>{
        setExpenseData(res.data)
      })
      .catch(err=> console.log(err))

  }
  useEffect(()=>{
    getTransaction()
  },[addTransaction])

  let balance=0
  for(let i of expenseData)
  {
    if(i.transactionType==="Expense")
      balance-=i.amount
    else 
      balance+=i.amount
  }
  


  return (
    <>
      <div className='bg-background w-full'>
        <div className='font-texts text-texts bg-background w-full min-h-screen flex justify-center items-center md:p-sectionPadding '>
          <div className='flex flex-col justify-between items-center w-3/4 max-sm:w-5/6 bg-background border border-texts '> 
            {/* INPUT SECTION */}
            <form className='flex flex-col justify-center items-start w-full px-sectionPadding max-sm:p-[2rem] mb-7 text-center sm:pt-sectionPadding'
            onSubmit={addTransaction}>
              <p className={`text-6xl font-headings my-2 ${balance>=0?"text-income":"text-expense"}`}>{balance>0?"+":' '}{balance}</p>
              <div className=' flex justify-between max-lg:flex-col items-center my-2 font-semibold font-texts w-full'>
                <input 
                type='text' 
                placeholder='enter transaction amount' 
                className='outline-none border border-texts rounded-md p-2 bg-background w-3/5 max-lg:w-full text-lg mx-2'
                value={amount}
                onChange={(e)=> {
                  if(e.target.value==='')
                    setAmount(0)
                  else if(Number(e.target.value))
                    setAmount(Number(e.target.value))
                  else if(!Number(e.target.value))
                    console.log("invalid")
                  
                }}/>
                <input type='datetime-local' 
                className='outline-none border border-texts rounded-md p-2 bg-background w-2/5 max-lg:w-full text-lg mx-2 max-lg:my-3'
                onChange={(e)=>setDatetime(e.target.value)}
                value={datetime}/>
              </div>
              <div className=' flex justify-between max-lg:flex-col items-center lg:my-2 font-semibold font-texts w-full'>
                <input 
                type='text' 
                placeholder='enter transaction details' 
                value={description}
                className='outline-none border border-texts rounded-md p-2 bg-background w-3/5 text-lg mx-2 max-lg:my-3 max-lg:w-full'
                onChange={(e)=> setDescription(e.target.value)}/>
                
                <select 
                name='expense-type' 
                className='outline-none border border-texts rounded-md p-2 bg-background w-2/5 text-lg mx-2  max-lg:my-3 max-lg:w-full'
                onChange={(e)=>{
                  if(e.target.value!="--Transaction Type--")
                    setTransactionType(e.target.value)
                }}>
                  <option>--Transaction Type--</option>
                  <option>Expense</option>
                  <option>Income</option>
                </select>
              </div>
              <button className='w-3/5 max-mobileL:w-full bg-texts text-background p-2 rounded-md lg:mx-2 text-lg font-semibold '>Add Transaction</button>
            </form>

            {/* display data */}
            <div className='md:px-sectionPadding px-[2rem] w-full flex flex-col justify-center items-center'>  
                {
                  expenseData && expenseData.map((data)=>
                    (
                        <div className='w-full border-t-2 border-gray-600 my-2 py-2 font-semibold' key={data._id}>
                          <div className='flex justify-between items-center w-full text-2xl max-mobileL:text-xl'>
                            <p>{data.description}</p>
                            <div className='flex flex-col justify-center items-start font-headings'>
                              <p className={` ${data.transactionType==="Expense"?'text-expense':'text-income'}`}>{data.transactionType==="Expense"?"-":"+"} ₹{data.amount}</p>
                              <p className='text-gray-500 text-xl max-mobileL:text-base'>{data.datetime}</p>
                            </div>
                          </div>
                        </div>
                    ))
                }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
