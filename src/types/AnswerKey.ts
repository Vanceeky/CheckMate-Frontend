export interface AnswerKey {
  id: string;
  subject: string;
  examType: 'Prelim' | 'Midterm' | 'Semifinals' | 'Finals' | 'Summer Class';
  schoolYear: string;
  semester: string;
  status: 'Draft' | 'Published';
  createdDate: string;
  lastModified: string;
  parts: {
    id: string;
    type: 'Identification' | 'Enumeration' | 'Multiple Choice' | 'True/False';
    questions: {
      id: string;
      number: string;
      points: number;
      answer: string;
    }[];
  }[];
}