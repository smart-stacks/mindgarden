// This script runs in the browser and logs environment variable status
console.log('Environment Check Script Running');
console.log('VITE_GOOGLE_CLIENT_ID available:', !!window.ENV_CONFIG?.GOOGLE_CLIENT_ID || 'Not available through window.ENV_CONFIG');

// Create a global object to store runtime environment information
window.ENV_DEBUG = {
  checkTime: new Date().toISOString(),
  checkEnvironment: function() {
    console.log('=== Environment Debug Information ===');
    console.log('Check Time:', this.checkTime);
    console.log('window.ENV_CONFIG:', window.ENV_CONFIG || 'Not defined');
    
    // This will be replaced at build time by Vite
    const viteBuildTimeValue = '__VITE_GOOGLE_CLIENT_ID_PLACEHOLDER__';
    console.log('Vite Build-time Client ID available:', 
      viteBuildTimeValue !== '__VITE_GOOGLE_CLIENT_ID_PLACEHOLDER__' ? 'Yes' : 'No');
    
    return {
      checkTime: this.checkTime,
      hasEnvConfig: !!window.ENV_CONFIG,
      hasBuildTimeValue: viteBuildTimeValue !== '__VITE_GOOGLE_CLIENT_ID_PLACEHOLDER__'
    };
  }
};

// Run the check automatically
document.addEventListener('DOMContentLoaded', () => {
  window.ENV_DEBUG.checkEnvironment();
});
