declare type Condition<T> = {
  [P in keyof T]?: T[P];
};
