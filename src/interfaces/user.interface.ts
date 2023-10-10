interface User {
  id: bigint;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  languageCode: string | null;
  isPremium: boolean | null;
  allowsWriteToPm: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export default User;