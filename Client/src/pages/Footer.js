

const  Footer=()=>{
    return (
        <div className="w-full h-full  mt-10 bg-black">
            <div className="container flex flex-col gap-y-2">
                <div className="w-full h-full my-2 text-white flex flex-wrap justify-between items-start ">
                    <div>
                        <p className="font-bold my-2">MAYA</p>
                        <ul className="text-zinc-300 cursor-pointer">
                            <li>About Us</li>
                            <li>Contact Us</li>
                            <li>Terms and Condition</li>    
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold my-2" >Brands</p>
                        <ul className="text-zinc-300 cursor-pointer">
                            <li>Muscle Blaze</li>
                            <li>Fit Foods</li>
                            <li>HK Vitals</li>
                            <li>True Basic</li>
                            <li>Gritzo</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold my-2" >Health & Fitness</p>
                        <ul className="text-zinc-300 cursor-pointer">
                            <li>Proteins</li>
                            <li>Vitamins</li>
                            <li>Gainer</li>
                            <li>Ayurveda</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold my-2">Quick Links</p>
                        <ul className="text-zinc-300 cursor-pointer">
                            <li>My Account</li>
                            <li>Track Your Order</li>
                            <li>Store Locator</li>
                            <li>FAQs</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold my-2">Contact Us</p>
                        <ul className="text-zinc-300 cursor-pointer">
                            <li>care@maya.com</li>
                            <li>+91 9717443134</li>
                            <li>Sec 91 Faridabad Haryana</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full h-full my-4">
                    <ul className="flex flex-wrap items-start gap-x-4">
                        <li><img src="/assets/upi.svg" alt="payment-type"></img></li>
                        <li><img src="/assets/visa.svg" alt="payment-type"></img></li>
                        <li><img src="/assets/pay3.svg" alt="payment-type"></img></li>
                        <li><img src="/assets/pay6.svg" alt="payment-type"></img></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;