import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, ANGKLUNG_EMAIL } from '$lib/env';

// setup sendgrid
sgMail.setApiKey(SENDGRID_API_KEY);

export async function post({ body }) {
    const name = body.get("name")
    const email = body.get("email")
    const message = body.get("message")
    const formType = body.get("formType")

    console.log(`Received contact form submission from ${name} (${email}) : ${message}`);

    // set up email msg. We are sending from our self to ourself.
    const responseSubject = encodeURIComponent(
        `Regarding your Angklung Ensemble enquiry, ${name}`
    );
    const msg = {
        to: ANGKLUNG_EMAIL,
        from: ANGKLUNG_EMAIL,
        subject: `${formType} - ${name}`,
        text: message,
        html: `
        <div style="padding: 10px; font-size: 16px;">
            <h2>Hola, admins!</h2>
            <p>
                We've got a new enquiry here! To reply directly, click the button below!
            </p>
            <p>Enquiry Details: </p>
            <ul>
                <li>Name: ${name}</li>
                <li>Email: ${email}</li>
                <li>Message: ${message}</li>
            </ul>
            <a
                href="mailto:${email}?subject=${responseSubject}"
                style="text-decoration: none; text-align: center;">
                <div
                    style="height: 24px; width: 80px; color: white; padding: 10px;
                    border-radius: 5px; background-color: blue;">
                    Reply now!
                </div>
            </a>
        </div>
        `,
    };

    // now send the email
    try {
        const res = await sgMail.send(msg);
        return {
            status: 200,
            body: JSON.stringify('success'),
        };
    } catch (error) {
        return {
            status: 422,
            body: JSON.stringify(error),
        };
    }
};
