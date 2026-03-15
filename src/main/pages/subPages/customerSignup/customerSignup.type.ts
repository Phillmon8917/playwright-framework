export interface CustomerSignupOptions extends FieldIdOption {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    securityCheck?: string;
    agreeToTerms?: boolean;
    expectValidationErrors: boolean;
}

export interface FieldIdOption {
    fieldId: string;
}