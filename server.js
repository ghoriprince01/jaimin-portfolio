const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.render('index'));

app.post('/contact', async (req, res) => {
  const { name, email, service, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ghoriprince58@gmail.com',   // ← your Gmail here
      pass: 'irya vpib zqlc oicx'  // ← 16-char app password here
    }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <ghoriprince58@gmail.com>`,
      to: 'ghoriprince58@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${service || 'General Inquiry'}`,
      html: `
        <h3>New message from your portfolio website</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Topic:</strong> ${service}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });
    res.json({ success: true, message: 'Message sent! I will get back to you soon.' });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Failed to send. Please try again.' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));