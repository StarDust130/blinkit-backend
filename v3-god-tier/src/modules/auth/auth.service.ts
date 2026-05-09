// Business logic for auth
export const AuthService = {
  async authenticate(_username: string, _password: string) {
    return { id: "user-id", username: "demo" };
  },
};
