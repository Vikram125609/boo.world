const express = require('express');
const app = express();
const { connectDatabase } = require('./Database');
connectDatabase();

app.set('view engine', 'ejs');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/', require('./routes/index')());
app.use('/user', require('./routes/user')());
app.use('/post', require('./routes/post')());
app.use('/comment', require('./routes/comment')());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});