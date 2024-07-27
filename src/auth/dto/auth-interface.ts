export interface CreateUser {
  subscriber_name: string;
  subscriber_key: string;
  sender_mail: string;
  sender_phone: string;
  user_type: string;
}
export interface ValidateUser {
  subscriber_name: string;
  subscriber_key: string;
  user_type: string;
}
export interface DeleteUser {
  id: string;
}
export interface UserId {
  id: string;
}
