export const resetTemplate = (BUTTON_LINK: string) => {
    return `
          <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
          body {
              font-family: 'Segoe UI', sans-serif;
              background-color: #f7f7f7;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
          }
          .container {
              width: 100%;
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              overflow: hidden;
          }
          .header {
              background-color: #4a90e2;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              font-size: 28px;
              font-weight: bold;
          }
          .content {
              padding: 40px 20px;
              text-align: center;
              color: #555555;
          }
          .content h1 {
              font-size: 24px;
              margin-bottom: 20px;
              color: #333333;
          }
          .content p {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 30px;
              color: #666666;
          }
          .button {
              display: inline-block;
              background-color: #4a90e2;
              color: #ffffff;
              padding: 15px 30px;
              font-size: 18px;
              text-decoration: none;
              border-radius: 5px;
              margin-bottom: 30px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          .footer {
              background-color: #f0f0f0;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #888888;
          }
      </style>
  </head>
  <body>
  
  <div class="container">
      <div class="header">
          Reset Your Password
      </div>
      <div class="content">
          <h1>Password Reset Request</h1>
          <p>We received a request to reset your password. Click the button below to proceed.</p>
          <a href="${BUTTON_LINK}" target="_blank" class="button">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email.</p>
      </div>
      <div class="footer">
          &copy; 2024 Dundill. All rights reserved.
      </div>
  </div>
  
  </body>
  </html>
      `;
};
