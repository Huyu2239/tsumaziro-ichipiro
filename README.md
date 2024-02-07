# FAQ App

## Install prerequisites

- Node.js (18.x or newer)

## Install & Start development mode

1. Create your account on [Scrapbox](https://scrapbox.io/). (if you don't have one)

2. Create a new project on Scrapbox. 

3. Open `config/development.env` and edit the value of `SCRAPBOX_PROJECT_TITLE`.

    ```:text
    SCRAPBOX_PROJECT_TITLE="YOUR_PROJECT_TITLE"
    ```

4. Install dependencies.

    ```:console
    npm clean-install
    ```
5. Generate FAQ data.

    ```:console
    npm run generate
    ```
6. Start servers.

    ```:console
    npm run watch:api
    npm run watch:front
    ```

Then Web and API server will start on the following ports.

- Web server: `http://localhost:3000`
- API server: `http://localhost:8000`

## Update FAQ data

FAQs are generated from a Scrapbox project set up in `config/development.env`.

To update the FAQs, execute the following command after updating the page in the Scrapbox project.

```:console
npm run generate
```
