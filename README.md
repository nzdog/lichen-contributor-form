# lichen-contributor-form

Interactive onboarding for Lichen Protocol collaborators.

## Usage

Open `index.html` in a web browser. The page presents a form with reflection questions.
Fill out each field. Clicking **Submit Reflection** opens a confirmation dialog; choose **Submit** to send your answers or **Cancel** to continue editing. You may also click **Save to Local Storage** to persist your answers locally for later visits.

When hosted on Netlify, the form is recognized automatically and submitted data will appear in your Netlify dashboard.

No server is required; everything runs in the browser.

## Setup

Run the provided `setup.sh` script to install Node dependencies (including the Netlify CLI) before running any development tasks:

```sh
./setup.sh
```

After setup you can run `npm test` (currently a placeholder) or other npm scripts.
