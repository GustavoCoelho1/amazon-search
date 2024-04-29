<a name="readme-top"></a>

![License](https://img.shields.io/badge/License-MIT-green)&nbsp;
<a href="https://www.linkedin.com/in/gustavo-coelho1/">![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)</a>&nbsp;



<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<img src="https://github.com/GustavoCoelho1/amazon-search/assets/92497249/d78d6f07-9dcd-475a-8836-0cf7893781a3" alt="Logo" width="100" height="100">

<h3 align="center">Amazon Search</h3>

  <p align="center">
    Web scraping API to search for Amazon products.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Summary</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
      <ul>
        <li><a href="#used-technologies">Used technologies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#back-end-structure">Back-end structure</a>
      <ul>
        <li><a href="#back-end-requests">Back-end requests</a></li>
      </ul>
    </li>
    <li><a href="#how-to-use">How to use?</a></li>
    <li><a href="#mit-license">MIT License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<br />

## About the project

![ProjectPrints](https://github.com/GustavoCoelho1/amazon-search/assets/92497249/e6f5fd16-fd3f-4abe-b31b-bf644ca94b77)




<p align="right">(<a href="#readme-top">Back to the top</a>)</p>




### Used technologies

* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)



<p align="right">(<a href="#readme-top">Back to the top</a>)</p>




## Getting Started
<a name="getting-started"></a>
To set up and run the project locally, we'll need to follow some steps.

### Prerequisites
* Node.js  
To run the backend, you'll need to have Node.js installed. Click [here](https://nodejs.org/en) to install.

* Typescript  
We use the Typescript library on the backend and also on the frontend to generate the JavaScript file that can be compiled.
  ```sh
  npm install -g typescript
  ```
  Whenever you want to update the script.ts file on the frontend, you must run the command below to generate the `script.js` file used on the page.
   ```sh
    tsc script.ts
    ```



 
### Installation
<a name="installation"></a>
1. Clone the repository
   
    ```sh
    git clone https://github.com/GustavoCoelho1/amazon-search/
    ```


2. Install backend npm packages (make sure you are inside the `/api` folder)
   
   ```sh
   npm install
   ```


3. Still inside the `/api` folder, generate a `.env` file according to the `.env.example`
   ```env
   HOST_URL=localhost
   AMAZON_URL="https://www.amazon.com"
   ```

4. Run your server with the following command:
   
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">Back to the top</a>)</p>



## Back-end structure
<a name="back-end-structure"></a>
- **/api**
  - **/src**: This folder contains the backend source code.
    - **/controller**: Contains the controllers that handle HTTP requests.
    - **/routes**: Contains the API routes, which define the endpoints and associated controller functions.
    - **/exception**: Contains custom errors, which serve to assist in handling application errors.
    - **/service**: Contains services responsible for complex business logic.
    - **/interface**: Contains interfaces that define data structures and contracts used throughout the application.
  - **/node_modules**: This folder contains the project dependencies.
  - **/package.json**: This file is used to manage project dependencies and other settings.
  - **/tsconfig.json**: This file contains the TypeScript configuration for the project.
  - **/README.md**: This file contains information about the project, including installation and usage instructions.


### Back-end requests
<a name="back-end-requests"></a>
The backend currently has a controller for only one request, which is triggered when GET requests are called for the `/api/scrape` route, which also requires a query `?keyword=abc`.

<p align="right">(<a href="#readme-top">Back to the top</a>)</p>


## How to use?
<a name="how-to-use"></a>
1. Using the API 

    To use the API, with the server running, just access the route `localhost/api/scrape` and pass the desired `?keyword` for the search. Upon confirmation, you will have access to all search results in a JSON format.
  
    <img src="https://github.com/GustavoCoelho1/amazon-search/assets/92497249/8df40d0d-94d8-4a37-be10-e2ddf71cbdc9" alt="Logo" width="400">

2. Using the Front-end  

    Using the front-end is a really simple process, just enter the desired keyword in the search bar and click the search button. All results for the corresponding products will then be displayed, and you can access the page of each one just by clicking on the product.
  
    <img src="https://github.com/GustavoCoelho1/amazon-search/assets/92497249/c2e97010-6012-4c5c-9707-f787526b48c9" alt="Logo" width="400">




<p align="right">(<a href="#readme-top">Back to the top</a>)</p>



## MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this file, without restriction on the rights to use, copy, modify, and merge.
Distributed under the MIT license. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">Back to the top</a>)</p>



## Contact

Gustavo Coelho
* Linkedin: <a href="https://www.linkedin.com/in/gustavo-coelho1/">linkedin.com/in/gustavo-coelho1/</a>
* E-mail: <a href="mailto:gustavocoelho1412@gmail.com">gustavocoelho1412@gmail.com</a>
* Repository: <a href="https://gustavo-coelho-portfolio.vercel.app/">Gustavo Coelho - Repositório</a>

🔗 Project link: [github.com/GustavoCoelho1/ibm-wallet](https://github.com/GustavoCoelho1/amazon-search)

<p align="right">(<a href="#readme-top">Back to the top</a>)</p>

