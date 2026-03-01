import React from 'react';

const ReservationStepper = ({ steps, currentStep }) => {
  return (
    <div className="reservation-stepper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`stepper-step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
        >
          <div className="stepper-circle">
            {index < currentStep ? (
              <span className="stepper-check">&#10003;</span>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <span className="stepper-label">{step}</span>
          {index < steps.length - 1 && <div className="stepper-line" />}
        </div>
      ))}
    </div>
  );
};

export default ReservationStepper;
