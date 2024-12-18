import { Link } from "react-router-dom";

function OfferProfile() {
    return (
        <Link to='/nannyProfile' className="w-4/5 h-36 mx-auto my-5  flex justify-between bg-stone-100 rounded-md p-1 shadow-md shadow-gray-700">
            {/* photo */}
            <div className="h-full w-1/5  flex items-center justify-center">
                <img src="https://wallpapers.com/images/featured/tiktok-pfp-ideas-mdtddnjjjrt9f5e7.jpg" className="object-cover size-28 rounded-full "></img>
            </div>

            {/* name, rating and bio */}
            <div className="w-full h-full flex flex-col pl-2">

                {/* box 1: name and ratings */}
                <div className="w-full  flex justify-between pr-1">                
                    <span className="text-xl font-medium"> Name Surname</span>
                    <span className="text-xl font-medium">***** (10) </span>
                </div>

                {/* box2: bio */}
                <div className="my-1 h-full overflow-hidden rounded-md ">
                    <p className="border-2 h-full border-black px-1 shadow-inner shadow-gray-500">
                        naso gamiesai                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai
                        naso gamiesai

                    </p>
                </div>
            
            </div>
        </Link>
    );
}


export default OfferProfile;