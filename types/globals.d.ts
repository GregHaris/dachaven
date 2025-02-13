export {};

declare global {
  interface CustomJwtSessionClaims {
    userId?: {
      userId?: string;
    };
    metadata: {
      role?: Roles;
    };
  }
}
