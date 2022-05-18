const axios = require('axios');

// {
//   url: 'https://sharewallet-test.qplus.pro/api/ext/elixir_pay/payments/202204251958450995',
//   method: 'DELETE',
//   data: { amount: 2000, reason: 'cancel' }
// }

const func = async () => {
  const config = {
    url: 'https://sharewallet-test.qplus.pro/api/ext/elixir_pay/payments/202204251958450995',
    method: 'DELETE',
    data: {
      amount: 2000,
      reason: 'cancel',
    }
  }
  
  // try {
  //   const res = await axios(config);
  //   console.log(res)
    
  // } catch (err) {
  //   // console.log(err?.response)
  //   console.error(err?.response?.data);
  // }

  axios(config)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err?.response?.data);
    })
}

func();
