import sdk from "@stackblitz/sdk";
import { useEffect, useMemo } from "react";

interface PreviewScreenProps {
    html_code: string;
    command: string;
};

const PACKAGE_JSON = {
    "name": "sample",
    "version": "0.1.0",
    "private": true,
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
      },
      "eslintConfig": {
        "extends": [
          "react-app",
          "react-app/jest"
        ]
      },
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-scripts": "5.0.1",
        "web-vitals": "^2.1.4",
        "@emotion/react": "^11.5.0",
        "@emotion/styled": "^11.3.0",
        "@mui/icons-material": "^5.15.15",
        "@mui/material": "^5.15.15",
        "@types/react": "^17.0.0 || ^18.0.0",
        "@fontsource/roboto": "^5.0.12",
      }
  }

const PreviewScreen = ({ html_code, command } : PreviewScreenProps) => {

    const projectConfig = useMemo(() => ({
        title: "generatedCode",
        description: 'A generated react component',
        template: "create-react-app" as "create-react-app" | "angular-cli" | "html" | "javascript" | "node" | "polymer" | "typescript" | "vue",
        dependencies: PACKAGE_JSON.dependencies,
        files: {
          'src/App.jsx': html_code,
          'src/index.js': "import React from 'react';\nimport ReactDOM from 'react-dom/client';\n//import './index.css';\nimport '@fontsource/roboto/300.css';\nimport '@fontsource/roboto/400.css';\nimport '@fontsource/roboto/500.css';\nimport '@fontsource/roboto/700.css';\nimport App from './App';\n//import reportWebVitals from './reportWebVitals';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n<React.StrictMode>\n<App />\n</React.StrictMode>\n);",
          "public/index.html": '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <meta name="theme-color" content="#000000" />\n    <meta\n      name="description"\n      content="Web site created using create-react-app"\n    />\n    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />\n    <!--\n      manifest.json provides metadata used when your web app is installed on a\n      user\'s mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/\n    -->\n    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />\n    <!--\n      Notice the use of %PUBLIC_URL% in the tags above.\n      It will be replaced with the URL of the `public` folder during the build.\n      Only files inside the `public` folder can be referenced from the HTML.\n      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will\n      work correctly both with client-side routing and a non-root public URL.\n      Learn how to configure a non-root public URL by running `npm run build`.\n    -->\n    <title>React App</title>\n  </head>\n  <body>\n    <noscript>You need to enable JavaScript to run this app.</noscript>\n    <div id="root"></div>\n    <!--\n      This HTML file is a template.\n      If you open it directly in the browser, you will see an empty page.\n      You can add webfonts, meta tags, or analytics to this file.\n      The build step will place the bundled scripts into the <body> tag.\n      To begin the development, run `npm start` or `yarn start`.\n      To create a production bundle, use `npm run build` or `yarn build`.\n    -->\n  </body>\n</html>\n',
          'package.json': JSON.stringify(PACKAGE_JSON, null, 2),
        },
      }), [html_code]);

    useEffect(() => {
        const vm = sdk.embedProject(
            'generatedCode',
            projectConfig,
            {
                clickToLoad: false,
                openFile: 'src/App.jsx',
                terminalHeight: 100,
                height: "100%",
              },
        );
        
    }, [projectConfig])

    return (
        <div id="generatedCode" style={ {height: "100%"} }/>
    );
  };
  export default PreviewScreen; 