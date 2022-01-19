setInterval(() => {
  console.log('start');

  try {
    throw new Error('Error!!');
  } catch (error) {
    console.log(error);
  }
}, 1000)