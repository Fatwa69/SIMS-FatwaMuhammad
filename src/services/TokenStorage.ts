class TokenStorage {
  private static TOKEN_KEY = "user_token";
  private static EMAIL_KEY = "user_email";
  private static EXPIRY_KEY = "token_expiry";

  /**
   * Save token with associated metadata
   * @param token JWT token
   * @param email User's email
   */
  static saveToken(token: string, email: string): void {
    try {
      // Calculate expiry timestamp (12 hours from now)
      const expiryTimestamp = Date.now() + 12 * 60 * 60 * 1000;

      // Use localStorage (consider more secure alternatives in production)
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.EMAIL_KEY, email);
      localStorage.setItem(this.EXPIRY_KEY, expiryTimestamp.toString());
    } catch (error) {
      console.error("Token storage failed:", error);
    }
  }

  /**
   * Retrieve the stored token
   * @returns Token or null if invalid/expired
   */
  static getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const expiry = localStorage.getItem(this.EXPIRY_KEY);

    if (token && expiry) {
      // Check if token is expired
      if (Date.now() < parseInt(expiry, 10)) {
        return token;
      }

      // Remove expired token
      this.clearToken();
    }

    return null;
  }

  /**
   * Clear stored token and associated data
   */
  static clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    localStorage.removeItem(this.EXPIRY_KEY);
  }

  /**
   * Get the email associated with the token
   * @returns User's email or null
   */
  static getUserEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  /**
   * Check if a valid token exists
   * @returns Boolean indicating token validity
   */
  static hasValidToken(): boolean {
    return this.getToken() !== null;
  }
}

export default TokenStorage;
