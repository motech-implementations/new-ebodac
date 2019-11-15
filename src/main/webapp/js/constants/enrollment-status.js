export const ENROLLED = 'ENROLLED';
export const UNENROLLED = 'UNENROLLED';
export const NOT_ENROLLED = 'NOT_ENROLLED';
export const COMPLETED = 'COMPLETED';

const displayNames = {
  [ENROLLED]: 'Enrolled',
  [UNENROLLED]: 'Unenrolled',
  [NOT_ENROLLED]: 'Not Enrolled',
  [COMPLETED]: 'Completed',
};

export const getEnrollmentStatusName = status => (displayNames[status] || '');
