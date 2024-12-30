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

export const downloadFile = (name) => {
    const content = "Ενδεικτικό Αρχείο"; // Content of the dummy file
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" }); // Create a Blob
    const nameWithoutExtension = name.split('.').slice(0, -1).join('.') || name;
    const url = URL.createObjectURL(blob); // Create a temporary URL for the Blob
    const link = document.createElement("a"); // Create a link element
    link.href = url;
    link.download = `${nameWithoutExtension}.txt`; // Set the filename for the downloaded file
    link.click(); // Trigger the download
    URL.revokeObjectURL(url); // Clean up the temporary URL
};