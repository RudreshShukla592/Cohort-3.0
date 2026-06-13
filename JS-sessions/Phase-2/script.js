


// JavaScript Beginner Practice Questions (Phase -2 ) Sheet - 2

// 1
let movies = ["3-Idiots","Fight Club", "Inception", "Pursuit of Happiness", "Hera Pheri"]
movies.forEach((m)=>{
    // console.log(m);
    
})

// 2
let num = [1,2,3,4,5,6]
let temp = num[1]
num[1]=num[num.length-2]
num[num.length-2]=temp
// console.log(num);

// 3
let arr=[[2,4,6],[3,7,9],[1,3,5]]
let sum=0
for(let i=0;i < arr.length;i++){
    for(let j=0;j<arr.length;j++){
        if(i == j){
          sum+= arr[i][j]
        }
    }
}
// console.log(arr);
// console.log(sum);

// 4(concat)

let a = [1,2,3]
let b = [3,4,5]
let c = [5,6,7]

let d= a.concat(b.concat(c))
let set = new Set(d)
let newArr=[...set]
// console.log(newArr);

// reduce
let arrACC=[102,2430,3720,10]

let maxACC=arrACC.reduce((acc,val)=>{
    if(val>acc) return val
    return acc
},0)
console.log(maxACC);

