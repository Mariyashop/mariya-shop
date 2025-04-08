const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// افزایش محدودیت اندازه بدنه درخواست به 10 مگابایت
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

const dataFilePath = path.join(__dirname, 'public', 'data.json');

app.get('/api/data', async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('خطا در خواندن دیتا:', error);
    res.status(500).send('خطا در سرور');
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const newData = req.body;
    await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8');
    res.json({ message: 'دیتا با موفقیت ذخیره شد' });
  } catch (error) {
    console.error('خطا در نوشتن دیتا:', error);
    res.status(500).send('خطا در سرور');
  }
});

app.listen(port, () => {
  console.log(`run in :  ${port} : port`);
});