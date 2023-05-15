export interface Message {
    id?: number | null;
    content: string;
    sender_id: string;
    conversation_id: string;
}
  