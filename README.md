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


Images:

![A9F2A2CF-C7CA-44FF-B788-45277C2956BD_1_105_c](https://user-images.githubusercontent.com/106203431/184762322-c765ca00-e524-480e-9f56-a006ca75a568.jpeg)
![AF0C94AB-1B2B-4D7C-8B27-97CBF7414221_1_105_c](https://user-images.githubusercontent.com/106203431/184762362-e02b6dae-a873-4d6c-aa98-d8990a06db6a.jpeg)
![8862A7A1-B6AF-4883-9341-F8334D9EB44E_1_105_c](https://user-images.githubusercontent.com/106203431/184762392-27ca1be0-9eaf-4a9e-a92d-af33285a5973.jpeg)
![D9453395-698B-4472-9DF1-A5489D1BFFD7_1_105_c](https://user-images.githubusercontent.com/106203431/184762409-06b6d387-07ee-49de-87![8D7B65DD-69D8-4A87-
![4FCAE93F-572A-4430-AD4D-C4C5C6AD67B5_1_105_c](https://user-images.githubusercontent.com/106203431/184762427-dadbc123-f305-4f26-8d73-a520d2a6c49b.jpeg)
![F8CB3DF6-EAF8-43F0-B84C-68B77804FD6C_1_105_c](https://user-images.githubusercontent.com/106203431/184762439-216e788f-380e-447a-b9b2-22e3e9db9c2c.jpeg)
![3210CB26-F31B-4532-ACBB-0D0AB854A886_1_105_c](https://user-images.githubusercontent.com/106203431/184762490-1d47adf8-2a0d-4c00-8d5d-0c273fb9b159.jpeg)
![F30D402C-3123-4B7C-AC5B-DDF1ED1B66A4](https://user-images.githubusercontent.com/106203431/184762523-c9afa90d-f64e-44c7-8cb2-efeba07fb13e.jpeg)
![5F793372-AE7E-470C-B40C-1E1268955E08](https://user-images.githubusercontent.com/106203431/184762545-d9a9b200-128d-42ff-8bf7-95a92eebfe47.jpeg)
![6F7736E1-E287-4C08-BD08-6B9053B62CFF](https://user-images.githubusercontent.com/106203431/184762599-d051f3ac-bf7d-41d7-80e8-0c01e3fe4d07.jpeg)
![C09FFF16-5081-4B90-AC23-E21E0ACD4A3B](https://user-images.githubusercontent.com/106203431/184762614-b66ddd58-72b6-454c-83bf-b5f8f4f05efc.jpeg)
![12189472-D5FE-4E0D-AAC4-2BEF621B5CCE](https://user-images.githubusercontent.com/106203431/184762631-2d6b1454-105d-45b4-b834-d9d892e6e81a.jpeg)
![904ECD7F-5B7D-4798-8C7A-3AA2227BC4CF](https://user-images.githubusercontent.com/106203431/184762649-ae0e22bb-c634-4026-b085-db054c820139.jpeg)![08A29F6A-41EF-4C41-B80D-AD17E9571013_1_105_c](https://user-images.githubusercontent.com/106203431/184762700-b581249d-b7a8-444c-970d-cf0512ed1a42.jpeg)

![AC87B47D-5F2A-4897-B9FD-45CB4C9F1D6A](https://user-images.githubusercontent.com/106203431/184762662-3b2f294f-94f8-4970-9200-f33126b9eb62.jpeg)
