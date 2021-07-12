
const pagination =(data)=>{
console.log(data)
const itemPerPage = 10;
const pagesNumer = Math.ceil(data.length/itemPerPage)

const newData = Array.from({length:pagesNumer} , (_,index)=>{
 const start = index * itemPerPage
 return data.slice(start , start+itemPerPage)
})

// console.log(newData)
return newData
}

export default pagination