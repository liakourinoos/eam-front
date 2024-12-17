import NannyNavbar from '../src/generic components/NannyNavbar'
import ParentNavbar from '../src/generic components/ParentNavbar'
import ParentHeader from '../src/generic components/ParentHeader'
import Header from '../src/generic components/Header'

// export const CheckUser=({email,password})=>{
//     if(email=="i" ){
//         return {name:"2sougiades",Surname:"27tsouries"}
//     }
//     else if (email=="n")
//         return {name:"Nasos",Surname:"Fykas"}
//     else return {name: undefined ,Surname: undefined}
// }


export const RenderHeaderNavbar=(usrData)=>{
    if(!usrData){ //guest
        return <Header/>
    }
    else if(usrData?.role==="parent"){
        return (
            <>
                <ParentHeader/>
                <ParentNavbar/>
            </>
        )
    }
    else if(usrData?.role==="nanny"){
        return (
            <>
                <ParentHeader/>
                <NannyNavbar/>
            </>
        )
    }


}