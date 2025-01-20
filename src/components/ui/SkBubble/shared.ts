export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const ease = 0.1;
export const friction = 0.1;
export const bubbleNum = 10;