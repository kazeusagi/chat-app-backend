import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'

const openai = new OpenAI();

const app = express()
const port = 3333

// localhost:3000からのアクセスを許可
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', async(req: any, res: any) => {
    res.send("Welcome")
})

app.post('/aa', async(req: any, res: any) => {
    req.body
    res.send("a")
})

// app.post('/chat', async(req: any, res: any) => {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "みうく飲みたい" }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
//   res.send(completion.choices[0].message.content)
// })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
