"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css"; // Make sure your CSS is updated as needed

/**
 * ExponentialMultiRangeSlider
 *
 * This component uses two HTML range inputs that operate on a linear scale (0–100)
 * and then maps those values exponentially onto a range defined by `min` and `max`.
 *
 * For example, if you pass:
 *    min = 10_000
 *    max = 10_000_000_000
 *
 * then a linear slider value of 0 corresponds to 10,000 and a value of 100 corresponds to 10,000,000,000.
 *
 * The mapping is done with the following formula:
 *    exponentialValue = min * (max/min)^(linearValue/100)
 */
const ExponentialMultiRangeSlider = ({ min, max, onChange }) => {
  // Internal state stores the slider positions as a linear value between 0 and 100.
  const [minLinear, setMinLinear] = useState(0);
  const [maxLinear, setMaxLinear] = useState(100);
  const minLinearRef = useRef(minLinear);
  const maxLinearRef = useRef(maxLinear);
  const range = useRef(null);

  // Convert a linear slider value (0–100) to an exponential value.
  const linearToExponential = useCallback(
    (linearValue) => {
      const fraction = linearValue / 100;
      return Math.round(min * Math.pow(max / min, fraction));
    },
    [min, max]
  );

  // (Optional) Convert an exponential value back to a linear slider value.
  // Useful if you ever need to initialize the slider based on exponential values.
  const exponentialToLinear = useCallback(
    (expValue) => {
      const fraction = Math.log(expValue / min) / Math.log(max / min);
      return fraction * 100;
    },
    [min, max]
  );

  // Get the percentage (here simply the linear value) for styling purposes.
  const getPercent = useCallback(
    (linearValue) => Math.round(linearValue),
    []
  );

  // Update the slider track style when the left (min) handle changes.
  useEffect(() => {
    const minPercent = getPercent(minLinear);
    const maxPercent = getPercent(maxLinearRef.current);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minLinear, getPercent]);

  // Update the slider track style when the right (max) handle changes.
  useEffect(() => {
    const minPercent = getPercent(minLinearRef.current);
    const maxPercent = getPercent(maxLinear);
    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxLinear, getPercent]);

  // Call the onChange callback with the exponential values when the slider changes.
  useEffect(() => {
    const minExp = linearToExponential(minLinear);
    const maxExp = linearToExponential(maxLinear);
    onChange({ min: minExp, max: maxExp });
  }, [minLinear, maxLinear, linearToExponential, onChange]);

  return (
    <div className="sliderContainer">
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={minLinear}
        onChange={(event) => {
          // Ensure the left handle does not cross over the right handle.
          const value = Math.min(Number(event.target.value), maxLinear - 0.1);
          setMinLinear(value);
          minLinearRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minLinear > 90 ? "5" : undefined }}
      />
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={maxLinear}
        onChange={(event) => {
          // Ensure the right handle does not cross below the left handle.
          const value = Math.max(Number(event.target.value), minLinear + 0.1);
          setMaxLinear(value);
          maxLinearRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">
          {linearToExponential(minLinear).toLocaleString()}
        </div>
        <div className="slider__right-value">
          {linearToExponential(maxLinear).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

ExponentialMultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired, // e.g., 10000
  max: PropTypes.number.isRequired, // e.g., 10000000000
  onChange: PropTypes.func.isRequired,
};

export default ExponentialMultiRangeSlider;
