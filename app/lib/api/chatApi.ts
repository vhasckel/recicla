import axios from 'axios';

export interface UserLocation {
  lat?: number;
  lng?: number;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export async function sendMessage(
  prompt: string,
  sessionId: string,
  userLocation?: UserLocation
): Promise<string> {
  const response = await axios.post('http://localhost:8000/api/gemini', {
    prompt,
    session_id: sessionId,
    user_location: userLocation,
  });
  return response.data.response;
}
