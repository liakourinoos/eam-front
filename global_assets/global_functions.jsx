
export const CheckUser=({email,password})=>{
    if(email=="i" ){
        return {name:"2sougiades",Surname:"27tsouries"}
    }
    else if (email=="n")
        return {name:"Nasos",Surname:"Fykas"}
    else return {name: undefined ,Surname: undefined}
}
