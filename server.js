const express = require('express')
const cors =require("cors")
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
require('dotenv').config()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
 apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);
app.post('/images', async(req,res)=>{
    try{
        const response = await openai.createImage({
          prompt: "A cute baby sea otter",
          n: 2,
          size: "1024x1024",
    })
    const imageUrl=response.data?.data?.[0]?.url
    console.log(imageUrl)
    if (!imageUrl) {
        throw new Error('Failed to generate image');
      }
  
      // Send the generated image URL as a response
      res.json({ imageUrl });
    
    } catch(error){
        console.log(error);
        // Handle the error and send an appropriate response to the client
        res.status(500).send("Internal Server Error");
    }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})