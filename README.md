# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Title and tagline
Project name:CanvasX
Description: drag-and-drop single-page portfolio builder with autosave and offline export for professors.

## Features

1.Canvas with drag-and-drop blocks and basic resize controls.
2.Block library: hero, about, gallery, publications, contact, footer.
3.Project persistence per user: autosave, project list, reload persistence.
4.Save and SaveAs features
4.Export: single-page HTML CSS/JS that renders offline and matches preview.
5.Secured login,signup,logout


## Tech stack and architecture
Frontend: React 
Backend: Firebase
Database: Firestore  (stores collection:users,subcollection:projects).

Brief architecture note: how a “project” is represented in JSON and how you serialize it for export.

## Getting started (local setup)
Prerequisites (Node version v22.21.0, npm)

Installation steps:

1.Clone repo.
2.Install dependencies.
3.Run dev server (npm run dev).

## Usage guide
1.login/signup
2.user is redirected to dashboard
3.Click on Create a new project
4.user is redirected to canvas page
5.drag blocks from library onto canvas, reorder, resize.
6.enter text inside the assigned boxes,upload pictures from local system(limitations:text areas,images inside blocks are not resizable ,blocks are resizable,boxes inside the blocks cannot be deleted)
7.changes made by user is autosaved every 2 seconds
8.click on save project button to manually save the changes made 
9.click on save as button to give a name to the project and save it in the projects list.
10.If save as option is not used then the project is saved with a default name "Untitled Professor Portfolio"
Where to find the project list and reopen existing projects.
11.Click on the export HTML button to create an html page which is auto downloaded on the user's system.  
12.The exported html file opens on any browser
13.The html page matches the preview.


## Data model 
users (collection)
 └── (document)
     ├── createdAt
     ├── email
     ├── user_id
     ├── username
     └── projects (subcollection)
         └── (document)

## Limitations and future work
1.Inline WYSIWYG text editing, templates for academic portfolios, image optimization on export, undo/redo.
2.Snap-to-grid and alignment aids, light accessibility checks
3.Images import with grid and snapping. 
4.Every component inside the block must be draggable,resizable.
5.Every component inside the block can be deleted
6.Customizable Templates

## Project status / acceptance criteria checklist
done:
 Drag-and-drop canvas with resize.
 Library: hero, about, gallery, publications, contact, footer.
 Project autosave + project list persistence across reloads.
 Export to single-page HTML file that renders offline and matches preview.

not done:
 inline WYSIWYG editing.
 templates for academic portfolios.
 snap-to-grid, accessibility checks, undo/redo, image optimization, etc.

