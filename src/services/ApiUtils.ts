import axios, { AxiosError } from 'axios';
import { UserLoginData, UserRegistrationData, FeedbackData } from './types';

const apiClient = axios.create({
  //baseURL: 'http://eb-sqrts-env.eba-bq53g3td.ap-southeast-1.elasticbeanstalk.com/tg_query_api/api/v1/',
  //baseURL: 'http://localhost:31000/',
  baseURL: 'http://a68539567d40e4809978b73b3f73c970-1761258638.ap-southeast-1.elb.amazonaws.com:8080/',
  // add more default settings here
});

export enum ApiMethod {
  REGISTER = 'tgs/api/v1/auth/Register',
  AUTHENTICATE = 'tgs/api/v1/auth/Authenticate',
  GETALLTRAINFARE = 'tgs/api/v1/fares/GetAllTrainFare',
  GETTRAINROUTES = 'tgs/api/v1/routes/GetTrainRoutes',
  GETTICKETS = 'tgs/api/v1/tickets/Tickets',
  GETTRAINFARE = 'tgs/api/v1/fares/GetTrainFare',
  PURCHASETICKET = 'tgs/api/v1/tickets/PurchaseTicket',
  CREATEPAYMENTINTENT = 'pay/api/v1/payments/CreatePaymentIntent',
  GETUSERS = 'tgs/api/v1/users/GetUsers',
  REFUNDTICKETS = 'tgs/api/v1/tickets/RefundTickets',
  REFUND = 'tgs/api/v1/tickets/Refund',
  CHANGEPASSWORD = 'tgs/api/v1/users/ChangePassword',  
  FEEDBACK = 'fbk/api/v1/general/Feedback',
  VALIDATEOTP = 'tgs/api/v1/auth/ValidateOtp',
  SENDOTP = 'tgs/api/v1/auth/SendOtp',
  // Add more endpoints as needed
}

export const registerUser = async (data: UserRegistrationData) => {
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
    return new Response(axiosResponse.data, {status: axiosResponse.status});
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Error data:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('Error request:', axiosError.request);
    } else {
      console.error('Error message:', axiosError.message);
    }
    return new Response(null, {status: 500});
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
    const response = await apiClient.get(endpoint,  params );
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

export async function postDataByParams(endpoint: string, params: any, headers: any) {
  try {
    const response = await apiClient.post(endpoint, params, headers);
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw new Error('Failed to post data');
  }
}

export default apiClient;