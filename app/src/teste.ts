const readers = {
  MQ5: {
    active: true,
    readers: [12, 20, 44, 56, 90],
  },
  MQ3: {
    active: false,
    readers: [49, 28, 33, 56, 120],
  },
};

console.log(JSON.stringify(readers));
