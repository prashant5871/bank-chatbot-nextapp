export interface ChatMessage {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: Date;
  }
  
  // Common banking queries and responses
  export const dummyResponses: Record<string, string> = {
    "account balance": "To check your account balance, you can log in to your online banking portal, use our mobile app, visit an ATM, or call our customer service at 1-800-SECUREBANK.",
    
    "transfer money": "You can transfer money between accounts through our online banking portal, mobile app, at any branch, or by calling our customer service. International transfers may require additional verification.",
    
    "open account": "To open a new account, you can apply online through our website, visit any branch with valid ID and proof of address, or call our account services team at 1-800-SECUREBANK.",
    
    "interest rates": "Our current interest rates are: Savings accounts: 0.75% APY, Money Market: 1.25% APY, 12-month CD: 2.50% APY, 30-year fixed mortgage: 5.25%. Rates may vary based on account type and balance.",
    
    "reset password": "To reset your password, click the 'Forgot Password' link on our login page. You'll receive a secure link to reset your password via your registered email or phone number.",
    
    "report fraud": "If you suspect fraudulent activity, please contact our Fraud Department immediately at 1-888-FRAUD-HELP (available 24/7). Remember to also change your online banking password.",
    
    "loan application": "You can apply for a loan through our website, mobile app, or at any branch. We offer personal, auto, home, and business loans. Please have your financial information and ID ready.",
    
    "mobile banking": "Our mobile banking app is available for iOS and Android devices. You can check balances, transfer funds, deposit checks, pay bills, and locate ATMs/branches.",
    
    "atm locations": "You can find our ATM locations through our website or mobile app using the 'Locate' feature. We're part of the AllPoint network, giving you access to over 55,000 surcharge-free ATMs nationwide.",
    
    "international transfer": "For international transfers, you can use our online banking or visit a branch. Please note international transfers may require additional verification and have different fee structures.",
    
    "credit score": "We offer free credit score monitoring for our customers through our online banking portal. Your score is updated monthly and includes personalized tips to improve your score.",
    
    "mortgage rates": "Our current mortgage rates start at 5.25% APR for 30-year fixed and 4.75% APR for 15-year fixed. Rate lock options are available. Please contact a mortgage specialist for personalized quotes.",
    
    "retirement planning": "Our financial advisors can help with retirement planning. We offer IRAs, 401(k) rollovers, and investment services. Schedule a free consultation through our website or by calling 1-800-PLAN-FUTURE.",
    
    "overdraft protection": "We offer overdraft protection services that can link your checking account to a savings account or line of credit. Contact customer service or visit any branch to set up this service.",
    
    "business banking": "Our business banking services include business checking and savings accounts, merchant services, payroll solutions, business loans, and treasury management. Visit our business banking page for more details."
  };
  
  // Fallback responses when no matching query is found
  export const fallbackResponses = [
    "I don't have that specific information. For detailed assistance, please call our customer service at 1-800-SECUREBANK or visit your nearest branch.",
    
    "I'm not sure I understand your question. Could you rephrase it or choose from common topics like account services, loans, credit cards, or investments?",
    
    "That's a great question that might need personalized attention. Please contact our customer support team for assistance tailored to your specific situation.",
    
    "I don't have enough information to answer that question properly. For security reasons, some information can only be provided through our secure banking channels.",
    
    "I'd be happy to help with that, but I'll need our specialists to assist. Please call 1-800-SECUREBANK or use the secure messaging feature in your online banking account."
  ];
  
  // Helper function to get a response based on user query
  export function getBotResponse(query: string): string {
    const lowercaseQuery = query.toLowerCase();
    
    // Check for keyword matches in our response database
    for (const [keyword, response] of Object.entries(dummyResponses)) {
      if (lowercaseQuery.includes(keyword)) {
        return response;
      }
    }
    
    // If no match is found, return a random fallback response
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
  }
  
  // Generate a unique ID for chat messages
  export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }