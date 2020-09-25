# USThing Recruitment Test 1 - Web
## Introduction
In this test, you will make **a simple event management website**. There are **4 tasks** that you must complete, manage time for each tasks wisely. You may search the internet or other sources for references freely during this test. This test will mainly use **[React](https://reactjs.org)** as a framework.


## Instructions :notebook: 

Clone this repository and work on the following tasks. The tasks are not arranged in specific orders and each task has different complexity, you can work on the tasks in any order.  Please create a new branch for each task. However, you are reminded that some tasks are dependent on each order, and you should use merge/pull/rebase to assist your development.

### Task 1
First, we will create a landing page for the event management site. It will show several headline events in a slideshow.

1. Run <pre>npm install</pre> on both "/react" folder and "/server" folder to install dependencies needed.

2. Run <pre>npx create-react-app</pre> on the "/react" folder.

3. Create the HTML markup for the landing page inside "App.js".

4. The page consists of a **navigation bar** at the top and a **content slideshow** directly below it
 - Navbar has 2 links. "Home", which links to the landing page and "Event Manager" which links to the eventLists page that will be created in Task 2. 
 - The content slideshow must show images and titles of events contained in "headlines.json" and must be full-width.
 - Note:
    - react-router can be used to link to another React component.


### Task 2
This task will create a component that shows all events that are stored in the database. 

1. Create a new file called "eventLists.js" and "eventBar.js".
   - eventLists contains several eventDesc.
   - eventDesc is a **reusable** component that shows image of **a single**
     event, event name, and event description. There are also an edit and delete button.
2. Place several eventDesc inside eventList with contents from API.
   - Note: 
     - edit and delete functions will be implemented in task 3.

### Task 3
In this task, functionality will be added to the buttons created in task 2.

1. Create a new button component on eventLists
2. A form will appear after clicking the "Create new event" button. Fields inside the form consists of: "Event Name" and "Event Description". There is also a submit button inside.
3. Run <pre>npm start</pre> inside the "/server" folder to start the API server.
4. Use the API endpoints to create events and enable functionality for the edit and delete buttons in each eventDesc. And show an indication that the operation is successful.

  - Note: 
    - As the eventDesc component needs an event image, you can use any random image from the internet or you can use the <pre>http://localhost:9000/getRandomEventImage</pre> endpoint from the API to get an image link.
    - to edit the eventDesc, you are free to choose your own implementation (e.g. inline editing, pop-up form, etc.)


### Task 4
This final task will add an attendance list for each event.

1. In the eventDesc component, create a new button called "Attendance List".
2. Clicking the "Attendance List" button will show an attendance list for each event.
3. You can add attendance, edit existing attendance, and delete.
-  Note: 
   - Attendance list is separate for each event
   - You can choose between creating a new page for the attendance list or creating a pop-up inside eventList page.


## Resources
- A very simple ExpressJS API is included in this repo. You may add or modify the API to fit your needs if you wish so.

## Restrictions :no_entry: 
- You are not allowed to share/discuss any part of this test with anyone :angry:
    - Once found, you will be immediately disqualified
    - We take integrity seriously here in USThing :wink:

## 

Feel free to ask our members if you have any questions :+1: 

Happy Coding! :confetti_ball: 

