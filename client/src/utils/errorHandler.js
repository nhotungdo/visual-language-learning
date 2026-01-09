// Error Handler Utility
// Prevents common errors and provides helpful messages

export class AppError extends Error {
  constructor(message, code, details) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}

export const ErrorCodes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  API_ERROR: 'API_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CONFIG_ERROR: 'CONFIG_ERROR'
};

export const handleApiError = (error, context = '') => {
  console.error(`[${context}] Error:`, error);

  // Network errors
  if (error.message === 'Failed to fetch' || error.code === 'ECONNREFUSED') {
    return new AppError(
      'Cannot connect to server. Make sure the backend is running on http://localhost:5000',
      ErrorCodes.NETWORK_ERROR,
      {
        solution: 'Start the backend server: cd server/server && dotnet run',
        originalError: error.message
      }
    );
  }

  // Auth errors
  if (error.response?.status === 401) {
    return new AppError(
      'Authentication failed. Please login again.',
      ErrorCodes.AUTH_ERROR,
      {
        solution: 'Clear browser storage and login again',
        originalError: error.message
      }
    );
  }

  // API errors
  if (error.response?.status >= 400) {
    return new AppError(
      error.response?.data?.message || 'Server error occurred',
      ErrorCodes.API_ERROR,
      {
        status: error.response.status,
        originalError: error.message
      }
    );
  }

  // Generic error
  return new AppError(
    error.message || 'An unexpected error occurred',
    'UNKNOWN_ERROR',
    { originalError: error }
  );
};

export const checkConfiguration = () => {
  const errors = [];

  // Check Google Client ID
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId || clientId.includes('YOUR_GOOGLE_CLIENT_ID')) {
    errors.push({
      type: 'CONFIG_ERROR',
      message: 'Google Client ID not configured',
      solution: 'Update VITE_GOOGLE_CLIENT_ID in .env file',
      file: 'client/.env'
    });
  }

  // Check API URL
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    errors.push({
      type: 'CONFIG_ERROR',
      message: 'API URL not configured',
      solution: 'Update VITE_API_URL in .env file',
      file: 'client/.env'
    });
  }

  return errors;
};

export const displayConfigErrors = (errors) => {
  if (errors.length === 0) return;

  console.group('⚠️ Configuration Errors');
  errors.forEach((error, index) => {
    console.error(`${index + 1}. ${error.message}`);
    console.log(`   Solution: ${error.solution}`);
    console.log(`   File: ${error.file}`);
  });
  console.groupEnd();

  // Show user-friendly message
  const message = errors.map(e => `• ${e.message}\n  → ${e.solution}`).join('\n\n');
  
  return {
    hasErrors: true,
    message,
    errors
  };
};

// Check on app startup
export const performStartupChecks = () => {
  console.log('🔍 Performing startup checks...');
  
  const configErrors = checkConfiguration();
  
  if (configErrors.length > 0) {
    return displayConfigErrors(configErrors);
  }
  
  console.log('✅ All checks passed!');
  return { hasErrors: false };
};

export default {
  AppError,
  ErrorCodes,
  handleApiError,
  checkConfiguration,
  displayConfigErrors,
  performStartupChecks
};
