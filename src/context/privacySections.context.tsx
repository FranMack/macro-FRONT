import { ReactNode, createContext, useState } from "react";

interface PrivacySectionContextValue {
  privacySection: string;

  setPrivacySection: (email: string) => void;
}

interface PrivacySectionContextProviderProps {
  children: ReactNode;
}

const privacySectionContextDefaultValue: PrivacySectionContextValue = {
  privacySection: "privacy_letter",

  setPrivacySection: () => {},
};

export const PrivacySectionContext = createContext<PrivacySectionContextValue>(
  privacySectionContextDefaultValue
);

export const PrivacySectionContexProvider = ({
  children,
}: PrivacySectionContextProviderProps) => {
  const [privacySection, setPrivacySection] =
    useState<string>("privacy_letter");

  const value: PrivacySectionContextValue = {
    privacySection,
    setPrivacySection,
  };

  return (
    <PrivacySectionContext.Provider value={value}>
      {children}
    </PrivacySectionContext.Provider>
  );
};
