This is a full-scale chat app built with React JS library.

Front-End Tools Used:
-React-Router-Dom (routing)
-TailwindCSS (Styled Components)
-Vite (Fast development Server, uses Rollup for production)

Backend Tools Used:
-Vercel (Deployment)
-Firebase (BaaS)
-Firestore (Database)
-OAuth (User Auth provided by Firebase)
-GCloud (Automatic Backups in a dedicated Bucket)
-Google Cloud Functions (Clean chats and resize images)


                                                              Description:
                                                              
This app was built to mimick other popular chat applications such as Messenger, Whatsapp, and Imessage. I had a minimalistic and clean design in mind and
the central logic was there. I leveraged firestore onSnapshot api to get realtime updates to chat rooms and profile updates and notifications. I used 
functional components with hooks combined with tailwindcss to make reusable components. Hooks that I frequently used were useState (Storing reactive data),
 useEffect (trigger functions after a state changes or to fetch data on render), useRef (to hook onto dom elements in components), useReducer ( for complex
 calculations required to change state), and useContext (combined with context api to check for user auth or if dark mode is enabled. I implemented a dark
 mode toggle by leveraging tailwind's built in dark mode feature, and building a custom hook that changes the class of the html body on trigger. Firebase
 setup was moderately difficult because of how data is arranged into documents, making relational data difficult to handle, I fixed this by attaching 
 different collections together by user Ids, for example, to get the user profile of a chat, it would get the id definded in the chat object, and search 
 the userProfile collection for the ID and return that data. Private Chats were also implemented using this logic. Database security was handled both 
 client-side and server-side, with firestore security rules and cloud functions. Animations were an after thought but they were necessary for the app to 
 seem clean and smooth, but css animations were too basic, so I used Framer-Motion to build smooth animations with minimal code and time.
