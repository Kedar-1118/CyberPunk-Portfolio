
import nodemailer from 'nodemailer';

export const sendContactEmail = async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const userId = process.env.EMAIL_USER;
        const userPass = process.env.EMAIL_PASS;

        if (!userId || !userPass) {
            console.error("Email credentials missing in .env");
            return res.status(500).json({ message: "Server configuration error: Email credentials missing" });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: userId,
                pass: userPass
            }
        });

        const mailOptions = {
            from: email,
            to: userId, // Send to yourself
            subject: `Portfolio Contact: ${name}`,
            text: `
Name: ${name}
Email: ${email}

Message:
${message}
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent from ${email}`);
        res.status(200).json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send message", error: error.message });
    }
};
