/**
 * Each filter represents a different search criterion.
 */
export const enum Filters {
  Author = 'Author',
  BookName = 'Bookname',
  ISBN = 'ISBN',
}

/**
 * Enum defining different types of users.
 * Each user type represents a specific role for users.
 */
export const enum UserTypes {
  Admin = 'Admin',
  Guest = 'Guest',
  User = 'User',
}
