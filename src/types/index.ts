export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  isVerified: boolean;
  profileComplete: boolean;
  subscription: 'free' | 'premium' | 'elite';
  profilePicture?: string;
  isActive: boolean;
  lastSeen: string;
  joinedDate: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  role: 'user' | 'admin' | 'moderator';
}

export interface UserProfile {
  id: string;
  userId: string;
  // Personal Details
  religion: string;
  caste: string;
  motherTongue: string;
  height: string;
  weight: string;
  bodyType: string;
  complexion: string;
  physicalStatus: string;
  maritalStatus: 'never-married' | 'divorced' | 'widowed' | 'separated';
  
  // Education & Career
  education: string;
  occupation: string;
  annualIncome: string;
  workLocation: string;
  company: string;
  
  // Family Details
  familyType: 'nuclear' | 'joint';
  fatherOccupation: string;
  motherOccupation: string;
  siblings: number;
  familyValues: string;
  familyIncome: string;
  
  // Lifestyle
  smokingHabit: 'never' | 'occasionally' | 'regularly';
  drinkingHabit: 'never' | 'occasionally' | 'regularly';
  dietPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'jain';
  hobbies: string[];
  interests: string[];
  languages: string[];
  
  // Assets & Lifestyle
  assets: string[];
  aboutMe: string;
  
  // Location
  city: string;
  state: string;
  country: string;
  
  // Partner Preferences
  partnerAgeRange: [number, number];
  partnerHeightRange: [string, string];
  partnerEducation: string[];
  partnerOccupation: string[];
  partnerIncomeRange: [string, string];
  partnerReligion: string[];
  partnerCaste: string[];
  partnerLocation: string[];
  partnerMaritalStatus: string[];
  
  // Horoscope Details
  birthTime: string;
  birthPlace: string;
  manglik: 'yes' | 'no' | 'anshik';
  star: string;
  rashi: string;
  gotra: string;
  
  // Photos
  photos: string[];
  
  createdAt: string;
  updatedAt: string;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  compatibility: number;
  horoscopeCompatibility: number;
  isLiked: boolean;
  isMatched: boolean;
  matchedAt?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageType: 'text' | 'image' | 'video' | 'audio';
  timestamp: string;
  isRead: boolean;
  isDelivered: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  lastActivity: string;
  isActive: boolean;
}

export interface Package {
  id: string;
  name: string;
  type: 'free' | 'premium' | 'elite';
  price: number;
  duration: number; // in months
  features: string[];
  isPopular?: boolean;
  maxProfiles: number;
  maxMessages: number;
  videoCallMinutes: number;
}

export interface SearchFilters {
  ageRange: [number, number];
  heightRange: [string, string];
  education: string[];
  occupation: string[];
  incomeRange: [string, string];
  religion: string[];
  caste: string[];
  motherTongue: string[];
  location: string[];
  maritalStatus: string[];
  manglik: string[];
  bodyType: string[];
  complexion: string[];
  dietPreference: string[];
}

export interface SuccessStory {
  id: string;
  groomName: string;
  brideName: string;
  groomPhoto: string;
  bridePhoto: string;
  weddingPhoto: string;
  story: string;
  weddingDate: string;
  location: string;
  isApproved: boolean;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'profile' | 'matching' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  responses: SupportResponse[];
}

export interface SupportResponse {
  id: string;
  ticketId: string;
  responderId: string;
  message: string;
  isInternal: boolean;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  newRegistrations: number;
  totalMatches: number;
  successfulMatches: number;
  revenue: number;
  subscriptions: {
    free: number;
    premium: number;
    elite: number;
  };
  verificationPending: number;
  supportTickets: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'match' | 'message' | 'profile_view' | 'subscription' | 'verification' | 'system';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface ProfileView {
  id: string;
  viewerId: string;
  profileId: string;
  viewedAt: string;
}

export interface Interest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'sent' | 'accepted' | 'declined';
  message?: string;
  sentAt: string;
  respondedAt?: string;
}