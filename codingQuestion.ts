/**
 * Part One
 */

/**
 * Question 1
 * @sumamry Given an array of positive integer (e.g. [2, 5, 12, 4, 19, 73, ...]),
 *          return the sum of the array where the value is an odd number.
 *
 * @param {number[]} nums - Array of positive integer
 * @return {number} - The sum of the array where the value is an odd number
 */
const questionOneTs = (nums: number[]): number => {
  // TODO: Your code starts here
  let sum: number = 0;
  for (const i of nums) {
    if (i % 2 !== 0) {
      sum += i;
    }
  }
  return sum;
};

/**
 * Question 2
 * @sumamry Write a program which prints from 1 to 1000.
 *          When the number contains a digit that is a multiple of 3, print "three" instead.
 *
 */
const questionTwoTs = () => {
  // TODO: Your code starts here
  //1,2,3,4,5,6,7,8,9,10
  for (let i = 1; i <= 1000; i++) {
    i % 3 === 0 ? console.log("three") : console.log(i);
  }
};

/**
 * Question 3
 * @sumamry Given an array of integer (e.g. [2, -5, 12, 7, -7, -219, ...]),
 *          return the unique values in an array.
 *
 * @param {number[]} nums - Array of integer
 * @return {number[]} - The unique values in an array
 */
const questionThreeTs = (nums: number[]): number[] => {
  // TODO: Your code starts here

  if (nums.length <= 1) {
    return nums;
  }

  nums.sort((n1, n2) => n1 - n2);

  let answer: number[] = [];
  let ptr = 0;

  while (ptr < nums.length) {
    if (nums[ptr] != nums[ptr + 1]) {
      answer.push(nums[ptr]);
    }
    while (nums[ptr] == nums[ptr + 1]) {
      ptr += 1;
    }
    ptr += 1;
  }

  return answer;
};
