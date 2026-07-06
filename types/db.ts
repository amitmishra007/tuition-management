export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          email: string;
        };

        Insert: {
          id?: string;
          username: string;
          email: string;
        };

        Update: {
          username?: string;
          email?: string;
        };
      };
      students: {
        Row: {
          id: string;
          admissionNo: string;
          firstName: string;
          lastName: string;
          gender: "Male" | "Female" | "Other";
          dob: string | null;
          joiningDate: string | null;
          fatherName: string | null;
          motherName: string | null;
          phone: string | null;
          alternatePhone: string | null;
          email: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          pincode: string | null;
          school: string | null;
          studentClass: string | null;
          batch: string | null;
          monthlyFee: number | null;
          feeStatus: "Paid" | "Pending" | null;
          lastFeePaid: string | null;
          nextDueDate: string | null;
          profilePhoto: string | null;
          remarks: string | null;
          status: "Active" | "Inactive" | null;
          created_at: string | null;
          updated_at: string | null;
        };

        Insert: {
          id?: string;
          admissionNo: string;
          firstName: string;
          lastName: string;
          gender: "Male" | "Female" | "Other";
          dob?: string | null;
          joiningDate?: string | null;
          fatherName?: string | null;
          motherName?: string | null;
          phone?: string | null;
          alternatePhone?: string | null;
          email?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          school?: string | null;
          studentClass?: string | null;
          batch?: string | null;
          monthlyFee?: number | null;
          feeStatus?: "Paid" | "Pending" | null;
          lastFeePaid?: string | null;
          nextDueDate?: string | null;
          profilePhoto?: string | null;
          remarks?: string | null;
          status?: "Active" | "Inactive" | null;
        };

        Update: {
          admissionNo?: string;
          firstName?: string;
          lastName?: string;
          gender?: "Male" | "Female" | "Other";
          dob?: string | null;
          joiningDate?: string | null;
          fatherName?: string | null;
          motherName?: string | null;
          phone?: string | null;
          alternatePhone?: string | null;
          email?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pincode?: string | null;
          school?: string | null;
          studentClass?: string | null;
          batch?: string | null;
          monthlyFee?: number | null;
          feeStatus?: "Paid" | "Pending" | null;
          lastFeePaid?: string | null;
          nextDueDate?: string | null;
          profilePhoto?: string | null;
          remarks?: string | null;
          status?: "Active" | "Inactive" | null;
        };
      };

      attendance: {
        Row: {
          id: string;
          student_id: string;
          attendance_date: string;
          status: "Present" | "Absent";
        };
        Insert: {
          id?: string;
          student_id: string;
          attendance_date: string;
          status: "Present" | "Absent";
        };
        Update: {
          status?: "Present" | "Absent";
        };
      };

      holidays: {
        Row: {
          id: string;
          holiday_date: string;
          title: string;
          description: string | null;
          created_at: string | null;
        };
      };
    };
  };
};
