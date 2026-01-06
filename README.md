## Title and tagline
Project name:CanvasX\
Description: drag-and-drop single-page portfolio builder with autosave and offline export for professors.

## Features

1.Canvas with drag-and-drop blocks and basic resize controls.\
2.Block library: hero, about, gallery, publications, contact, footer.\
3.Project persistence per user: autosave, project list, reload persistence.\
(The canvas and its contents persists on reload,canvas page is closed and reopened)\
4.Save and SaveAs features.\
(save is to manually save the final state,save as is for saving the final state and also naming the project)\
4.Export: single-page HTML CSS/JS that renders offline and matches preview.\
(Clicking on export the canvas content is expoted to a single page html file which is auto saved on the user's system)\
5.The user can access their previous projects by clicking on "my projects" on the dashboard,they can also edit their project\
6.Secured login,signup,logout.


## Getting started (local setup)
Prerequisites (Node version v22.21.0, npm)\

Installation steps:\

1.Clone repo.\
2.Install dependencies.\
3.Run dev server (npm run dev).

## Usage guide
1.login/signup\
2.user is redirected to dashboard\
3.Click on Create a new project\
4.user is redirected to canvas page\
5.drag blocks from library onto canvas, reorder, resize.\
6.enter text inside the assigned boxes,upload pictures from local system\
7.changes made by user is autosaved\
8.click on save project button to manually save the changes made\
9.click on save as button to give a name to the project and save it in the projects list.\
10.If save as option is not used then the project is saved with a default name "Untitled Professor Portfolio"\
Go to dashboard to find the project list and reopen existing projects.\
11.Click on the export HTML button to create an html page which is auto downloaded on the user's system.\  
12.The exported html file opens on any browser\
13.The html page matches the preview.


## Data model 
users (collection)\
 └── (document)\
     ├── createdAt\
     ├── email\
     ├── user_id\
     ├── username\
     └── projects (subcollection)\
         └── (document)\
                 |__blocks\
                 |__createdAt\
                 |__status\
                 |__title\
                 |__updatedAt


## Limitations and future work
1.Inline WYSIWYG text editing, templates for academic portfolios, image optimization on export, undo/redo.\
2.Snap-to-grid and alignment aids, light accessibility checks\
3.Images import with grid and snapping. \
4.Every component inside the block must be draggable,resizable.\
5.Every component inside the block can be deleted\
6.Customizable Templates

## Project status / acceptance criteria checklist
done:\
 Drag-and-drop canvas with resize.\
 Library: hero, about, gallery, publications, contact, footer.\
 Project autosave + project list persistence across reloads.\
 Export to single-page HTML file that renders offline and matches preview.\

not done:\
 inline WYSIWYG editing.\
 templates for academic portfolios.\
 snap-to-grid, accessibility checks, undo/redo, image optimization, etc.

## Credits

- Built by Rupkatha Saha
- Used MDN Docs for reading
- ChatGPT,perplexity PRO were used in this project

# Technical summary

## Tech stack and architecture
Frontend: React\
CSS:CSS,Tailwind CSS
Backend: Firebase(for all auth features like login,signup,logout;achieving project persistence through auto save,creation of project list)\
Database: Firestore  (stores collection:users,subcollection:projects).\
Image upload:cloudinary
Export to HTML:

## Dependencies
"firebase": "^12.7.0"(backend integration)\
"lodash.debounce": "^4.0.8"(to build the autosave feature)\
"react": "^19.2.0"( entire frontend)\
"react-dnd": "^16.0.1"( flexible drag–drop wiring)\
"react-dnd-html5-backend": "^16.0.1"( backend implementation that tells React DnD to use the browser’s HTML5 drag-and-drop API for mouse/desktop interactions)\
"react-dom": "^19.2.0"(renders React components to the browser DOM)\
"react-icons": "^5.5.0"( folder icon and logout icon)\
"react-rnd": "^10.5.2"(creating draggable and resizable blocks)\
"react-router-dom": "^7.11.0"(navigation to pages,using links,routing)

## Use of AI
Chat GPT and perplexity PRO(for research purposes,debugging codes,writing CSS for the pages)