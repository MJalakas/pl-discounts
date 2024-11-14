# Piletilevi mock discounts page

https://piletilevi.hobiks.ee/

## Context

First off, the task was pretty fun, so thanks for that!

Secondly, I did notice that many of the UI components were based on Material Design. While I think the wiser choice would've been to use an UI library that's based on it ([Material UI](https://mui.com/material-ui/) for React or [Angular Material](https://material.angular.io/) for Angular), I still decided to build the whole UI from scratch.\
Figured building & styling stuff myself may make it easier for you to judge the code.

Thirdly, I did a little more than the task description required, so feel free to also try out the table's tabs and (partially) editing the rows.

If you would like any more insight to whichever part, I'd be more than happy to get more detailed.

## Tools used (& why I chose these)

For this type of small project, the main priority was to "make it work and ship it" (aside the "building from scratch" part...), as the project was relatively small and had a tight deadline. If I'd started a larger production app from scratch, I would've possibly made some different choices in terms of tools, architecture, component reusability etc.

1. **React (NextJS)**\
   I feel like React is ideal for small to medium sized projects - so considering I have the most experience with it, it was an easy choice.

    As for why I went with NextJS, it extends the capabilites of React by quite a lot and removes the need for other separate packages (Vite, React-Query, React Router etc.)

    Besides, React documentation advises developers to use a React-based framework if building an app from scratch with it. [See here.](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks)

2. **Tailwind**\
   Greatly improves my UI building speed compared to regular CSS, but at the cost of potentially "messy" code, especially if not using pre-styled components.

3. **Javascript**\
   I chose JS over Typescript mainly to build the app quicker. While Typescript is amazing for large production projects (especially if types are shared with backend), it wouldn't have provided much benefit for a project this size.

Non-frontend "fun fact": Deployed in a Docker container with an nginx reverse proxy serving it to web.

## What I would've done differently in a production app

Besides the tooling & UI libraries I've already mentioned, here's what should be done better:

-   More feedback to user, e.g. loading views and success/error messages
-   More input validation (forms are only client-side now, so doesn't matter much)
-   More reusable components (Buttons, inputs etc.)
-   "Theme" approach to styling - more default and reusable styles
-   Separated some utility/helper functions for better code readability
-   Probably some more comments
-   And of course tests!

## App description

### Structure / Navigating the code

-   The root folder contains all configuration files.
-   `src/` is the container for app files. It would also hold server side utils etc.
    -   `app/` holds the main app parts - pages, styles, UI parts, routes etc.
        -   `components/` is self-explanatory
        -   `assets/` is for SSR and importable assets. (as in not normally "publicly served")
        -   `hooks/` is for custom React hooks
        -   `fonts.js` holds reusable fonts to import and use with Tailwind classes
        -   `layout.js` is the "wrapper" for all pages. Also holds the header for us.
        -   `page.js` is, finally, the index page! This is the entry-point to see how the page is built.

### Developing

1. Clone the repository
2. `npm install`
3. `npm run dev`
4. Open `localhost:3000` in browser

### Extra info

Header navigation and breadcrumbs lead nowhere - it's the only page we have. Just wanted to align with the design.
