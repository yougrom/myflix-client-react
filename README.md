# Welcome to the myFlix Movie App Project!

## Overview

**myFlix Movie App** offers a compelling single-page application (SPA) experience, leveraging the power of React, React Bootstrap, and React Router, complemented by the robust Bootstrap framework. This project is dedicated to movie enthusiasts, providing an extensive platform to explore, search, and interact with a vast collection of movie information. Users can dive into movie details, bookmark their favorite films, and manage their profiles with ease. Ensuring a seamless and secure user experience, myFlix employs JWT for authentication and password hashing mechanisms for enhanced security.

### Live Demo

Explore the live version of myFlix [here](https://myflix-gromov.netlify.app/). Dive into our curated movie selections today!

### Getting Started

#### Pre-Installation Requirements

- Ensure [Node.js](https://nodejs.org/) is installed on your system.
- Have npm (Node Package Manager) available for use.

#### Key Technologies

- **React**: The backbone of our SPA, facilitating dynamic UI construction.
- **React Bootstrap**: Enhances Bootstrap with React components for a unified styling and component library.
- **React Router**: Manages navigation between our app's components seamlessly.

### Essential Dependencies

Our app hinges on several key packages:

```plaintext
- babel: ^6.23.0
- bootstrap: ^5.3.3
- react: ^18.2.0
- react-bootstrap: ^2.10.2
- react-dom: ^18.2.0
- react-router: ^6.22.3
- react-router-dom: ^6.22.3
- react-scripts: 5.0.1
- web-vitals: ^2.1.4
```

### For Developers

#### Development Tools

To contribute to or customize the app, you'll need:

```plaintext
- @babel/plugin-proposal-private-property-in-object: ^7.21.11
- parcel: ^2.12.0
- sass: ^1.72.0
```

#### API Integration

myFlix is powered by our custom movie API, detailed [here](https://github.com/yougrom/myflix). This API serves as the cornerstone of our app, delivering comprehensive movie data.

## Project Deployment

### Steps for Launching Your Version

1. **Prepare for Production**: Begin by setting up your project for a production build. Utilize [Create React App](https://create-react-app.dev/) for easy setup. Should you wish to work on an existing project, `npm run build` prepares it for deployment.

   ```bash
   npx create-react-app my-app
   ```

2. **Deployment**: Post-build, deploy the `build` directory to your chosen hosting service. This directory encapsulates all necessary files for your app's operation.

3. **Server Configuration**: Finally, ensure your hosting service is configured to serve `index.html` as the entry point, a critical step for SPA functionality.
