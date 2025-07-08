# Website Performance Checker

Website Performance Checker is a React + Vite application that analyzes the performance metrics of a given URL using the Google PageSpeed Insights API. It provides key metrics such as visual load time, full page load time, page size, and the number of requests in a modern, styled UI.

## Features

- Enter a URL to analyze its performance metrics instantly.
- Fetches data from the Google PageSpeed Insights API.
- Displays metrics in a responsive, card-based layout.
- Styled using Tailwind CSS.

## Screenshot

![Website Performance Checker](./screenshot.png)

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd UrlParser
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Google PageSpeed Insights API key:

   ```env
   VITE_API_KEY=your_api_key_here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser (default: `http://localhost:5173`).
2. Enter a URL in the input field and click "Analyze".
3. View the performance metrics displayed below the input field.

## Troubleshooting

- **Environment Variables Not Loading:** Ensure the `.env` file is correctly set up and the API key is valid.
- **API Key Restrictions:** Verify that your API key has access to the Google PageSpeed Insights API.
- **Vite Cache Issues:** Clear the Vite cache by running:

  ```bash
  npm run clean
  ```

## Technologies Used

- React
- Vite
- Tailwind CSS
- Google PageSpeed Insights API

## AI-Assisted Development

This project was developed with the help of AI tools to streamline the coding process and improve efficiency. AI was used for tasks like generating boilerplate code, optimizing UI design, and writing documentation. These tools helped save time and focus on delivering a polished application.
