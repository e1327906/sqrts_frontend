import { SessionUserData } from "../services/types";

class Utils {

  static Role = {
    ROLE_ADMIN: 'ROLE_ADMIN',
    ROLE_USER: 'ROLE_USER',
    ROLE_OPERATOR: 'ROLE_OPERATOR',
  };

  static millisecondsToDateyyyyMMdd(milliseconds: number): string {
    const date = new Date(milliseconds);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary

    return `${year}-${month}-${day}`;
  }

  static getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Active';
      case 2:
        return 'Entry';
      case 3:
        return 'Exit';
      case 4:
        return 'Entry Upgrade';
      case 5:
        return 'Exit Upgrade';
      case 6:
        return 'Cancelled';
      case 7:
        return 'Refunded';
      default:
        return 'Inactive';
    }
  }

  static getJourneyTypeLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Single Journey';
      case 2:
        return 'Return Ticket';
      case 3:
        return 'Group Ticket';
      default:
        return 'Unspported';
    }
  }

  static getTicketTypeLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Adult';
      case 2:
        return 'Child';
      case 3:
        return 'Senior';
      default:
        return 'Unspported';
    }
  }
}

export const getSessionUserData = (): SessionUserData | null => {
  const storedSessionUserData = localStorage.getItem('sessionUserData');

  // Parse the string into a SessionUserData object or return null if null/undefined
  return storedSessionUserData ? JSON.parse(storedSessionUserData) : null;
};

export default Utils;