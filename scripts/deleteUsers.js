import { auth } from '../server/utils/firebase.js'; // Import the Firebase Auth module
import { firestore } from '../server/utils/firebase.js'; // Import Firestore for deletion of `misebox-users`

// Function to delete users by ID
const deleteUsersByIds = async (userIds) => {
  const deletedUserIds = [];

  for (const uid of userIds) {
    try {
      console.log(`Attempting to delete user account: ${uid}`);

      // Attempt to delete the user from Firebase Auth
      await auth.deleteUser(uid);
      console.log(`Deleted user account: ${uid}`);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.warn(`User not found in Firebase Auth: ${uid}`);
      } else {
        console.error(`Error deleting user account for UID ${uid}:`, error);
        continue; // Skip to the next user if there's a non-recoverable error
      }
    }

    try {
      console.log(`Attempting to delete misebox user: ${uid}`);

      // Delete related misebox user from Firestore
      const miseboxUserRef = firestore.collection('misebox-users').doc(uid);
      await miseboxUserRef.delete();
      console.log(`Deleted misebox user: ${uid}`);
      deletedUserIds.push(uid);
    } catch (error) {
      console.error(`Error deleting misebox user for UID ${uid}:`, error);
    }
  }

  console.log('Finished deleting specified users:', deletedUserIds);
};

// Function to delete anonymous users and test users, with optional IDs
const deleteUsers = async (extraUserIds = []) => {
  try {
    let nextPageToken;
    const deletedUserIds = [...extraUserIds]; // Include manually provided user IDs

    // Delete extra IDs passed in the array
    if (extraUserIds.length > 0) {
      console.log(`Deleting additional user IDs: ${extraUserIds}`);
      await deleteUsersByIds(extraUserIds);
    }

    do {
      // List users, 1000 at a time
      const listUsersResult = await auth.listUsers(1000, nextPageToken);

      // Filter anonymous users and users with "test" in their email
      const targetUsers = listUsersResult.users.filter(
        user => user.providerData.length === 0 || user.email?.includes('test')
      );

      // Delete each targeted user
      for (const user of targetUsers) {
        try {
          console.log(`Attempting to delete user account: ${user.uid}`);

          await auth.deleteUser(user.uid);
          console.log(`Deleted user account: ${user.uid}`);
          deletedUserIds.push(user.uid);
        } catch (error) {
          if (error.code === 'auth/user-not-found') {
            console.warn(`User not found in Firebase Auth: ${user.uid}`);
          } else {
            console.error(`Error deleting user account for UID ${user.uid}:`, error);
            continue; // Skip to the next user if there's a non-recoverable error
          }
        }

        try {
          console.log(`Attempting to delete misebox user: ${user.uid}`);

          // Delete related misebox user from Firestore
          const miseboxUserRef = firestore.collection('misebox-users').doc(user.uid);
          await miseboxUserRef.delete();
          console.log(`Deleted misebox user: ${user.uid}`);
        } catch (error) {
          console.error(`Error deleting misebox user for UID ${user.uid}:`, error);
        }
      }

      // If there are more users to fetch, continue with the next page
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    console.log('Finished deleting target users.');
  } catch (error) {
    console.error('Error listing users:', error);
  }
};

// Example usage: Provide extra IDs as an array or call the main function
const extraUserIds = ["A7yJ0sZJUbS71GQ7OIwYfok4FkL2", "cXkrSQEO8UfBGRVf4QCNHAEnegH3", "Q6tdh1tYLCYi5K1ltWEl2RctmKt1", "tntesI8THANFuEkSkhXe3DBFehl2", "sVEfWWTtpcZb2hbKyYbLwIF98Ng1"];
deleteUsers(extraUserIds);
// OR: Just delete all anonymous and test users
// deleteUsers();
