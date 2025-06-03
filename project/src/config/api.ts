export const API_URL = "";
export const API_ENDPOINTS = {
  batches: `/api/batches`,       
  aviaries: `/api/aviaries`,      
  employees: `/api/employees`,    
  financial: `/api/financial`,   
  collections: `/api/collections`, 

  reports: {
    daily: '/daily-report',        // GET /daily-report/{id}
    weekly: '/daily-report/week'   // GET /daily-report/week/{batchId}/{date}
  }
} as const;


