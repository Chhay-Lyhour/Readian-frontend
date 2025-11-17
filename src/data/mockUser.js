// src/data/mockUsers.js

export const allUsersData = [
  {
    id: "u1",
    username: "JaneDoe",
    displayName: "Jane Doe",
    email: "jane.doe@example.com",
    dob: "01/15/1990",
    joinedDate: "05/20/2023",
    isSubscribed: false,
    subscriptionTier: 'Basic',
    aboutMe: "Loves writing fantasy novels and reading sci-fi.",
    role:"author",
    profileImage:"/rubik.jpg",
    likedBooksIDs: [1],
    // We can add book IDs here, but it's better to...
  },
  {
    id: "u2",
    username: "JohnSmith",
    displayName: "John Smith",
    email: "jane.doe@example.com",
    dob: "09/11/1996",
    joinedDate: "06/02/2013",
    isSubscribed: false,
    subscriptionTier: 'Basic',
    aboutMe: "Loves cheese",
    role:"admin",
    profileImage:null,
    likedBooksIDs: []
  },
  {
    id: "u3",
    username: "TestReader",
    displayName: "Reader",
    email: "jane.doe@example.com",
    dob: "09/11/1996",
    joinedDate: "06/02/2013",
    isSubscribed: false,
    subscriptionTier: 'Basic',
    aboutMe: "Loves cheese",
    role:"author",
    profileImage:null,
    likedBooksIDs: []
  }
];

// For now, let's just pick one user to be our "logged in" user
export const mockCurrentUser = allUsersData[0]; // Jane Doe