nested = (exp) => {
  if (exp.cond) {
    if (typeof exp.t === 'object') {
      return nested(exp.t);
    } else {
      return exp.t;
    }
  } else {
    if (typeof exp.f === 'object') {
      return nested(exp.f);
    } else {
      return exp.f;
    }
  }
};

module.exports = nested;
