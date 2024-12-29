import NannyNavbar from '../src/generic components/NannyNavbar'
import ParentNavbar from '../src/generic components/ParentNavbar'
import UserHeader from '../src/generic components/UserHeader'
import Header from '../src/generic components/Header'


export const RenderHeaderNavbar=(usrData, page=1)=>{
    // console.log(usrData)
    if(!usrData){ //guest
        return <Header/>
    }
    else if(usrData?.role===true){
        return (
            <>
                <UserHeader main_page={'/search'} role={usrData?.role} id={usrData?.id}/>
                <ParentNavbar page={page}/>
            </>
        )
    }
    else if(usrData?.role===false){
        return (
            <>
                <UserHeader role={usrData?.role} id={usrData?.id}/>
                <NannyNavbar page={page}/>
            </>
        )
    }


}