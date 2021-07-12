import React , {useEffect ,useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { paginationActions } from '../../redux-setup'
import pagination from './Padination'
import axios from 'axios'
import './style.css'
const Index = () => {
 const paginationData = useSelector((state)=>state.data)
 console.log(paginationData[0])
 const loading = useSelector((state)=>state.isLoading)
 const [pageNumber , setPageNumber] = useState(0)
const dispatch = useDispatch()
 const fetchData = async ()=>{
   const response = await axios.get('https://api.github.com/users/john-smilga/followers?per_page=100').catch((err)=>{
     console.log(err)
   })
    
   dispatch(paginationActions.fetchData(pagination(response.data)))
 }
 useEffect(()=>{
   fetchData()
 },[])
 const scrollToTop = ()=>{
     window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
 }
 const paginationHandller=(type)=>{
  if(type === 'next'){
    if(pageNumber >= paginationData.length-1){
      return
    }else{
      setPageNumber(pageNumber+1)
     scrollToTop()
    }
  }
  if(type === 'prev'){
    if(pageNumber <= 0){
      return
    }else{
      setPageNumber(pageNumber-1)
      scrollToTop()
    }
  }

 }
 return (
  <div className='container'>
   <div className="header">
    <h1>Pagination</h1>
    <div className="line"></div>
   </div>
   {
     loading ?<div className="loading_container">
       <h3>Loading...</h3>
     </div>:<div className="use_cards_container">
    {
      paginationData[pageNumber].map((person)=>{
          const{avatar_url ,id , login , html_url} = person
        return<div key={id} className="user_card">
                  <div className="circlehovercontainer">
                    <div className="circlehover"></div>
                  </div>
                  <div className="image_container">
                    <img src={avatar_url} alt={login} />
                  </div>
                  <div className="info">
                      <h3>{login}</h3>
                      <a href={html_url} target={login}>Github</a>
                  </div>
              </div>
      })
    }
   
   </div>
   }
    { !loading && <div className="pages_numbers">
      <div className="buttons_container">
        <button onClick={()=>paginationHandller('prev')} className='btn'>Prev</button>
        {
          paginationData.map((data,index)=>{

            return <button key={index} onClick={()=>{setPageNumber(index) ; scrollToTop() }} 
            className={`btn ${pageNumber===index ? 'active_btn':null}`}>{index+1}</button>
          })
        }
        <button onClick={()=>paginationHandller('next')} className='btn'>Next</button>
      </div>
    </div>}
  </div>
 )
}

export default  Index
