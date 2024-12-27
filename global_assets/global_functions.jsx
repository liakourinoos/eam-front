import NannyNavbar from '../src/generic components/NannyNavbar'
import ParentNavbar from '../src/generic components/ParentNavbar'
import ParentHeader from '../src/generic components/ParentHeader'
import Header from '../src/generic components/Header'


export const RenderHeaderNavbar=(usrData, page=1)=>{
    // console.log(usrData)
    if(!usrData){ //guest
        return <Header/>
    }
    else if(usrData?.role===false){
        return (
            <>
                <ParentHeader main_page={'/search'} />
                <ParentNavbar page={page}/>
            </>
        )
    }
    else if(usrData?.role===true){
        return (
            <>
                <ParentHeader />
                <NannyNavbar/>
            </>
        )
    }


}