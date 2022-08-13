const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const Filter = require("bad-words");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.detectBadWords = functions.firestore
.document("chats/{chatId}")
.onCreate(async (snapshot, context) => {
        const filter = new Filter();
        const {text,uid} = snapshot.data();
        if(filter.isProfane(text)){
            const cleanedText = filter.clean(text);
            await snapshot.ref.update({text: cleanedText});
        }
});
exports.detectBadWordsInPrivate = functions.firestore
    .document("private-chats/{chatId}/messages/{messageId}")
    .onCreate(async (snapshot, context) => {
        const filter = new Filter();
        const {text,uid} = snapshot.data();
        if(filter.isProfane(text)){
            const cleanedText = filter.clean(text);
            await snapshot.ref.update({text: cleanedText});
        }
    });