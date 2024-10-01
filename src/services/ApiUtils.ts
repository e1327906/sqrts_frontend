import axios, { AxiosError } from 'axios';
import { UserLoginData, UserRegistrationData, FeedbackData } from './types';

const apiClient = axios.create({
  // baseURL: 'http://eb-sqrts-env.eba-bq53g3td.ap-southeast-1.elasticbeanstalk.com/tg_query_api/api/v1/',
  baseURL: 'http://localhost:8071/qr_gen_api/api/v1/',
  // add more default settings here
});

export enum ApiMethod {
  // User endpoints
  GETUSERS = 'users/GetUsers',
  LOGOUT = 'users/Logout',
  CHANGEPASSWORD = 'users/ChangePassword',

  // Ticket Service endpoints
  GETTICKETS = 'tickets/Tickets',
  SERVICESTATUS = 'tickets/ServiceStatus',
  REFUNDTICKETS = 'tickets/RefundTickets',
  REFUND = 'tickets/Refund',
  PURCHASETICKET = 'tickets/PurchaseTicket',

  // Payment Service endpoints
  PAYMENTHOOK = 'payments/webhook',
  PAYMENTREFUND = 'payments/Refund',
  FETCHCUSTOMERCARDS = 'payments/FetchCustomerCards',
  DELETEPAYMENTMETHOD = 'payments/DeletePaymentMethod',
  CREATESETUPINTENT = 'payments/CreateSetupIntent',
  CREATEPAYMENTINTENT = 'payments/CreatePaymentIntent',
  CREATEPAYMENTINTENTBYNEWCARD = 'payments/CreatePaymentIntentByNewCard',

  // Message Service endpoints
  SENDMESSAGE = 'message/send',

  // Feedback Service endpoints
  FEEDBACK = 'general/Feedback',

  // Fare endpoints
  GETALLTRAINFARE = 'fares/GetAllTrainFare',
  GETALLBUSFARE = 'fares/GetAllBusFare',
  GETTRAINFARE = 'fares/GetTrainFare',
  GETBUSFARE = 'fares/GetBusFare',

  // Authentication endpoints
  VALIDATEOTP = 'auth/ValidateOtp',
  SENDOTP = 'auth/SendOtp',
  REGISTER = 'auth/Register',
  REFRESHTOKEN = 'auth/RefreshToken',
  AUTHENTICATE = 'auth/Authenticate',

  // Route endpoints
  GETALLTRAINROUTES = 'routes/GetAllTrainRoutes',
  GETALLBUSROUTES = 'routes/GetAllBusRoutes',
  // Add more endpoints as needed
}

export const registerUser = async (data: UserRegistrationData) => {
  // console.log('API Base URL:', apiClient.defaults.baseURL);
  try {
    const response = await apiClient.post(ApiMethod.REGISTER, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error data:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('Error request:', axiosError.request);
    } else {
      console.error('Error message:', axiosError.message);
    }
  }
};

export const loginUser = async (data: UserLoginData) => {
  try {
    const response = await apiClient.post(ApiMethod.AUTHENTICATE, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error data:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('Error request:', axiosError.request);
    } else {
      console.error('Error message:', axiosError.message);
    }
  }
};

export const sendFeedback = async (data: FeedbackData): Promise<Response> => {
  try {
    const axiosResponse = await apiClient.post(ApiMethod.FEEDBACK, data);
    return new Response(axiosResponse.data, { status: axiosResponse.status });
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error data:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('Error request:', axiosError.request);
    } else {
      console.error('Error message:', axiosError.message);
    }
    return new Response(null, { status: 500 });
  }
};

export async function fetchDataWithoutParam(endpoint: string) {
  try {
    const response = await apiClient.get(endpoint);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function fetchDataByParam(endpoint: string, params: any) {
  try {
    const response = await apiClient.get(endpoint, params);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function postDataByParams(endpoint: string, params: any, headers: any) {
  try {
    const response = await apiClient.post(endpoint, params, { headers });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error posting data:', error);

      if (error.response) {
        // Return the response object if it exists
        return error.response;
      }
    } else {
      console.error('Unexpected error:', error);
    }

    throw new Error('Failed to post data');
  }
}

export default apiClient;
