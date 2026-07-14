import "dotenv/config";
import { sendEmail } from "./sendEmail.js";

(async () => {
  try {
    await sendEmail({
      to: process.env.EMAIL_USER!,
      subject: "TaskFlow Email Test",
      html: `
        <h2>🎉 Congratulations!</h2>
        <p>Your TaskFlow email service is working correctly.</p>
      `,
    });

    console.log("✅ Test email sent successfully");
  } catch (error) {
    console.error(error);
  }
})();
