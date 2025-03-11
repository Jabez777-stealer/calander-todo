interface UserDetails {
    handled_by: { username: string };
  }
  
  interface JobDetails {
    jobRequest_Title: string;
  }

export interface EventInfo {
    id: string;
    start: string;
    end: string;
    user_det: UserDetails;
    job_id: JobDetails;
  }