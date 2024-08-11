export interface UserRegistrationData {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface SessionUserData {
  email: string;
  userName: string;
  role: string;
  phoneNumber: string;
  userId: string;
  accessToken: string;
  refreshToken: string;  
  isAuthenticated: boolean;
}

export interface FeedbackData {
    name: string;
    email: string;
    category: string;
    message: string;
}

export interface LayoutProps {  
  children: React.ReactNode;
}

export interface CheckoutProps {
  purchaseTicketRequest: {
    journeyType: number,
    groupSize: number,
    operatorId: number,
    startDatetime: number,
    endDatetime: number,
    departurePoint: number,
    arrivalPoint: number,
    departurePointDes: string,
    arrivalPointDes: string,
    paymentRefNo: string,
    amount: number,
    currency: string,
    phoneNo: string,
    email: string
  }
}

export interface QRDataProps {
  qrData: {
    qrData: string;
    serialNumber: string;
    departurePoint: number;
    arrivalPoint: number;
    status: number;
    effectiveDatetime: number;
    journeyType: number;
  };
}

export interface QRRefundDataProps {
  qrData: {    
    serialNumber: string;
    departurePoint: number;
    arrivalPoint: number;
    departurePointDes: string;
    arrivalPointDes: string;
    paymentRefNo: string;
    status: number;
    effectiveDatetime: number;
    journeyType: number;
    amount: number;
  };
}

export interface UserProps {
  userPropsData: {    
    userName: string,
    phoneNumber: string,
    email: string,
    password: string,
    role: string,
  };
}