import { RaceParams, LiData } from '../../types';

const STEP_FROM_FLAG = 5;

const getTrackWidth = ({ svg, flag }: LiData) => {
  const svgRect = svg.getBoundingClientRect();
  const svgLeft = svgRect.x;
  const flagRect = flag.getBoundingClientRect();
  const flagRight = flagRect.right;
  const width = flagRight - svgLeft + STEP_FROM_FLAG;
  return Math.round(width);
};

export const startAnimation = ({ distance, velocity }: RaceParams, car: LiData) => {
  const carObj = car;
  const animationTime = Math.round(distance / velocity);
  const width = getTrackWidth(carObj);

  let startTime = 0;
  const { svg } = carObj;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;

    const msPassed = timestamp - startTime;
    const distancePassed = (msPassed / animationTime) * width;

    svg.style.transform = `translateX(${distancePassed}px)`;

    if (msPassed < animationTime) {
      carObj.animationID = window.requestAnimationFrame(step);
    }
  };

  carObj.animationID = window.requestAnimationFrame(step);
};
