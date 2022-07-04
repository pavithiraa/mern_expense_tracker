//total,min,max,avg
const calcTransaction = (arr) => {
  const tranArr = arr?.map((data) => data?.amount);

  //sum
  const sumTotal = arr
    ?.map((data) => data?.amount)
    .reduce((acc, curr) => {
      return Number(acc) + Number(curr);
    }, 0);

  //avg
  const avgAmount = sumTotal / arr.length;
  const avg = avgAmount.toFixed(2);

  //min
  const min = Math.min(...tranArr);

  //max
  const max = Math.max(...tranArr);

  // console.log(sumTotal, avg, min, max);

  return {
    sumTotal,
    avg,
    min,
    max,
  };
};

export default calcTransaction;
