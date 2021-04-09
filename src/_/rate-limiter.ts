export class RateLimiter {
  limits: Record<string, Record<string, Date>>;

  constructor() {
    this.limits = {};
  }

  public isRateLimited(userID: string, command: string, ttl: number): boolean {
    if (!this.limits[userID]) {
      this.limits[userID] = {};
    }
    if (this.limits[userID][command]) {
      const lastUsed = this.limits[userID][command];
      const now = new Date();
      if (now.getTime() - lastUsed.getTime() < ttl) {
        return true;
      } else {
        this.limits[userID][command] = now;
        return false;
      }
    } else {
      this.limits[userID][command] = new Date();
      return false;
    }
  }
}

export const rl = new RateLimiter();
