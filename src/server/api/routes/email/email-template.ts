export const emailTemplate = `
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Підтвердіть свою електронну пошту</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 0; text-align: center;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #ffffff;">
                <img src="https://autolab-v2.vercel.app/icons/autolab.svg" alt="Logo" style="max-width: 150px; height: auto;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; background-color: #ffffff;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td style="padding: 20px; background-color: #ffffff;">
                            <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Підтвердіть свою електронну пошту</h1>
                            <p style="color: #666666; font-size: 16px; margin-bottom: 30px;">Дякуємо за реєстрацію. Будь ласка, натисніть кнопку нижче, щоб підтвердити свою електронну адресу та завершити реєстрацію.</p>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="border-radius: 4px; background-color: #f6450e;">
                                        <a href="{{approvalLink}}" target="_blank" style="border: solid 1px #f6450e; border-radius: 4px; color: #ffffff; padding: 12px 18px; text-decoration: none; display: inline-block; font-size: 16px; font-weight: bold; text-align: center;">Підтвердити електронну пошту</a>
                                    </td>
                                </tr>
                            </table>
                            <p style="color: #666666; font-size: 14px; margin-top: 30px;">Якщо ви не запитували цей лист, будь ласка, ігноруйте його або зв'яжіться з нашою службою підтримки, якщо у вас є питання.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f4f4f4; color: #888888; font-size: 12px;">
                <p>&copy; 2025 Autolab. Всі права захищені.</p>
            </td>
        </tr>
    </table>
</body>
</html>
`;
