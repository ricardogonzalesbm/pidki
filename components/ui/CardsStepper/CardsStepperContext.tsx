import React, { createContext, useCallback, useContext, useState } from "react";

export type StepPayload = Record<string, unknown>;

interface CardsStepperContextValue {
  activeStep: number;
  stepsSubmitted: number[];
  payload: StepPayload;
  submitStep: (stepNumber: number, stepPayload?: StepPayload) => void;
  submitActiveStep: (stepPayload?: StepPayload) => void;
  updatePayload: (partialPayload: StepPayload) => void;
  goToPreviousStep: () => void;
  resetCardStepper: () => void;
}

const CardsStepperContext = createContext<CardsStepperContextValue | null>(null);

interface CardsStepperProviderProps {
  children: React.ReactNode;
  totalSteps: number;
}

export function CardsStepperProvider({ children, totalSteps }: CardsStepperProviderProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [stepsSubmitted, setStepsSubmitted] = useState<number[]>([]);
  const [payload, setPayload] = useState<StepPayload>({});

  const submitStep = useCallback((stepNumber: number, stepPayload?: StepPayload) => {
    setStepsSubmitted((prev) =>
      prev.includes(stepNumber) ? prev : [...prev, stepNumber]
    );
    if (stepPayload) {
      setPayload((prev) => ({ ...prev, ...stepPayload }));
    }
    if (stepNumber < totalSteps) {
      setActiveStep(stepNumber + 1);
    }
  }, [totalSteps]);

  const submitActiveStep = useCallback((stepPayload?: StepPayload) => {
    submitStep(activeStep, stepPayload);
  }, [activeStep, submitStep]);

  const goToPreviousStep = useCallback(() => {
    if (activeStep > 1) {
      const prevStep = activeStep - 1;
      setStepsSubmitted((prev) => prev.filter((s) => s !== prevStep));
      setActiveStep(prevStep);
    }
  }, [activeStep]);

  const updatePayload = useCallback((partialPayload: StepPayload) => {
    setPayload((prev) => ({ ...prev, ...partialPayload }));
  }, []);

  const resetCardStepper = useCallback(() => {
    setActiveStep(1);
    setStepsSubmitted([]);
    setPayload({});
  }, []);

  return (
    <CardsStepperContext.Provider
      value={{ activeStep, stepsSubmitted, payload, submitStep, submitActiveStep, updatePayload, goToPreviousStep, resetCardStepper }}
    >
      {children}
    </CardsStepperContext.Provider>
  );
}

export function useCardsStepper() {
  const context = useContext(CardsStepperContext);
  if (!context) {
    throw new Error("useCardsStepper must be used within a CardsStepperProvider");
  }
  return context;
}
