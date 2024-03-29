export type IMeeting = {
    name: string;
    projectId: string;
    agenda: string;
    notes?: string;
    startDate: Date;
    endDate?: Date | null;
    deletedAt?: Date | null;
    meetingLink?: string;
};
