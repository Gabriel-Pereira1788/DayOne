// ID      string
// 	Email   string
// 	Name    string
// 	Picture string

export interface User {
  ID: string;
  Email: string;
  Name: string;
  Picture: string;
}

export interface AuthResponse {
  AccessToken: string;
  User: User;
}
