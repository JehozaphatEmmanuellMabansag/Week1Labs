# StudyBuddy — Five-Minute Demo Script

## Problem — 60 seconds (0:00–1:00)

“Hello, I'm Jehozaphat Emmanuell Mabansag. My project is StudyBuddy, a student
task app built during our mobile app development course.

Students often keep assignments in different places: a class group chat,
a notebook, or a quick note on their phone. That makes it easy to forget a small
task or lose track of what is already finished, especially when several subjects
have work due in the same week.

StudyBuddy gives students one simple place to record that work. They can create
an account, add tasks, mark them complete, and delete items they no longer need.
The tasks are stored in Firebase Firestore and the app filters the list for the
signed-in account. My goal is to make the everyday routine of checking what to do
next quick and easy.”

## Live Walkthrough — 150 seconds (1:00–3:30)

Show these three screens in order: Login, Sign Up, and My Tasks. Allow time for
typing and cloud updates within each segment.

1. **1:00–1:25 — Login:** Open the installed Android app. Explain that an existing
   user can enter an email and password, then tap the sign-up link for this demo.
   Say: “This is the entry point for returning users. I'll create a fresh account
   so we can see the app start with an empty task list.”
2. **1:25–2:00 — Sign Up:** Enter a fresh test email and a password with at least
   six characters. Keep the password private. Tap **Sign Up** and wait for
   **My Tasks** to open. Say: “Firebase Authentication creates the account. Once
   the app receives the signed-in user, it opens the task screen automatically.”
3. **2:00–2:40 — Add tasks:** Add “Finish CCE 106 worksheet” and “Review tomorrow's
   lesson” using the add button. Point out the count. Say: “Each task is saved to
   Firestore with this account's user ID. The live listener updates the list when
   the database changes; I don't have to reload the screen.”
4. **2:40–3:10 — Complete and delete:** Tap the circle beside the first task, then
   delete the second task with its trash icon. Show the completed icon and the
   updated count. Say: “Completing a task changes its status. Deleting removes it
   from the database, and the list reflects that change.”
5. **3:10–3:30 — Validation:** Try adding a blank task. Point to the validation
   message. Say: “The app asks me to type a task instead of saving an empty item.
   These small checks help keep the list useful.”

## Technical Challenge — 90 seconds (3:30–5:00)

“One specific challenge in this project was making the task list match the
signed-in account.

Every task lives in the same Firestore collection, so simply reading that whole
collection is not enough. The app needs to know who is signed in before it
subscribes to the list, and it needs a way to identify which tasks belong to that
person.

The solution has three parts. First, the app listens for Firebase authentication
changes and waits for the saved session to load. It then shows the login screens
or the task screen according to that state. Second, when adding a task, it saves
the current user's ID in an ownerId field. Third, the task listener queries only
documents where ownerId matches that user's ID.

During preparation, a duplicate listener was found that still read the whole
collection. That listener was removed so it could no longer overwrite the
filtered results. The listener is also cleaned up when the task screen closes.

The main lesson is that successful login alone doesn't decide which data a screen
loads. The query must use the account identity too. That is how this app keeps
each account's displayed task list separate. Thank you.”

## Rehearsal Before Demo Day

- Rehearse aloud with a timer; the three sections total five minutes.
- Install the completed APK on an Android phone and check that it opens with
  the development server stopped. Keep internet access available for Firebase.
- Test sign-up, login, task creation, completion, and deletion before presenting.
- Confirm that two different accounts display separate lists during testing.
- Charge the phone and have the repository link ready:
  https://github.com/JehozaphatEmmanuellMabansag/Week1Labs
