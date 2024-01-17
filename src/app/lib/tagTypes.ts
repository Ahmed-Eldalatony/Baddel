export const supporter = {
  type: "supporter",
};
export const american = {
  type: "american",
};

export const european = Object.create(american);
european.type = "european";

export const israeli = Object.create(supporter);
israeli.type = "israeli";

export const valid = {
  type: "valid",
};

export const safe = {
  type: "safe",
};

export const unsafe = {
  type: "unsafe",
};

export const openSource = {
  type: "openSource",
};

export const unhealthy = {
  type: "unhealthy",
};

export const healthy = {
  type: "healthy",
};
export const egyptian = {
  type: "egyptian",
  other: true,
};


export const other = {
  type: "other",
};

