


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
// console.log(maxACC);

let students = [
  { name: "Anubhav", marks: 85 },
  { name: "Rahul", marks: 42 },
  { name: "Aman", marks: 90 },
];

// students.forEach((elem)=>{
//     if(elem.marks > 50) console.log("Pass");
//     else console.log("Fail");
// })

let names = ["anubhav", "rahul", "aman"];
let name2=names.map((elem)=>{
    return elem.toUpperCase()
})
// console.log(name2);

let nums = [1,2,3,4,5,6,7,8];
let newNum=nums.filter((n)=> n%2 === 0)
// console.log(newNum);

// METHODS
let obj={
    user:'raja',
    greet:function(){
        console.log("Morning");
    }
}
// obj.greet()

let calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    }
};

// console.log(calculator.add(5, 3));       
// console.log(calculator.subtract(10, 4));  

// Count Properties
let countProperties={
    a:1,b:2,c:3,d:4,e:5
}
let count=0
let countFunc=(obj)=>{
   return Object.keys(obj).length
}
// console.log(countFunc(countProperties));

const obj1 = { a: 1, b: 2 }
const obj2 = { c: 3, d: 4 }
const obj3 = {...obj1, ...obj2}
// console.log(obj3);

const marks = {
  Anubhav: 95,
  Rahul: 82,
  Aman: 90
}

let highMarks = Object.values(marks).reduce((max,val)=>{
    if(val>max) return val
    return max
},0)
let topper= Object.keys(marks).find((key)=>marks[key] === highMarks)
// console.log(topper);

const user1 = {
  name: "Anubhav",
  address: {
    city: "Bhopal",
    pincode: 462001
  }
}
// console.log(user.address.pincode);

let stu={
    name:'Aryan',
    marks:60,
    getResult(){
        return this.marks > 40 ? 'Pass' : 'Fail';
    }
}
// console.log(stu.getResult());

// Lexical scope

function outer() {
  let name = "Sara";
  function inner() {
    console.log(name); 
  }
  inner();
}
// outer(); 

const obj333 = {
  name: "Rahul",
  greet: ()=>{
    console.log(this.name);
  }
};

// obj333.greet(); // undefined

let stu1={
    Fname: 'Ansh',
    Lname: 'Shukla',
    getInfo:function(city,state){
        console.log(`${this.Fname} ${this.Lname} ${city}(${state})`);
    }
}
let stu2={
    Fname:'aryan',
    Lname:'Shukla'
}
let stu3={
    Fname:'rudresh',
    Lname:'Shukla'
}
stu1.getInfo("lko","UP")
stu1.getInfo.call(stu2,"Gkp","UP")
stu1.getInfo.apply(stu3,["basti","UP"])
let out= stu1.getInfo.bind(stu2,"sydney","AU")
out()