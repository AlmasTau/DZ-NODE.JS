import express from 'express';
import path from 'path';

const __dir = process.cwd();
const app = express();

app.get('/', (req, res) => {
    const fname = path.join(__dir, 'public', 'index.html');
    res.sendFile(fname);
}) 

app.use(express.static('public'));
app.listen(3000, () => console.log('Server is running on port 3000'));
