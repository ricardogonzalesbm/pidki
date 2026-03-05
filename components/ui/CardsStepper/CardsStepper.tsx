import React from "react";
import { View } from "react-native";
import { CardStepperItem } from "./CardStepperItem";
import { CardsStepperProvider } from "./CardsStepperContext";

export interface CardStepperItemConfig {
  step: {
    number: number;
    label: string;
  };
  title: string;
  isSubmittable: boolean;
  ChildComponent: React.ComponentType;
}

interface CardsStepperProps {
  items: CardStepperItemConfig[];
}

export const CardsStepper = ({ items }: CardsStepperProps) => {
  return (
    <CardsStepperProvider totalSteps={items.length}>
      <View>
        {items.map((item, index) => (
          <CardStepperItem
            key={item.step.number}
            stepNumber={item.step.number}
            totalSteps={items.length}
            stepLabel={item.step.label}
            title={item.title}
            isSubmittable={item.isSubmittable}
            ChildComponent={item.ChildComponent}
            isFirst={index === 0}
            isLast={index === items.length - 1}
          />
        ))}
      </View>
    </CardsStepperProvider>
  );
};
