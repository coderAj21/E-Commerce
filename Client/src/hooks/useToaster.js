import { toast } from "react-toastify"


async function callingToaster(promise,error){
    if (error){
        return toast.warning(`${error.message}`);

    }
    const resolveWithSomeData = new Promise(resolve => setTimeout(() => resolve(promise), 1000));
    return toast.promise(
        resolveWithSomeData,
        {
            pending:{
                render(){
                    return "Form is Submitting...."
                }
            },
            success:{
                render({data}){
                    return "Form is submitted Successfully";
                }
            },
            error:{
                render({data}){
                    return data.message;
                }
            }
        },
        {
            position:'top-center'
        }
    )

}

export default callingToaster;