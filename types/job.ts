export interface JobI {
    title: string;
    required_staff: string;
    requirements?: string;
    location: string;
    department: string;
    description?: string;
    open_date?: string;
    close_date?: string;
}