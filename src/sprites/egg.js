const egg = {
  happy: [
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "000000KKKK000000",
    "00000KWWWWK00000",
    "0000KWWWWWWK0000",
    "0000KWYWWWWK0000",
    "0000KWWWYWWK0000",
    "000KWWWWWWWWK000",
    "000KWWWWWWWWK000",
    "000KWWYWWYWWK000",
    "000KWWWWWWWWK000",
    "0000KWWWWWWK0000",
    "00000KKKKKK00000",
    "0000000000000000",
    "0000000000000000",
  ],
  normal: null,
  hungry: null,
  sleeping: null,
};

for (const mood of ["normal", "hungry", "sleeping"]) {
  if (!egg[mood]) egg[mood] = egg.happy;
}

export default egg;