import React from 'react'
import Header from '../Header/Header'
import financeGraphe from '../../../../assets/images/financeGraphe.png'
function Finance() {
  return (
    <div>
      <Header title="Finance" />
      
      <div className='finance graphecharts chart school-performance' style={{display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"5px"}}>
         <img src={financeGraphe} alt="school performance chart" style={{borderRadius:"5px"}} />
      </div>
      </div>
  )
}

export default Finance