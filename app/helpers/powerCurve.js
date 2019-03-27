const base = Math.log(1e7);

export function randomSongPath(userContext, events, done) {
  const power = Math.random() * base;
  userContext.vars.songPath = `/${1e7 - Math.floor(Math.exp(power))}/comments`;
  return done();
}

export function powerDistribution(n = 1e7) {
  const baseNumber = Math.log(1e7);
  return function randomNumber() {
    const power = Math.random() * baseNumber;
    return n - Math.floor(Math.exp(power));
  };
}
