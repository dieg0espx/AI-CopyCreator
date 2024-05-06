const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');
const cors = require('cors');


const app = express();
const port = 4000;

// Configure OpenAI API
const openaiApiKey = process.env.secretKey;
const openaiClient = new openai.OpenAI({ apiKey: openaiApiKey });

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Define API endpoint
app.post('/generate-text', async (req, res) => {
    
    const { prompt } = req.body;
    console.log(prompt);
    let info = " F1 City Restoration is a disaster restoration company with a building science & engineering approach to restoring & reconstructing residential and commercial properties damaged by Water, Fire, Mould & other environmental disasters.We believe in the vision of bringing property recovery industry to an elevated standard of care, performance and technological advancement.We specialize in high end, and high-value property restoration, during which we utilize our professional experts as well as consultants from all aspects of building science, construction,  indoor air quality, etc. We understand what is required to achieve a competitive advantage in the Insurance Restoration, Facility Maintenance and Construction industry. Working in close collaboration with Property Managers, Strata Councils,  Construction Managers and Insurance Adjusters, F1 City Restoration helps meet the property Restoration, Remediation & Reconstruction challenges of any loss. Working faster than almost anyone else, clients receive an advantage of speed of response and top of the range people, and the latest equipment. In everything we do we draw inspiration from the Formula 1 approach. The Speed at which things are done and decisions are made, the technical Expertise in every action and motion, the Innovation in performance and execution to deliver the optimal results. We call this the FORMULA. Our FORMULA is deeply embedded in all aspects of our operation, from the way we respond to emergency water & fire damage, the way we collaborate and report on projects, to the way we embrace technology and innovation to provide customers with an optimal experience.The core competencies of F1 City Restoration apply across the restoration industry, not only to Water & Fire Damage but also Remediation and Infection Control.  Already this expertise is being applied to clients as diverse as strata councils, asset managers, developers, insurance adjusters & hospitals.  If a company requires support in any of these areas of competence, the Restoration Engineers at F1 City Restoration can provide it."


    try {
        // const prompt = "What is my girlfriend trying to tell me if she want to move the relationship forward ?";
        const response = await openaiClient.completions.create({
            model: "gpt-3.5-turbo-instruct", 
            prompt: info + ' ' + prompt, 
            max_tokens: 2040, 
            temperature: 1
        });
        // console.log(response);
        res.status(200).json(response.choices[0].text);
    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).json({ error: 'An error occurred while generating text' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
