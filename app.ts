import express from 'express'
import cors from 'cors'

const app = express()
const port = 3333

// localhost:3000からのアクセスを許可
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', async(req: any, res: any) => {
    res.send("Welcome")
})

app.post('/aa', async(req: any, res: any) => {
    res.send("a")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
