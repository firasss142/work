export const twoFACodeTemplate = (CODE: string) => {
    return `
          <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Verification Code</title>
      <style>
          body {
              font-family: 'Roboto', sans-serif;
              background-color: #e0e0e0;
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
              background-color: #673ab7;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 40px 20px;
              text-align: center;
              color: #444444;
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
          .code {
              display: inline-block;
              background-color: #f5f5f5;
              padding: 15px 30px;
              font-size: 28px;
              color: #673ab7;
              letter-spacing: 5px;
              border-radius: 5px;
              margin-bottom: 30px;
          }
          .footer {
              background-color: #f5f5f5;
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
          Security Verification
      </div>
      <div class="content">
          <h1>Your Authentication Code</h1>
          <p>To complete your sign-in, please enter the following code:</p>
          <div class="code">${CODE}</div>
          <p>If you did not request this code, please disregard this message.</p>
      </div>
      <div class="footer">
          &copy; 2024 Dundill. All rights reserved.
      </div>
  </div>
  
  </body>
  </html>
      `;
};
