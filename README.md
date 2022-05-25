# Notenschnitt

This is a basic website and PWA for calculating the average grade for FHWN students.

## How it works

After entering your login credentials, they are sent to the backend, which uses them to log in to the FHWN intranet page. This provides the backend with the full HTML of the intranet page filled in with your grades. This HTML is filtered using regex and the grades are formed into a JSON object which gets sent to the frontend.

After receiving the data, the frontend calculates the weighted avg grade and the total ECTS and renders it. This is done in the frontend because this enables the ability to select the semesters to include in the calculation.

Your session cookie obtained from the FHWN page and your ID number are stored in the `LocalStorage`, so you don't have to log in again after reloading the page.

## License

All data shown is obtained from the FHWN intranet page. Therefore, all data is owned by the FHWN.

## Disclaimer

The FHWN does not know about this!! I'm a student and made this because I was sick of calculating my average grade manually.

If someone from the FHWN reads this: I hope it's okay I'm doing this, if not, please let me know. I have no problem taking this offline (:
