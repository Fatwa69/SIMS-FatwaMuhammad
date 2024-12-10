import jwt from "jsonwebtoken";
import TokenStorage from "./TokenStorage";

interface JWTPayload {
  email: string;
  exp: number;
  iat: number;
}

class AuthService {
  // Use a secure secret key (preferably from environment)
  private static SECRET_KEY = process.env.JWT_SECRET || "fallback_secret_key";

  /**
   * Authenticate user and manage token
   * @param email User's email
   * @param token JWT token from backend
   */
  static authenticateUser(email: string, token: string): void {
    try {
      // Verify token (optional but recommended)
      const decodedToken = this.verifyToken(token);

      if (decodedToken) {
        // Save token with associated metadata
        TokenStorage.saveToken(token, email);
      } else {
        throw new Error("Invalid token");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      throw error;
    }
  }

  /**
   * Verify and decode a JWT token
   * @param token JWT token to verify
   * @returns Decoded payload or null if invalid
   */
  static verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, this.SECRET_KEY) as JWTPayload;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  }

  /**
   * Logout user and clear tokens
   */
  static logout(): void {
    TokenStorage.clearToken();
  }
}

export default AuthService;
