This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To install the dependencies, run:

```bash
npm install
```

To run the app in development mode, run:

```bash
npm run dev
```

To build the app run:

```bash 
npm run build
``` 

The **pages** are set up as static pages, and can be found under the `src/app` folder.

The **components** are in the `src/components` folder.

The **data** is in the `src/data` folder.

The dataset for this toolkit is under:

``` 
src/data/content-links.js
``` 

The **MAIN** component that gets the toolkit data and renders each page is:

```
src/components/PageContentSections.js
``` 

The data structure in the file consists of several variables, each representing a page. Each page is structured as
follows:

- **Page**: A list of sections.
    - **Section**: Each section contains:
        - **Title**: The title of the section.
        - **Content**: A list of content items displayed as cards.
            - **Content Item**: Each content item includes:
                - **Title**: The title of the content item.
                - **Body**: The main text of the content item.
                - **Examples** (optional): A list of example strings.
                - **Links** (optional): A list of link strings.

Example:

```
const pageName: Array<Sections> =  [
    {
      title: 'Section Title',
      content: [
        {
          title: 'Content Item Title',
          body: 'Content Item Body',
          examples: ['Example 1', 'Example 2'],
          links: ['Link 1', 'Link 2'],
        }, 
        {Content card 2}, 
        {Content card 3}, ...
      ],
    }, 
    {Section 2}, 
    {Section 3}, ...
  ]
```

There is a `/scripts` folder that contains different data migration scripts. To run a scripts. To generate CSVs, get the
data to contentful, or airtable.

For now, the way the contentful migration works, is that it will pull the changes and write the content-links.js file
that this app will read from.

The app uses MobX for state management. The stores are located in the `src/stores` folder. Here's a description of the
stores and how they are set up:

### Store Setup

1. **RootStore**: This is the main store that combines all individual stores. It provides a single point of access to
   all the stores in the application.

2. **TaskStore**: This store manages the state related to tasks. It includes actions to add, remove, and update tasks,
   as well as methods to load and save tasks from/to local storage.

### Store Configuration

- **RootStore**:
    - Combines all individual stores.
    - Provides context and hooks for accessing the stores in React components.

- **TaskStore**:
    - Manages a list of tasks.
    - Provides actions to manipulate the task list.
    - Persists tasks to local storage and retrieves them on initialization.
    - Each Task contains a list of Risks
    - Each Risk contains a list of actions.

